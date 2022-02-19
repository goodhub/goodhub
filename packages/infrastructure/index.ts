import * as pulumi from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { StorageAccount, SkuName, Kind } from '@pulumi/azure-native/storage';
import { Component } from '@pulumi/azure-native/insights'
import { Server, Database } from '@pulumi/azure-native/dbforpostgresql'
import { AppServicePlan, WebApp } from '@pulumi/azure-native/web'

/* Deployment

 - Application Insights
 - Storage
  - PostgreSQL
  - Blob storage
 - Computer
  - App Service
  - Functions
*/

const simplify = (id: string) => id.replace(/-/g, '')

const project = pulumi.getProject()
const stack = pulumi.getStack()
const id = `${project}-${stack}`
const config = new pulumi.Config()

const administratorLogin = simplify(`${id}-db`)
const administratorLoginPassword = config.getSecret('database-admin-password')
if (!administratorLoginPassword) throw new Error('There is no "database-admin-password" in the stack config.')

const sendgridAPIKey = config.getSecret('sendgrid-api-key')
if (!sendgridAPIKey) throw new Error('There is no "sendgrid-api-key" in the stack config.')

interface B2CConfig {
  tenantId: string;
  audienceId: string;
  extensionId: string;
  graphManagementId: string;
  configUrl: string;
}

const b2cConfig = config.getObject('b2c') as B2CConfig
if (!b2cConfig) throw new Error('There is no "b2c" in the stack config.')

const graphManagementPassword = config.getSecret('graphManagementPassword')
if (!graphManagementPassword) throw new Error('There is no "graphManagementPassword" in the stack config.')

const uiUrl = config.get('ui')

// Create an Azure Resource Group
const group = new ResourceGroup(id);

const appInsights = new Component(`${id}-insights`, {
  kind: 'web',
  applicationType: 'web',
  resourceGroupName: group.name,
  location: group.location
})

const storageAccount = new StorageAccount(simplify(`${id}-blob`), {
  resourceGroupName: group.name,
  location: group.location,
  sku: {
    name: SkuName.Standard_LRS,
  },
  kind: Kind.StorageV2,
});

const dbServer = new Server(simplify(`${id}-db`), {
  serverName: simplify(`${id}-db`),
  location: group.location,
  resourceGroupName: group.name,
  properties: {
    createMode: 'Default',
    administratorLogin,
    administratorLoginPassword,
    minimalTlsVersion: 'TLS1_2',
    sslEnforcement: 'Enabled',
    storageProfile: {
      backupRetentionDays: 28,
      geoRedundantBackup: 'Disabled',
      storageMB: 128000
    }
  },
  sku: {
    capacity: 2,
    family: 'Gen5',
    name: 'B_Gen5_2',
    tier: 'Basic',
  }
})

const coreDb = new Database(`${id}-db-core`, {
  resourceGroupName: group.name,
  serverName: dbServer.name,
  databaseName: `${id}-db-core`
})

const servicePlan = new AppServicePlan(`${id}-serviceplan`, {
  resourceGroupName: group.name,
  kind: 'Linux',
  reserved: true,
  sku: {
    name: 'S1',
    tier: 'Standard'
  }
})

const coreApi = new WebApp(`${id}-api-core`, {
  resourceGroupName: group.name,
  serverFarmId: servicePlan.id,
  siteConfig: {
    appSettings: [
      { name: 'APPLICATION_INSIGHTS_CONNECTION_STRING', value: appInsights.connectionString },
      { name: 'AUTH_OPEN_ID_CONFIG_URL', value: b2cConfig.configUrl },
      { name: 'AUTH_TENANT_ID', value: b2cConfig.tenantId },
      { name: 'AUTH_AUDIENCE_ID', value: b2cConfig.audienceId },
      { name: 'AUTH_EXTENSION_ID', value: b2cConfig.extensionId },
      { name: 'AUTH_GRAPH_MANAGEMENT_ID', value: b2cConfig.graphManagementId },
      { name: 'AUTH_GRAPH_MANAGEMENT_PASSWORD', value: graphManagementPassword },
      { name: 'SENDGRID_APP_KEY', value: sendgridAPIKey },
      { name: 'DB_DATABASE', value: coreDb.name },
      { name: 'DB_USER', value: `${id}-db` },
      { name: 'DB_PASSWORD', value: administratorLoginPassword },
      { name: 'DB_HOST', value: dbServer.fullyQualifiedDomainName as pulumi.Output<string> },
      { name: 'UI_BASE_URL', value: uiUrl }
    ],
    alwaysOn: true,
  },

})

export const resourceGroupName = group.name
export const appServiceName = coreApi.name
export const apiEndpoint = pulumi.interpolate`https://${coreApi.defaultHostName}`;

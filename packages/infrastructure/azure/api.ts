import { Output, Config, interpolate } from '@pulumi/pulumi'
import { Server, Database } from '@pulumi/azure-native/dbforpostgresql'
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { Component } from '@pulumi/azure-native/insights'
import { AppServicePlan, WebApp } from '@pulumi/azure-native/web'

interface B2CConfig {
  tenantId: string;
  audienceId: string;
  extensionId: string;
  graphManagementId: string;
  configUrl: string;
}

interface Arguments {
  id: string,
  administratorLogin: string,
  administratorLoginPassword: Output<string>
}

export const setupAPI = (group: ResourceGroup, appInsights: Component, dbServer: Server, coreDb: Database, args: Arguments) => {

  const config = new Config()
  const { id, administratorLogin, administratorLoginPassword } = args

  const sendgridAPIKey = config.getSecret('sendgrid-api-key')
  if (!sendgridAPIKey) throw new Error('There is no "sendgrid-api-key" in the stack config.')

  const b2cConfig = config.getObject('b2c') as B2CConfig
  if (!b2cConfig) throw new Error('There is no "b2c" in the stack config.')

  const graphManagementPassword = config.getSecret('graphManagementPassword')
  if (!graphManagementPassword) throw new Error('There is no "graphManagementPassword" in the stack config.')

  const uiUrl = config.get('ui')

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
        { name: 'WEBSITE_WEBDEPLOY_USE_SCM', value: 'true' },
        { name: 'APPLICATION_INSIGHTS_CONNECTION_STRING', value: appInsights.connectionString },
        { name: 'AUTH_OPEN_ID_CONFIG_URL', value: b2cConfig.configUrl },
        { name: 'AUTH_TENANT_ID', value: b2cConfig.tenantId },
        { name: 'AUTH_AUDIENCE_ID', value: b2cConfig.audienceId },
        { name: 'AUTH_EXTENSION_ID', value: b2cConfig.extensionId },
        { name: 'AUTH_GRAPH_MANAGEMENT_ID', value: b2cConfig.graphManagementId },
        { name: 'AUTH_GRAPH_MANAGEMENT_PASSWORD', value: graphManagementPassword },
        { name: 'SENDGRID_APP_KEY', value: sendgridAPIKey },
        { name: 'DB_DATABASE', value: coreDb.name },
        { name: 'DB_USER', value: interpolate`${administratorLogin}@${dbServer.fullyQualifiedDomainName}` },
        { name: 'DB_PASSWORD', value: administratorLoginPassword },
        { name: 'DB_HOST', value: dbServer.fullyQualifiedDomainName as Output<string> },
        { name: 'UI_BASE_URL', value: `https://${uiUrl}` }
      ],
      cors: {
        allowedOrigins: [
          'http://localhost:3000',
          `https://${uiUrl}`,
          `https://external.${uiUrl}`
        ]
      },
      linuxFxVersion: 'NODE|16-lts',
      alwaysOn: true,
    }
  }) 
  
  return { coreApi }
}
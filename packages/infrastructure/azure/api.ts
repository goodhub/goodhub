import { Output, Config, interpolate, all } from '@pulumi/pulumi'
import { Server, Database } from '@pulumi/azure-native/dbforpostgresql'
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { Component } from '@pulumi/azure-native/insights'
import { AppServicePlan, WebApp } from '@pulumi/azure-native/web'
import { StorageAccount, listStorageAccountKeysOutput } from '@pulumi/azure-native/storage';
import { B2CConfig } from '..';

interface Arguments {
  id: string,
  stack: string,
  administratorLogin: string,
  administratorLoginPassword: Output<string>
}

export const setupAPI = (group: ResourceGroup, appInsights: Component, dbServer: Server, coreDb: Database, storage: StorageAccount, args: Arguments) => {

  const config = new Config()
  const { id, administratorLogin, administratorLoginPassword, stack } = args

  const sendgridAPIKey = config.getSecret('sendgrid-api-key')
  if (!sendgridAPIKey) throw new Error('There is no "sendgrid-api-key" in the stack config.')

  const b2cConfig = config.getObject('b2c') as B2CConfig
  if (!b2cConfig) throw new Error('There is no "b2c" in the stack config.')

  const graphManagementPassword = config.getSecret('graphManagementPassword')
  if (!graphManagementPassword) throw new Error('There is no "graphManagementPassword" in the stack config.')

  const functionB2CPassword = config.getSecret('functionB2CPassword')
  if (!functionB2CPassword) throw new Error('There is no "functionB2CPassword" in the stack config.')

  const uiUrl = config.get('ui')

  const servicePlan = new AppServicePlan(`${id}-serviceplan`, {
    resourceGroupName: group.name,
    kind: 'Linux',
    reserved: true,
    sku: {
      name: stack === 'prod' ? 'S1' : 'B1',
      tier: 'Standard'
    }
  })

  const allowedOrigins = [
    'http://localhost:3000',
    `https://${uiUrl}`,
    `https://external.${uiUrl}`
  ]
  
  
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
        allowedOrigins
      },
      linuxFxVersion: 'NODE|16-lts',
      alwaysOn: true,
    }
  }) 
  
  const storageAccountKeys = all([storage]).apply(([s]) => listStorageAccountKeysOutput({ accountName: s.name, resourceGroupName: group.name }))
  const connectionString = interpolate`DefaultEndpointsProtocol=https;AccountName=${storage.name};AccountKey=${storageAccountKeys.keys[0].value};EndpointSuffix=core.windows.net`

  const functionsApi = new WebApp(`${id}-api-functions`, {
    resourceGroupName: group.name,
    serverFarmId: servicePlan.id,
    kind: 'functionapp,linux',
    siteConfig: {
      appSettings: [
        { name: 'runtime', value: 'node' },
        { name: 'FUNCTIONS_WORKER_RUNTIME', value: 'node' },
        { name: 'FUNCTIONS_EXTENSION_VERSION', value: '~3' },
        { name: 'APPLICATION_INSIGHTS_CONNECTION_STRING', value: appInsights.connectionString },
        { name: 'NODE_ENV', value: 'production' },
        { name: 'AzureWebJobsStorage', value: connectionString },
        { name: 'BLOB_ACCOUNT_KEY', value: storageAccountKeys.keys[0].value },
        { name: 'BLOB_ACCOUNT_NAME', value: storage.name },
        { name: 'BLOB_IMAGE_CONTAINER_NAME', value: 'images' },
        { name: 'AUTH_TENANT_ID', value: b2cConfig.tenantId },
        { name: 'AUTH_GRAPH_FUNCTIONS_ID', value: b2cConfig.functionAppId },
        { name: 'AUTH_GRAPH_FUNCTIONS_PASSWORD', value: functionB2CPassword },
        { name: 'API_BASE_URL', value: interpolate`https://${coreApi.hostNames[0]}` },
      ],
      cors: {
        allowedOrigins
      },
      linuxFxVersion: "NODE|14",
      alwaysOn: true
    }
  }) 
  
  return { coreApi, functionsApi }
}
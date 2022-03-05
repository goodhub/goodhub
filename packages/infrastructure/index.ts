import * as pulumi from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { Component } from '@pulumi/azure-native/insights'

import { setupStorage } from './azure/storage'
import { setupAPI } from './azure/api'
import { setupConfig } from './azure/config';

export interface B2CConfig {
  tenantId: string;
  audienceId: string;
  extensionId: string;
  graphManagementId: string;
  configUrl: string;
  functionAppId: string;
  uiId: string;
}

/* Deployment

 - Application Insights
 - Storage
  - PostgreSQL
  - Blob storage
 - Compute
  - App Service
  - Functions
*/

const project = pulumi.getProject()
const stack = pulumi.getStack()
const id = `${project}-${stack}`
const simpleId = `${project}${stack}`
const config = new pulumi.Config()

const administratorLogin = `${simpleId}db`
const administratorLoginPassword = config.getSecret('database-admin-password')
if (!administratorLoginPassword) throw new Error('There is no "database-admin-password" in the stack config.')


// Create an Azure Resource Group
const group = new ResourceGroup(id);

const appInsights = new Component(`${id}-insights`, {
  kind: 'web',
  applicationType: 'web',
  resourceGroupName: group.name,
  location: group.location
})

const { coreDb, dbServer, storageAccount } = setupStorage(group, {
  id, simpleId, administratorLogin, administratorLoginPassword
})

const { coreApi, functionsApi } = setupAPI(group, appInsights, dbServer, coreDb, storageAccount, {
  id, administratorLogin, administratorLoginPassword
})

setupConfig(group, coreApi, functionsApi, { id, stack })

export const resourceGroupName = group.name
export const appServiceName = coreApi.name
export const apiEndpoint = pulumi.interpolate`https://${coreApi.defaultHostName}`;
export const functionAppName = functionsApi.name

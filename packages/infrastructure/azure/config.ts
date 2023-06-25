import { ResourceGroup } from '@pulumi/azure-native/resources';
import { WebApp } from '@pulumi/azure-native/web';
import { B2CConfig } from '..';
import {
  StorageAccount,
  SkuName,
  Kind,
  BlobContainer,
  Blob,
  BlobServiceProperties
} from '@pulumi/azure-native/storage';
import { all, Config } from '@pulumi/pulumi';
import { StringAsset } from '@pulumi/pulumi/asset';

interface Arguments {
  id: string;
  simpleId: string;
  stack: string;
}

export const setupConfig = (group: ResourceGroup, coreApi: WebApp, { id, simpleId, stack }: Arguments) => {
  const config = new Config();

  const storageAccount = new StorageAccount(`${simpleId}config`, {
    resourceGroupName: group.name,
    location: group.location,
    sku: {
      name: SkuName.Standard_LRS
    },
    kind: Kind.StorageV2
  });

  new BlobServiceProperties(`${simpleId}-blob-service-properties`, {
    accountName: storageAccount.name,
    blobServicesName: 'default',
    resourceGroupName: group.name,
    cors: {
      corsRules: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['GET'],
          allowedOrigins: ['*'],
          exposedHeaders: ['*'],
          maxAgeInSeconds: 3600
        }
      ]
    }
  });

  const b2cConfig = config.getObject('b2c') as B2CConfig;
  if (!b2cConfig) throw new Error('There is no "b2c" in the stack config.');

  const backstage = all([coreApi.defaultHostName]).apply(
    ([coreApiHostName]) =>
      new StringAsset(
        JSON.stringify({
          variables: {
            'connections:core:base_url': `https://${coreApiHostName}/api`,
            'auth:azure_b2c:login_page': `https://goodhubauth.b2clogin.com/${b2cConfig.tenantId}/oauth2/v2.0/authorize?p=B2C_1_SIGN_IN_SIGN_UP&client_id=${b2cConfig.uiId}&nonce=defaultNonce&redirect_uri={{redirect_url}}%2Fme%2Fredirect&scope=openid%20https%3A%2F%2F${b2cConfig.tenantId}%2F${b2cConfig.audienceId}%2FAPI.Access&response_type=id_token%20token&prompt=login`,
            'auth:azure_b2c:openid_audience': b2cConfig.audienceId,
            'auth:azure_b2c:openid_config_url': b2cConfig.configUrl
          }
        })
      )
  );

  const backstageContainer = new BlobContainer(`${id}-backstage`, {
    resourceGroupName: group.name,
    accountName: storageAccount.name,
    containerName: 'backstage',
    publicAccess: 'Blob'
  });

  const backstageBlob = new Blob(`${id}-backstage-index`, {
    blobName: 'config.json',
    resourceGroupName: group.name,
    accountName: storageAccount.name,
    containerName: backstageContainer.name,
    source: backstage,
    contentType: 'application/json'
  });

  return { url: backstageBlob.url };
};

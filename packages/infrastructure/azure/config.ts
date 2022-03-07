import * as pulumi from '@pulumi/pulumi';
import { ResourceGroup } from '@pulumi/azure-native/resources';
import { ConfigurationStore, KeyValue } from '@pulumi/azure-native/appconfiguration'
import { WebApp } from '@pulumi/azure-native/web'
import { B2CConfig } from '..';

interface Arguments {
  id: string,
  stack: string
}

export const setupConfig = (group: ResourceGroup, coreApi: WebApp, functionsApi: WebApp, { id, stack }: Arguments) => {

  const config = new pulumi.Config()
  const configuration = new ConfigurationStore(`${id}-config`, {
    resourceGroupName: group.name,
    sku: {
      name: stack === 'prod' ? 'standard' : 'free'
    }
  })

  new KeyValue(`${id}-config-base-url`, {
    configStoreName: configuration.name,
    resourceGroupName: group.name,
    keyValueName: `connections:core:base_url$${stack}`,
    value: pulumi.interpolate`https://${coreApi.defaultHostName}/api`
  })

  const b2cConfig = config.getObject('b2c') as B2CConfig
  if (!b2cConfig) throw new Error('There is no "b2c" in the stack config.')

  new KeyValue(`${id}-config-login-page`, {
    configStoreName: configuration.name,
    resourceGroupName: group.name,
    keyValueName: `auth:azure_b2c:login_page$${stack}`,
    value: pulumi.interpolate`https://goodhubauth.b2clogin.com/${b2cConfig.tenantId}/oauth2/v2.0/authorize?p=B2C_1_SIGN_IN_SIGN_UP&client_id=${b2cConfig.uiId}&nonce=defaultNonce&redirect_uri={{redirect_url}}%2Fme%2Fredirect&scope=openid%20https%3A%2F%2F${b2cConfig.tenantId}%2F${b2cConfig.audienceId}%2FAPI.Access&response_type=id_token%20token&prompt=login`,

  })

  new KeyValue(`${id}-config-audience`, {
    configStoreName: configuration.name,
    resourceGroupName: group.name,
    keyValueName: `auth:azure_b2c:openid_audience$${stack}`,
    value: b2cConfig.audienceId
  })

  new KeyValue(`${id}-config-openid`, {
    configStoreName: configuration.name,
    resourceGroupName: group.name,
    keyValueName: `auth:azure_b2c:openid_config_url$${stack}`,
    value: b2cConfig.configUrl
  })

  new KeyValue(`${id}-config-upload-image`, {
    configStoreName: configuration.name,
    resourceGroupName: group.name,
    keyValueName: `microservices:upload_image:url$${stack}`,
    value: pulumi.interpolate`https://${functionsApi.defaultHostName}/api/upload-image`
  })

  new KeyValue(`${id}-config-resolve-link`, {
    configStoreName: configuration.name,
    resourceGroupName: group.name,
    keyValueName: `microservices:resolve_link:url$${stack}`,
    value: pulumi.interpolate`https://${functionsApi.defaultHostName}/api/resolve-link`
  })

  new KeyValue(`${id}-config-graphic-to-image`, {
    configStoreName: configuration.name,
    resourceGroupName: group.name,
    keyValueName: `microservices:graphic_to_image:url$${stack}`,
    value: pulumi.interpolate`https://${functionsApi.defaultHostName}/api/graphic-to-image`
  })

}
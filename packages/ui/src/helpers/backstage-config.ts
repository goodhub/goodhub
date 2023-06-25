import { BackstageConfig } from '@softwareimaging/backstage';

export interface GoodHubConfig extends BackstageConfig {
  variables: {
    'auth:azure_b2c:login_page': string;
    'auth:azure_b2c:openid_audience': string;
    'auth:azure_b2c:openid_config_url': string;
    'connections:core:base_url': string;
    'microservices:graphic_to_image:url': string;
    'microservices:upload_image:url': string;
    'microservices:resolve_link:url': string;
    'connections:ui:base_url': string;
  };
  flags: {};
}

export type Variables = keyof GoodHubConfig['variables'];
export type Flags = keyof GoodHubConfig['flags'];

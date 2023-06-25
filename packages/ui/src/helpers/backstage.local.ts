const config = {
  variables: {
    'connections:ui:base_url': 'http://localhost:3000',
    'connections:core:base_url': 'http://localhost:3001/api',
    'auth:azure_b2c:login_page':
      'https://goodhubauth.b2clogin.com/goodhubauth.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SIGN_IN_SIGN_UP&client_id=7e2eb519-e42a-4bd2-b503-0cbeefc3a8b0&nonce=defaultNonce&redirect_uri={{redirect_url}}%2Fme%2Fredirect&scope=openid%20https%3A%2F%2Fgoodhubauth.onmicrosoft.com%2Fa8ae6295-d167-4d31-bcca-5cba0eeb20f8%2FAPI.Access&response_type=id_token%20token&prompt=login',
    'auth:azure_b2c:openid_audience': 'a8ae6295-d167-4d31-bcca-5cba0eeb20f8',
    'auth:azure_b2c:openid_config_url':
      'https://goodhubauth.b2clogin.com/goodhubauth.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_SIGN_IN_SIGN_UP'
  },
  flags: {}
};

export default config;

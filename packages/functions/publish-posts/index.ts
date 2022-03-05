import { AzureFunction, Context } from '@azure/functions';
import fetch from 'node-fetch';


const PublishPosts: AzureFunction = async function (context: Context): Promise<void> {


  try {

    const token = await authenticateWithCoreAPI();
    const result = await publishPendingPosts(token);
    context.log(result);

  } catch (e) {

  }

};

export default PublishPosts;

const authenticateWithCoreAPI = async () => {
  const tenant = process.env.AUTH_TENANT_ID
  const appId = process.env.AUTH_GRAPH_FUNCTIONS_ID
  const appPassword = process.env.AUTH_GRAPH_FUNCTIONS_PASSWORD
  const grantType = 'client_credentials';
  const scope = encodeURIComponent('https://goodhubplayground.onmicrosoft.com/0323bd63-fd18-4eea-89bc-ffc18d48da5f/.default');
  
  const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', }, 
    body: `grant_type=${grantType}&client_id=${appId}&scope=${scope}&client_secret=${appPassword}`
  })
  
  if (!response.status.toString().startsWith('2')) {
    throw new Error(`Communication with Azure B2C failed: ${await response.text()}`);
  }

  const token = await response.json();
  return token;
}

const publishPendingPosts = async (token: any) => {
  const apiBaseURL = process.env.API_BASE_URL

  const response = await fetch(`${apiBaseURL}/posts/publish`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization' : `${token.token_type} ${token.access_token}`,
      'X-Server-To-Server': 'active'
    }
  })

  if (!response.status.toString().startsWith('2')) {
    throw new Error(`Could not publish posts: ${await response.text()}`);
  }

  const results = await response.json();
  return results;
}
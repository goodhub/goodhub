import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { authenticateWithGraph, getOrganisationsForUser, updateOrganisationForUser } from '../add-organisation-to-user';

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

const RemoveOrganisationFromUser: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {

    const personId = req.body?.personId;
    const organisationId = req.body?.organisationId;
  
    if (!personId || !organisationId) throw new Error('Not all required parameters have been supplied.');
    
    const token = await authenticateWithGraph();
  
    const extensionAppId = await getSetting('infra:azure_b2c:extension_app_id')
    const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
    const organisationsKey = `extension_${formattedExtensionAppId}_`;
  
    const user = await getOrganisationsForUser(personId, organisationsKey, token);
    const organisations = user.organisations.filter(o => o === organisationId);
    
    const results = updateOrganisationForUser(user.id, organisationsKey, organisations, token);

    context.res = {
      status: Status.Success,
      body: results
    };

  } catch (e) {

    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }

};

export default RemoveOrganisationFromUser;
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { authenticateWithGraph, getOrganisationsForUser, updateOrganisationForUser } from '../add-organisation-to-user';

import { getSetting } from '../backstage';

enum Status {
  Success = 200,
  Failure = 400
}

const RemoveOrganisationFromUser: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {

    const oId = req.body?.oId;
    const organisationId = req.body?.organisationId;
  
    if (!oId || !organisationId) throw new Error('Not all required parameters have been supplied.');
    
    const token = await authenticateWithGraph();
  
    const extensionAppId = await getSetting('infra:azure_b2c:extension_app_id')
    const formattedExtensionAppId = extensionAppId.replace(/-/g, '');
    const organisationsKey = `extension_${formattedExtensionAppId}_Organisations`;
  
    const existingOrganisations = await getOrganisationsForUser(oId, organisationsKey, token);
    const organisations = existingOrganisations.filter(o => o === organisationId);
    
    const results = updateOrganisationForUser(oId, organisationsKey, organisations, token);

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
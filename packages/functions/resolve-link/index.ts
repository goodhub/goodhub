import { AzureFunction, Context, HttpRequest } from '@azure/functions';

import * as OpenGraphClient from 'open-graph-scraper';

enum Status {
  Success = 200,
  Failure = 400
}

const ResolveLink: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {

    const response = await OpenGraphClient({
      url: req.body.url
    })
    
    if (response.error) {
      throw response.result;
    }

    context.res = {
      status: Status.Success,
      body: response.result
    };

  } catch (e) {

    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }
};

export default ResolveLink;
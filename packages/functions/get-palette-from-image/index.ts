import { AzureFunction, Context, HttpRequest } from '@azure/functions';

import Vibrant = require('node-vibrant')

enum Status {
  Success = 200,
  Failure = 400
}

const GetPaletteFromImage: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

  try {

    const palette = await Vibrant.from(req.body.url).getPalette()
    context.res = {
      status: Status.Success,
      body: {
        color: palette.Vibrant.hex
      }
    };

  } catch (e) {

    context.res = {
      status: Status.Failure,
      body: e.message
    };

  }

};

export default GetPaletteFromImage;
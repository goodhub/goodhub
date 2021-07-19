import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import * as puppeteer from 'puppeteer';
import { Dir } from 'temporary';
import { v4 } from 'uuid';
import { UploadImage, ProcessedImage, Status } from '../upload-image';

const tempDir = new Dir();

const GraphicToImage: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('HTTP trigger function processed a request.');

  try {

    const image: Partial<ProcessedImage> = {
      location: { path: `${tempDir.path}/${v4()}.png` },
      alt: 'alt',
      mimetype: 'image/png',
      encoding: 'binary',
      name: 'name'
    }

    const url = req.body.url || "http://localhost:3000";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 600,
      height: 314,
      deviceScaleFactor: 2
    });
    await page.goto(`${url}/graphics?config=${encodeURIComponent(JSON.stringify(req.body.config))}`);
    await page.waitForTimeout(1000)
    await page.screenshot({ fullPage: true, path: image.location.path });
    await browser.close();
    const result = await UploadImage(context, null, image);

    context.res = {
      status: Status.Success,
      body: result
    };

  } catch (e) {

    context.res = {
      status: Status.Failure,
      body: e.message
    };
    
  }

};

export default GraphicToImage;
import fetch from "node-fetch";
import { WorkingFolder } from "..//helpers/temp";
import { writeFile } from "fs/promises";

import db from "./database-client";
import { Model } from "sequelize";
import {
  syncOptions,
  requiredString,
  requiredDate,
  requiredJSON,
  optionalString,
} from "../helpers/db";
import { IGraphic, IImage, NotFoundError } from "../../../shared";
import { v4 } from "uuid";
import { processAndUploadImage, ProcessedImage } from "./image-service";

class Graphic extends Model {}

(async () => {
  try {
    Graphic.init(
      {
        id: {
          ...requiredString,
          primaryKey: true,
        },
        createdBy: { ...requiredString },
        createdAt: { ...requiredDate },
        organisationId: { ...requiredString },
        configuration: { ...requiredJSON },
        imageId: { ...optionalString },
        alt: { ...requiredString },
      },
      {
        sequelize: await db(),
        modelName: "Graphic",
      }
    );

    await Graphic.sync(syncOptions);
    console.log('[DEV] Successful table sync for "Graphic"');
  } catch (err) {
    console.log('[DEV] Failed table sync for "Graphic"');
    console.error(err);
    process.exit(1);
  }
})();

export const createGraphic = async (
  personId: string,
  organisationId: string,
  scene: string,
  configuration: Record<string, number | string>,
  alt: string
) => {
  const graphic: IGraphic = {
    id: v4(),
    createdBy: personId,
    createdAt: new Date(),
    alt,
    organisationId,
    scene,
    configuration,
  };

  const response = await Graphic.create(graphic);
  return response.toJSON() as IGraphic;
};

export const updateGraphic = async (
  graphicId: string,
  image: IImage
): Promise<IGraphic> => {
  const response = await Graphic.findByPk(graphicId);
  if (!response) throw new Error("Graphic not found");
  const graphic = response.toJSON() as IGraphic;
  graphic.imageId = image.id;
  await Graphic.update(graphic, { where: { id: graphicId } });
  return graphic;
};

export const getGraphic = async (graphicId: string) => {
  const response = await Graphic.findByPk(graphicId);
  if (!response) throw new NotFoundError("Graphic not found");
  return response.toJSON() as IGraphic;
};

export const renderGraphic = async (graphicId: string) => {
  const dir = await WorkingFolder.init();
  const response = await Graphic.findByPk(graphicId);
  if (!response) throw new Error("Graphic not found");
  const graphic = response.toJSON() as IGraphic;
  const file = await captureGraphicImage(graphic, dir);
  const processedImage: ProcessedImage = {
    alt: graphic.alt,
    encoding: "binary",
    location: file,
    mimetype: "image/png",
  };
  return await processAndUploadImage(processedImage, graphic.createdBy, dir);
};

export const captureGraphicImage = async (
  graphic: IGraphic,
  dir: WorkingFolder
) => {
  const url = process.env.UI_BASE_URL;
  const token = process.env.BROWSERLESS_TOKEN;
  const response = await fetch(
    `https://${process.env.BROWSERLESS_HOST}/screenshot?token=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: `${url}/graphics?config=${encodeURIComponent(
          JSON.stringify(graphic.configuration)
        )}`,
        options: {
          type: "png",
          encoding: "binary",
        },
        gotoOptions: {
          waitUntil: "networkidle2",
        },
        viewport: {
          height: 314,
          width: 600,
          deviceScaleFactor: 2,
        },
      }),
    }
  );

  if (!response.ok) {
    console.error(await response.text());
    throw new Error("Failed to capture graphic image");
  }

  const image = await response.buffer();
  const file = dir.file();
  await writeFile(file.path, image);
  return file;
};

import { IGraphic, IImage } from "../../../shared";
import { getDefaultFetchOptions } from "./authentication-service";

export const uploadImage = async (image: File, alt: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const form = new FormData();
  form.append("image", image);
  form.append("alt", alt);

  const response = await fetch(`${baseUrl}/images`, {
    ...options,
    method: "POST",
    body: form,
  });
  return response.json();
};

export const getGraphic = async (graphicId: string) => {
  const { baseUrl, options } = await getDefaultFetchOptions();
  const response = await fetch(`${baseUrl}/images/graphic/${graphicId}`, {
    ...options,
  });
  return (await response.json()) as IGraphic;
};

export const graphicToImage = async (
  organisationId: string,
  sceneId: string,
  graphic: { [key: string]: any }
) => {
  const { baseUrl, options } = await getDefaultFetchOptions();

  const response = await fetch(`${baseUrl}/images/graphic/${sceneId}`, {
    ...options,
    method: "POST",
    body: JSON.stringify({
      configuration: graphic,
      alt: "Graphic",
      organisationId,
    }),
  });
  return (await response.json()) as IImage;
};

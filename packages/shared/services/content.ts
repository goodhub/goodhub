type url = string;

export type IImage = {
  id: string;
  original: url;
  standard: url;
  thumbnail: url;
  alt: string;
  ratio: number;
  createdBy?: string;
  placeholder: {
    backgroundImage: string;
    backgroundPosition: string;
    backgroundSize: string;
    backgroundRepeat: string;
  };
};

export type IGraphic = {
  id: string;
  createdBy: string;
  createdAt: Date;
  organisationId: string;
  scene: string;
  alt: string;
  imageId?: string;
  configuration: Record<string, number | string>;
};

export interface ParagraphBlock {
  type: 'unstyled';
  text: string;
}

export type Block = ParagraphBlock;
export interface Content {
  time: number;
  blocks: Block[];
  version: string;
}

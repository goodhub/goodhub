import { Content, IImage } from './content';
import { ISocial } from './organisation';

export enum IPostOrigin {
  GoodHub = 'GoodHub'
}

export enum IPostType {
  Update = 'Update',
  CallToAction = 'CallToAction',
  Announcement = 'Announcement',
  Other = 'Other'
}

export enum IPostIdentity {
  Individual = 'Individual',
  Organisation = 'Organisation'
}

type IHero = IHeroImage | IHeroGraphic | IHeroVideo | IHeroLink;

export interface IHeroImage {
  type: 'image';
  image: IImage;
}

export interface IHeroGraphic {
  type: 'graphic';
  image?: IImage;
  graphic: { [key: string]: any };
}

export interface IHeroVideo {
  type: 'video';
  video: { url: string };
}

export interface IHeroLink {
  type: 'link';
  link: {
    url: string;
    resolution: {
      ogType: 'website' | 'object' | 'article';
      ogUrl: string;
      ogTitle: string;
      ogDescription: string;
      ogSiteName: string;
      ogImage: {
        url: string;
        width?: number;
        height?: number;
        type: 'jpg' | 'png';
      };
      requestUrl: string;
      success: true;
    };
  };
}

export interface IConnection {}

export enum IPostParent {
  Feed = 'Feed',
  Forum = 'Forum'
}

export interface IComment {
  id: string;
  text: string;
  replyId?: string;
  postedIdentity: IPostIdentity;
  postedBy: string;
  postedAt: Date;
}

export enum IPostStatus {
  Deleted = 'Deleted',
  Scheduled = 'Scheduled',
  Posted = 'Posted'
}

export interface IPost {
  id: string;
  projectId: string;
  parentId: IPostParent;
  organisationId: string;
  postedAt: Date;
  postedBy: string;
  origin: IPostOrigin;
  postedIdentity: IPostIdentity;
  type: IPostType;
  tags: string[];
  keywords?: string[];
  likes?: string[];
  comments?: IComment[];
  title?: string;
  text: Content;
  summary?: string;
  hero?: IHero;
  connections?: IConnection[];
  targets?: ISocial[];

  publishedToWebsite?: boolean;
  publishedToFeed?: boolean;
  status?: IPostStatus;
  scheduledDate?: Date;
}

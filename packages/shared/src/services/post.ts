import { Content, IImage } from './content';

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

type IHero = IHeroImage;

export interface IHeroImage {
  type: 'image'
  image: IImage
}

export interface IConnection {}

export enum IPostParent {
  Feed = 'Feed',
  Forum = 'Forum'
}

export interface IComment {
  id: string
  text: string
  replyId?: string
  postedIdentity: IPostIdentity
  postedBy: string
  postedAt: Date
}

export interface IPost {
  id: string,
  projectId: string,
  parentId: IPostParent
  organisationId: string,
  postedAt: Date,
  postedBy: string,
  origin: IPostOrigin,

  postedIdentity: IPostIdentity
  type: IPostType
  tags: string[]
  keywords?: string[]
  likes?: string[]
  comments?: IComment[]
  title?: string
  text: Content
  summary?: string
  hero?: IHero
  connections?: IConnection[]
}

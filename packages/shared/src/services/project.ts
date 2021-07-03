import { Content, IImage } from './content';
import { IExternalLink } from './organisation';

export interface IProject {
  id: string
  organisationId: string
  name: string
  description: string
  hero?: IImage
  about?: Content
  externalLinks?: IExternalLink[]
  /** TopicTags */ tags?: string[]
  /** PersonId[] */ people: string[]
  /** PersonId */ primaryContact: string
}
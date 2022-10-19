import { Content, IImage } from './content';

// interface Color {
//   rgb: [number, number, number],
//   hsl: [number, number, number],
//   hex: string
// }

export interface IExternalLink {
  id: string
  name: string
  description: string
  url: string
  icon?: string
}

export interface IWebsiteHeroStyle {
  position: 'leading' | 'center' | 'trailing'
  style: 'greyscale' | 'tinted' | 'light' | 'dark'
}

export interface IWebsiteHero {
  title: string
  subtitle: string
  style: IWebsiteHeroStyle
  image?: IImage
}

export interface IWebsiteConfiguration {
  id: string
  name: string
  description: string
  verified: boolean
  alert?: string
  slug?: string
  domainName?: string
  logos?: {
    outline: string
    small: string
    large: string
  }
  pages?: {
    about: boolean
    updates: boolean
    contact: boolean
  }
  brandColors: [string, string, string, string]
  about?: Content
  hero?: IWebsiteHero
  featuredProjects?: string[]
  externalLinks?: IExternalLink[]
  footer?: {
    text: Content
    items: IImage[]
  }
  contactPhoneNumber: string
  contactAddress: string
  UKCharityNumber: string
  tags: ITag[]
}

export enum ITag {
  Animals = 1,
  Business = 2,
  Heritage = 3,
  Transport = 4,
  Employment = 5,
  Housing = 6,
  Hospitality = 7,
  NeighbourhoodRenewal = 8,
  EthnicMinorityCommunities = 9,
  Relationships = 10,
  FitnessAndSports = 11,
  JusticeAndWelfare = 12,
  HealthAndWellness = 13,
  Gardening = 14,
  Technology = 15,
  ArtsAndCrafts = 16,
  Music = 17,
  Women = 18,
  Rural = 19,
  YoungAdults = 20,
  DisabilityAndImpairment = 21,
  Men = 22,
  SeniorCare = 23,
  EarlyYears = 24,
  Children = 25
}

export const Tags = [
  ITag.Animals,
  ITag.Business,
  ITag.Heritage,
  ITag.Transport,
  ITag.Employment,
  ITag.Housing,
  ITag.Hospitality,
  ITag.NeighbourhoodRenewal,
  ITag.EthnicMinorityCommunities,
  ITag.Relationships,
  ITag.FitnessAndSports,
  ITag.JusticeAndWelfare,
  ITag.HealthAndWellness,
  ITag.Gardening,
  ITag.Technology,
  ITag.ArtsAndCrafts,
  ITag.Music,
  ITag.Women,
  ITag.Rural,
  ITag.YoungAdults,
  ITag.DisabilityAndImpairment,
  ITag.Men,
  ITag.SeniorCare,
  ITag.EarlyYears,
  ITag.Children,
]

export interface IOrganisation {
  id: string
  name: string
  slug?: string
  domainName?: string
  people: string[],
  profilePicture?: IImage
}



export enum ISocial {
  Facebook = 'facebook',
  Website = 'website',
  Community = 'community'
}


export interface ISocialConfig {
  [ISocial.Facebook]: {
    pageToken: string
    pageId: string
  }
}

export interface IExtendedOrganisation {
  id: string
  name: string
  slug?: string
  domainName?: string
  brandColors: [string, string, string, string]
  description: string
  profilePicture?: IImage
  verified: boolean
  hero?: IWebsiteHero
  about?: Content
  social?: ISocialConfig
  alert?: string
  featuredProjects?: string[]
  externalLinks?: IExternalLink[]
  contactAddress: string
  contactPhoneNumber: string
  UKCharityNumber: string
  tags: ITag[]
  people: string[]
}
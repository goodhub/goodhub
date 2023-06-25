import { IImage } from './content';

export enum IPersonState {
  Unknown = 'Unknown',
  RequiresOnboarding = 'RequiresOnboarding',
  Identified = 'Identified'
}

export interface IPerson {
  id: string;
  state: IPersonState;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: IImage;
}

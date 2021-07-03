import { FC } from 'react';
import { useAuthenticationService } from '../../services/authentication-service';
import { usePersonService } from '../../services/person-service';
import UnderConstruction from '../generic/UnderConstruction';

export interface MeProps {}
 
const Me: FC<MeProps> = () => {

  const user = useAuthenticationService(state => state.user);
  const person = usePersonService(state => state.person);

  return <UnderConstruction>
    <p>{ user ? JSON.stringify(user, null, 2) : 'No user' }</p>
    <p>{ person ? JSON.stringify(person, null, 2) : 'No person' }</p>
  </UnderConstruction>;
}

export default Me;
import { FC } from 'react';
import { useAuthenticationService } from '../services/authentication-service';
import { usePersonService } from '../services/person-service';

export interface MeProps {}
 
const Me: FC<MeProps> = () => {

  const user = useAuthenticationService(state => state.user);
  const person = usePersonService(state => state.person);

  return <div>
    <p>{ user ? JSON.stringify(user, null, 2) : 'No user' }</p>
    <p>{ person ? JSON.stringify(person, null, 2) : 'No person' }</p>
  </div>;
}

export default Me;
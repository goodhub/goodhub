import { FC, useEffect } from 'react';
import { useAuthenticationService } from '../services/authentication-service';
import { getPersonByUserOid, usePersonService } from '../services/person-service';

export interface MeProps {}
 
const Me: FC<MeProps> = () => {

  const user = useAuthenticationService(state => state.user);
  const [setPerson] = usePersonService(state => [state.setPerson]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const person = await getPersonByUserOid(user.oid);
      setPerson(person);
    })()
  }, [user, setPerson])

  return <div>
    <p>{ user ? JSON.stringify(user, null, 2) : 'No user' }</p>
  </div>;
}

export default Me;
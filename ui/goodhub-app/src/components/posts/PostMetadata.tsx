import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { IPostIdentity } from '@strawberrylemonade/goodhub-lib';
import { getPerson } from '../../services/person-service';
import { CacheStatus, usePostService } from '../../services/post-service';
import Skeleton from '../generic/Skeleton';

export interface PostMetadataProps {
  postedAt: string
  identity: IPostIdentity
  personId: string
  organisationId: string
}

export const PostMetadata: FC<PostMetadataProps> = ({ postedAt, identity, personId, organisationId }) => {

  const [
    person, addPersonToCache, initiatedPersonLookup,
  ] = usePostService(state => [state.people[personId], state.addPersonToCache, state.initiatedPersonLookup])

  const [currentId] = useState(v4())

  useEffect(() => {
    (async () => {

      if (!person?.status) {
        // The person is not available in the cache and will be requested
        // This will not override if another actor has already requested to
        // complete the task
        initiatedPersonLookup(personId, currentId)
        return;
      }

      if (person.status === CacheStatus.Retrieved) {
        // The person is retrieved and can be used
        return;
      }

      if (person.status === CacheStatus.Loading && person.loader !== currentId) {
        // This component is aware the person is being loaded but they are not responsible
        return;
      }

      // This component responsible and are getting the person
      const response = await getPerson(personId);
      addPersonToCache(response);  
    })()
  }, [person, addPersonToCache])
  
  return <div className="flex items-center">
    <div className="w-10 h-10 border border-gray-200 rounded-full mr-3"></div>
    <div className="flex flex-col justify-center leading-5">
      <div className="flex items-center">
        <p className="text-gray-800 mr-1">
          { identity === IPostIdentity.Individual
            ? person?.cache ? `${person?.cache?.firstName} ${person?.cache?.lastName}` : <Skeleton width={100} />
            : person?.cache ? 'James’ Biscuit Trust' : <Skeleton opacity={0.6} width={130} /> }
        </p>
        <p className="text-gray-500 text-sm">• {postedAt}</p>
      </div>
      { identity === IPostIdentity.Individual ? <p className="text-gray-700 text-sm">On behalf of <span className="font-medium"> { person?.cache ? 'James’ Biscuit Trust' : <Skeleton opacity={0.6} width={130} /> } </span></p> : null }
    </div>
  </div>
}

{/* rounded-lg */}
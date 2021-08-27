import { IWebsiteConfiguration } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
//import { RiUserFollowLine, RiUserUnfollowLine } from 'react-icons/ri';
import { useHistory, useParams } from 'react-router';
import { useErrorService } from '../../services/error-service';
import { followOrganisation, usePersonService } from '../../services/person-service';
import { getWebsiteConfiguration } from '../../services/website-service';
import StandardRoute from '../authentication/StandardRoute';
import { ContentRenderer } from '../content/ContentRenderer';
import BackgroundImage from '../generic/BackgroundImage';
import Page from '../generic/Page';
import Skeleton from '../generic/Skeleton';
import Title from '../generic/Title';
import Posts from '../posts/Posts';
import VolunteerSignUpModal from './VolunteerSignUpModal';

export interface OrganisationProfileParams {
  organisationId: string
}
export interface OrganisationProfileProps { }

const OrganisationProfile: FC<OrganisationProfileProps> = () => {

  const setError = useErrorService(state => state.setError);
  const [organisation, setOrganisation] = useState<IWebsiteConfiguration>();
  const [person, setPerson] = usePersonService(state => [state.person, state.setPerson])
  const { organisationId } = useParams<OrganisationProfileParams>();
  
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!organisationId) return;
      try {
        const organisation = await getWebsiteConfiguration(organisationId);
        setOrganisation(organisation);
      } catch (e) {
        setError(e);
      }
    })()
  }, [organisationId, setOrganisation, setError])

  const toggleFollowOrganisation = async () => {
    if (!organisationId) return;
    try {
      const person = await followOrganisation(organisationId);
      setPerson(person);
    } catch (e) {
      setError(e);
    }
  }

  return <>
    <StandardRoute path="/organisations/:organisationId/volunteer">
      <VolunteerSignUpModal organisationName={organisation?.name} organisationId={organisationId} />
    </StandardRoute>
    <Page
      loading={!organisation}
      title={<Title size="3xl">
        { organisation ? organisation?.name : <Skeleton width="300" /> }
      </Title>}
      // actions={[
      //   { name: 'Volunteer', onClick: () => history.push(`/organisations/${organisationId}/volunteer`)},
      //   // @ts-ignore
      //   { name: person?.following && person?.following.reduce((o, p) => {
      //     if (o) return o;
      //     return p.id === organisationId
      //   }, false) 
      //     ? <>
      //         <RiUserUnfollowLine className="-ml-1 mr-2 h-5 w-5" />
      //         Unfollow
      //       </>
      //     : <>
      //         <RiUserFollowLine className="-ml-1 mr-2 h-5 w-5" />
      //         Follow
      //     </>,
      //     onClick: () => toggleFollowOrganisation(), mode: 'plain' }
      // ]}
    >
      { organisation?.hero ? <div className="flex flex-col mt-4">
        { organisation.hero.image ? <div className="bg-white shadow-sm h-32 w-full lg:h-48 rounded-md overflow-hidden relative"><BackgroundImage image={organisation.hero.image} /></div> : null }
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 z-10">
          <div className="-mt-20 sm:-mt-24 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              {/* @ts-ignore */}
              <img className="h-24 w-24 bg-white rounded-lg shadow-md ring-4 ring-white sm:h-32 sm:w-32" src={organisation?.profilePicture?.original} alt={organisation?.profilePicture?.alt}/>
            </div>
          </div>
          <div className="mt-6">
            { organisation?.about ? <ContentRenderer content={organisation?.about} /> : null }
          </div>
          { organisation ? <Posts orgId={organisation.id} columns={2} /> : organisation }
        </div>
      </div> : null }
    </Page>
  </>
}

export default OrganisationProfile;
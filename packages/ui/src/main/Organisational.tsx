import { FC } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/generic/Spinner';
import Navigation from '../translations/Navigation';
import Card from '../components/generic/Card';
import { useOrganisations } from '../services/hooks/organisations';

const Organisational: FC = ({ children }) => {
  const { organisation } = useOrganisations();

  const onboardingSteps = [
    !organisation?.domainName ? (
      <Link
        to={`/dashboard/${organisation?.id}/website`}
        className="flex-1 flex flex-col items-start justify-start border-gray-100"
      >
        <h2 className="font-bold text-primary-800 text-lg sm:text-xl ml-0">
          {Navigation.callToActions.getAWebsiteHeader}
        </h2>
        <p>{Navigation.callToActions.getAWebsiteDesc}</p>
        <div className="flex items-center text-primary-500 mt-1">
          <p className="text-sm font-semibold">
            {Navigation.callToActions.getAWebsiteButton} <span aria-hidden="true">→</span>
          </p>
        </div>
      </Link>
    ) : undefined,
    !organisation?.projects || organisation?.projects.length === 0 ? (
      <Link to={`/dashboard/${organisation?.id}/projects`} className="flex-1 flex flex-col items-start justify-start">
        <h2 className="font-bold text-primary-800 text-lg sm:text-xl ml-0">
          {Navigation.callToActions.createServiceHeader}
        </h2>
        <p>{Navigation.callToActions.createServiceDesc}</p>
        <div className="flex items-center text-primary-500 mt-1">
          <p className="text-sm font-semibold">
            {Navigation.callToActions.createServiceButton} <span aria-hidden="true">→</span>
          </p>
        </div>
      </Link>
    ) : undefined,
    organisation && organisation.people.length <= 1 ? (
      <Link
        to={`/dashboard/${organisation?.id}/team`}
        className="flex-1 flex flex-col items-start justify-start border-gray-100"
      >
        <h2 className="font-bold text-primary-800 text-lg sm:text-xl ml-0">
          {Navigation.callToActions.invitePersonHeader}
        </h2>
        <p>{Navigation.callToActions.invitePersonDesc}</p>
        <div className="flex items-center text-primary-500 mt-1">
          <p className="text-sm font-semibold">
            {Navigation.callToActions.invitePersonButton} <span aria-hidden="true">→</span>
          </p>
        </div>
      </Link>
    ) : undefined
  ].filter(Boolean);

  return (
    <div className="flex flex-grow flex-col">
      {organisation && onboardingSteps.length ? (
        <Card className="overflow-hidden mb-4">
          <div className="border-t-8 border-primary-500 p-6 sm:p-8 sm:flex space-y-4 sm:space-y-0 sm:space-x-4">
            {onboardingSteps}
          </div>
        </Card>
      ) : null}
      {organisation ? (
        children
      ) : (
        <div className="flex-1 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Organisational;

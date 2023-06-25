import { IOrganisation } from '../../../../shared';
import { useState, useEffect } from 'react';
import { useAuthenticationService } from '../authentication-service';
import { useErrorService } from '../error-service';
import {
  useOrganisationService,
  getOrganisation,
  getExtendedOrganisation,
  getProjectsForOrganisation,
  OrganisationState
} from '../organisation-service';
import { useParams } from 'react-router-dom';

interface OrganisationalDashboardParams {
  organisationId?: string;
}

export const useOrganisations = () => {
  const [organisations, setOrganisations] = useState<(IOrganisation | string)[]>();
  const user = useAuthenticationService(state => state.user);
  const setError = useErrorService(state => state.setError);

  const [organisation, setOrganisation, state, setState] = useOrganisationService(state => [
    state.organisation,
    state.setOrganisation,
    state.state,
    state.setState
  ]);
  useEffect(() => {
    (async () => {
      try {
        if (!user?.organisations) return;
        setOrganisations(user.organisations);
        const organisations = await Promise.all(user.organisations.map(getOrganisation));
        setOrganisations(organisations);
      } catch (e) {
        setError(e);
      }
    })();
  }, [user, setOrganisations, setError]);

  const params = useParams<OrganisationalDashboardParams>();
  const organisationId = params?.organisationId;

  useEffect(() => {
    (async () => {
      if (organisation && organisation.id === organisationId) return;
      if (!organisationId) return;

      try {
        setState(OrganisationState.Loading);
        const org = await getExtendedOrganisation(organisationId);
        const projects = await getProjectsForOrganisation(org.id);
        setOrganisation({ ...org, projects });
      } catch (e) {
        setError(e);
      }
    })();
  }, [organisationId, organisation, setOrganisation, setError]);

  return {
    organisations,
    organisation,
    setOrganisation,
    state
  };
};

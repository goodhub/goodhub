import { IProject } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProject, useOrganisationService } from '../../../services/organisation-service';
import Page from '../../generic/Page';

export interface ProjectParams {
  organisationId: string
  projectId: string
}

export interface ProjectProps {}

const Project: FC<ProjectProps> = () => {

  const [organisation] = useOrganisationService(state => [state.organisation]);
  const [project, setProject] = useState<Partial<IProject>>()

  const { projectId } = useParams<ProjectParams>();

  useEffect(() => {
    (async () => {
      if (!organisation) return;
      const project = await getProject(organisation.id, projectId);
      setProject(project);
    })()

  }, [organisation, setProject, projectId])


  return <Page 
    title={project?.name}
    loading={!project}
    back={organisation ? {
      title: 'Back to projects',
      to: `/dashboard/${organisation.id}/projects`
    } : undefined}
  >
  </Page>;
}

export default Project;
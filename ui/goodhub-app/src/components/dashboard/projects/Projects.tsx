import { IProject } from '@strawberrylemonade/goodhub-lib/dist/services/project';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useOrganisationService, getProjectsForOrganisation } from '../../../services/organisation-service';
import { getPerson } from '../../../services/person-service';
import { ModalState } from '../../generic/Modal';
import Page from '../../generic/Page';
import Table, { HeadingType } from '../../generic/Table';
import { CreateProjectModal } from './CreateProjectModal';

export interface ProjectsProps {}

const Projects: FC<ProjectsProps> = () => {

  const [organisation] = useOrganisationService(state => [state.organisation]);
  const [projects, setProjects] = useState<Partial<IProject>[]>()
  const [createProjectModalState, setCreateProjectModalState] = useState<ModalState>(ModalState.Closed)

  const history = useHistory();

  const getProjects = async (orgId: string) => {
    setProjects(undefined);
    const projects = await getProjectsForOrganisation(orgId);
    setProjects(projects.map(p => ({ id: p.id, name: p.name, primaryContact: undefined })));

    const identifiedProjects = await Promise.all(projects.map(async (p: IProject) => {
      const person = await getPerson(p.primaryContact);
      p.primaryContact = `${person.firstName}  ${person.lastName}`;
      return p;
    }));

    setProjects(identifiedProjects);
  }

  useEffect(() => {
    (async () => {
      if (!organisation) return;
      await getProjects(organisation.id);
    })()

  }, [organisation])


  return <Page 
    title="Projects"
    actions={[
      { name: 'Create a new project', 
        onClick: () => setCreateProjectModalState(ModalState.Open) },
    ]}
  >
  { organisation ? <CreateProjectModal orgId={organisation?.id} state={createProjectModalState} onDismiss={() => { setCreateProjectModalState(ModalState.Closed); getProjects(organisation.id) }} /> : null }

  <Table 
    title="Projects"
    content={projects}
    placeholder="No projects"
    headings={[
      { name: 'name', type: HeadingType.Text },
      { name: 'primaryContact', type: HeadingType.Text },
    ]}
    actions={[
      { name: 'View & edit', onClick: (id) => {
        if (organisation) history.push(`/dashboard/${organisation.id}/projects/${id}`)
       }}
    ]}
  />
  </Page>;
}

export default Projects;
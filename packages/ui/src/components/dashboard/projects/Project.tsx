import { IProject } from '../../../../../shared';
import { FC, useEffect, useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import { MdMailOutline } from 'react-icons/md';
import { RiMessage2Line } from 'react-icons/ri';
import { useParams } from 'react-router';
import { getProject, getVolunteersForOrganisation, useOrganisationService } from '../../../services/organisation-service';
import Navigation from '../../../translations/Navigation';
import Button from '../../generic/Button';
import Page from '../../generic/Page';
import Table, { HeadingType } from '../../generic/Table';
import Title from '../../generic/Title';

export interface ProjectParams {
  organisationId: string
  projectId: string
}

export interface ProjectProps { }

const Project: FC<ProjectProps> = () => {

  const [organisation] = useOrganisationService(state => [state.organisation]);
  const [project, setProject] = useState<Partial<IProject>>()
  const [volunteers, setVolunteers] = useState<any>()

  const { projectId } = useParams<ProjectParams>();

  useEffect(() => {
    (async () => {
      if (!organisation) return;
      const project = await getProject(organisation.id, projectId);
      const volunteers = await getVolunteersForOrganisation(organisation.id);
      setProject(project);
      setVolunteers(volunteers);
    })()

  }, [organisation, setProject, projectId])


  return <Page
    title={project?.name}
    loading={!project}
    back={organisation ? {
      title: Navigation.projects.backToProjects,
      to: `/dashboard/${organisation.id}/projects`
    } : undefined}
    actions={[
      { name: <><FiEdit3 className="-ml-1 mr-2 h-5 w-5" />Edit service details</>, onClick: () => {} },
      { name: <><FaRegCopy className="-ml-0.5 mr-3 h-5" />Copy volunteer invite link</>, onClick: () => {} },
      { name: <><MdMailOutline className="-ml-1 mr-2 h-5 w-5" />Email all volunteers</>, onClick: () => {} },
      { name: <><RiMessage2Line className="-ml-1 mr-2 h-5 w-5" />Text all volunteers</>, onClick: () => {} },
      { name: <><FiPlus className="-ml-1 mr-2 h-5 w-5" />Add new member</>, onClick: () => {} },
    ]}
  >
    { volunteers && volunteers.length ? <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <Title size="xl">New</Title>
        <Button mode="plain">Contact new volunteers</Button>
      </div>
      <Table
        placeholder="You don't have any volunteers at the moment"
        headings={[
          { name: 'id', type: HeadingType.Text }
        ]}
        content={volunteers}
      />
    </div> : null }
    <Table
      title="Volunteers"
      placeholder="You don't have any volunteers at the moment"
      headings={[
        { name: 'id', type: HeadingType.Text }
      ]}
      content={volunteers}
    />
  </Page>;
}

export default Project;
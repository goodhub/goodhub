import { IProject } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ContentRenderer } from '../components/content/ContentRenderer';
import BackgroundImage from '../components/generic/BackgroundImage';
import Card from '../components/generic/Card';
import Title from '../components/generic/Title';
import { getProject } from '../services/organisation-service';

export interface ProjectProps {
  orgId: string
}
 
interface ProjectParams {
  projectId: string
}

const Project: FC<ProjectProps> = ({ orgId }) => {

  const { projectId } = useParams<ProjectParams>();
  const [ project, setProject ] = useState<IProject>();

  useEffect(() => {
    (async () => {
      if (!projectId) return;
      setProject(undefined);
      const project = await getProject(orgId, projectId);
      setProject(project);
    })()
  }, [projectId, setProject, orgId])

  return <div className="flex-1 flex flex-col items-center">
    { project?.hero ? <div className="h-56 w-full overflow-hidden relative">
      <BackgroundImage image={project?.hero} />
    </div> : null }
    <Card decoration className={`w-full max-w-4xl overflow-hidden z-10 ${project?.hero ? '-mt-12' : 'mt-8'}`}>
      <div className="px-6 py-8 flex flex-col items-center sm:px-12">
        <p className="text-xs font-medium text-gray-500 uppercase py-1">About us</p>
        <Title className="mb-8">{project?.name}</Title>
        {project?.about ? <ContentRenderer content={project?.about} /> : null}
      </div>
    </Card>
  </div>;
}

export default Project;
import { FC } from 'react';
import { useParams } from 'react-router';

export interface ProjectProps {}
 
interface ProjectParams {
  projectId: string
}

const Project: FC<ProjectProps> = () => {

  const { projectId } = useParams<ProjectParams>();

  return <div className="flex-1">
    { projectId }
  </div>;
}

export default Project;
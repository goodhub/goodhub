import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkboxes } from '../../../generic/forms/CheckboxField';

export interface ProjectConfigurationProps {
  options?: { name: string; title: string }[];
}

const ProjectConfiguration: FC<ProjectConfigurationProps> = ({ options }) => {
  const { register } = useFormContext();

  return (
    <>
      <Checkboxes name="featuredProjectsIds" title="Featured Projects" register={register} value={options} />
    </>
  );
};

export default ProjectConfiguration;

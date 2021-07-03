import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { ContentField } from '../../../generic/forms/ContentField';
import { ImageField } from '../../../generic/forms/ImageField';
import { TextField } from '../../../generic/forms/TextField';

export interface HeroConfigurationProps {}

const HeroConfiguration: FC<HeroConfigurationProps> = () => {

  const { register, errors, setValue, watch } = useFormContext();
  const heroImage = watch('hero.image');
  const about = watch('about');

  return <>
    <TextField 
      name="hero.title" placeholder=""
      register={register}
      title="Title"
      validationFailed={errors?.hero?.title}
      validationMessage="You must enter a title"
    />
    <TextField 
      name="hero.subtitle" placeholder=""
      register={register}
      title="Subtitle"
      validationFailed={errors?.hero?.subtitle}
      validationMessage="You must enter a subtitle"
    />
    <ImageField
      register={register}
      setValue={setValue}
      value={heroImage}
      name="hero.image"
      title="Cover photo"
      description="Choose or give us a background image"
    />
    <ContentField
      name="about"
      register={register}
      setValue={setValue}
      value={about}
    />
  </>;
}

export default HeroConfiguration;
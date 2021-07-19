import { FC, useEffect, useState } from 'react';
import { IHeroLink } from '@strawberrylemonade/goodhub-lib';
import Title from '../../generic/Title';
import { TextInput } from '../../generic/forms/TextInput';

interface PostLinkInputProps {
  setValue: any
  register: any
}

export const PostLinkInput: FC<PostLinkInputProps> = ({ setValue, register }) => {

  useEffect(() => {
    register('hero')
  }, [register])

  const [configuration, setConfiguration] = useState<{ url: string }>();

  const setCustomConfiguration = (data: { url: string }) => {
    setConfiguration(data)
    const hero: IHeroLink = {
      type: 'link',
      link: data
    }
    setValue('hero', hero , { shouldDirty: true });
  }
  return <>
    <Title className="mb-2 hidden sm:block" size="xl">Add a link</Title>
    <TextInput
      name="url"
      description=""
      value={configuration?.url}
      onChange={(value) => setCustomConfiguration({ url: value })}
    />
  </>
};
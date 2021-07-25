import { FC, useEffect, useState } from 'react';
import { IHeroVideo } from '@strawberrylemonade/goodhub-lib';
import Title from '../../generic/Title';
import { TextInput } from '../../generic/forms/TextInput';
import Video from '../Video';

interface PostVideoInputProps {
  value?: IHeroVideo
  setValue: any
  register: any
}

export const PostVideoInput: FC<PostVideoInputProps> = ({ setValue, register, value }) => {

  useEffect(() => {
    register('hero')
  }, [register])

  const [configuration, setConfiguration] = useState<{ url?: string }>({ url: value?.video.url });

  const setCustomConfiguration = (data: { url: string }) => {
    setConfiguration(data)
    const hero: IHeroVideo = {
      type: 'video',
      video: data
    }
    setValue('hero', hero , { shouldDirty: true });
  }
  return <>
    <Title className="mb-2 hidden sm:block" size="xl">Add a YouTube video</Title>
    <TextInput
      name="url"
      description=""
      value={configuration?.url}
      onChange={(value) => setCustomConfiguration({ url: value })}
    />

    { configuration.url ? <Video video={configuration}></Video> : null }
  </>
};
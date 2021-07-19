import { FC, useEffect, useState } from 'react';
import { getSceneById, Scene } from '@strawberrylemonade/kyan';
import { IExtendedOrganisation, IHeroGraphic, IImage } from '@strawberrylemonade/goodhub-lib';
import Title from '../../generic/Title';
import { TextInput } from '../../generic/forms/TextInput';
import { ImageField } from '../../generic/forms/ImageField';

interface MakeGraphicProps {
  organisation: IExtendedOrganisation
  setValue: any
  register: any
}

export const MakeGraphic: FC<MakeGraphicProps> = ({ organisation, setValue, register }) => {

  useEffect(() => {
    register('hero')
  }, [register])

  const [name] = useState<string>('basic');
  const [scene, setScene] = useState<Scene<any>>();
  const [configuration, setConfiguration] = useState<{[key: string]: any }>({
    backgroundColor: '#ad1f7e',
    backgroundStyle: 'waves',
    logo: organisation.profilePicture?.thumbnail,
    title: 'Title of post',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
  });

  const setCustomConfiguration = (data: {[key: string]: any }) => {
    setConfiguration(data)
    const hero: IHeroGraphic = {
      type: 'graphic',
      graphic: {...data, name}
    }
    setValue('hero', hero , { shouldDirty: true });
  }

  useEffect(() => {
    const scene = getSceneById(name);
    setScene(scene);  
  }, [name])
  
  return <>
    <Title className="mb-2 hidden sm:block" size="xl">Make a graphic</Title>
    <TextInput
      name="title"
      description=""
      value={configuration.title}
      onChange={(value) => setCustomConfiguration({ ...configuration, title: value })}
    />
    <TextInput
      name="text"
      description=""
      value={configuration.text}
      onChange={(value) => setCustomConfiguration({ ...configuration, text: value })}
    />
    <ImageField
      name="photo"
      title="Photo"
      description=""
      register={() => {}}
      value={configuration.image}
      setValue={(key: string, value: IImage) => setCustomConfiguration({ ...configuration, image: value, photo: value.original })}
    />


    <label className="block text-sm font-medium text-gray-700">
      Preview
    </label>
    <div className="mt-2 flex justify-center">
      <div className="flex overflow-hidden rounded bg-white" style={{ height: 261, width: 500 }}>
        { scene ? <scene.view {...configuration} ></scene.view> : null }
      </div>
    </div>
  </>
};
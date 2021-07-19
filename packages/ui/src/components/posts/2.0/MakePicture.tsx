import { FC, useEffect, useState } from 'react';
import { getSceneById, Scene } from '@strawberrylemonade/kyan';
import { IExtendedOrganisation, IHeroImage, IImage } from '@strawberrylemonade/goodhub-lib';
import Title from '../../generic/Title';
import { TextInput } from '../../generic/forms/TextInput';
import { ImageField } from '../../generic/forms/ImageField';

interface MakePictureProps {
  organisation: IExtendedOrganisation
  setValue: any
  register: any
}

export const MakePicture: FC<MakePictureProps> = ({ organisation, setValue, register }) => {

  useEffect(() => {
    register('hero')
  }, [register])

  const [name] = useState<string>('picture');
  const [scene, setScene] = useState<Scene<any>>();
  const [configuration, setConfiguration] = useState<{[key: string]: any }>({
    backgroundColor: '#ad1f7e',
    backgroundStyle: 'none',
    logo: organisation.profilePicture?.thumbnail,
    title: ''
  });

  const setCustomConfiguration = (data: {[key: string]: any }) => {
    setConfiguration(data)
    const image = {} as IImage;
    const hero: IHeroImage = {
      type: 'image',
      image
    }
    setValue('hero', hero , { shouldDirty: true });
  }

  useEffect(() => {
    const scene = getSceneById(name);
    setScene(scene);  
  }, [name])
  
  return <>
    <Title className="mb-2 hidden sm:block" size="xl">Make a Picture</Title>
    <TextInput
      name="title"
      description=""
      optional
      value={configuration.title}
      onChange={(value) => setCustomConfiguration({ ...configuration, title: value })}
    />
    <ImageField
      name="photo"
      title="Photo"
      description=""
      register={() => {}}
      value={configuration.image}
      validationMessage="You need to choose an image."
      setValue={(key: string, value: IImage) => setCustomConfiguration({ ...configuration, image: value, backgroundImage: value.original })}
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
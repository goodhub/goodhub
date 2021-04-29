import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import isEqual from 'lodash.isequal';

import { ImageField } from '../../../generic/forms/ImageField';

export interface ThemeProps {
  colors: string[]
  selected: boolean
  setValue: any
  register: any
}

const Theme: FC<ThemeProps> = ({ colors, selected, setValue, register }) => {

  useEffect(() => {
    register('brandColors')
  }, [register])

  const setBrandColors = () => {
    setValue('brandColors', colors, { shouldDirty: true });
  }

  return <div onClick={setBrandColors} className={`${selected ? 'ring-4 ring-offset-2 ring-primary-500' : ''} border border-gray-300 hover:border-gray-400 relative h-24 rounded-lg bg-white shadow-sm px-5 py-4 cursor-pointer grid grid-cols-4 gap-4 sm:gap-2 lg:gap-4 sm:justify-between focus:outline-none`}>
    { colors.map(c => <div className="flex-1 h-full rounded" style={{ backgroundColor: c }}></div>) }
  </div>
}

export interface BrandingConfigurationProps {}
const BrandingConfiguration: FC<BrandingConfigurationProps> = () => {

  const { register, setValue, watch } = useFormContext();
  const brandColors = watch('brandColors');
  const profilePicture = watch('profilePicture');
  const heroImage = watch('hero.image');

  return <>
    <ImageField
      register={register}
      setValue={setValue}
      value={profilePicture}
      name="profilePicture"
      title="Upload your logo"
      description="Please make sure this is a detailed logo, we want it to look great! "
    />

    <ImageField
      register={register}
      setValue={setValue}
      value={heroImage}
      name="hero.image"
      title="Cover photo"
      description="Choose or give us a background image for your social media branding"
    />

    <label className="block text-sm font-medium text-gray-700 mt-4">Choose a colour theme</label>
    <label className="block text-sm italic text-gray-500 mb-3">Or you can make your own!</label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      { [
          ['#E5E3AD', '#A7A37E', '#036480', '#012F2E'], 
          ['#FFFF9D', '#BDEA9D', '#79BD8E', '#01A287'],
          ['#E7F0DE', '#B4E555', '#7FC6BC', '#4AB4C1'],
          ['#FED294', '#FE974D', '#F34F27', '#405952'],
          ['#E7F0DE', '#47D9D8', '#35B0BE', '#355EAE'],
          ['#FFB580', '#F77A51', '#654D52', '#332432'],
          ['#FCFDF4', '#D0DBBD', '#3D606E', '#1A3442'],
          ['#EAEFF0', '#E64D3D', '#2C3D50', '#2881BA'], 
          ['#F6F4FD', '#D7BDDB', '#6E3D69', '#421A40'], 
          ['#DFEDFA', '#ACC8E1', '#3E3D6E', '#1A2342'], 
          ['#F8B5FE', '#F576D2', '#D8289C', '#594056']
        ].map(colors => {
        return <Theme colors={colors} selected={isEqual(colors, brandColors)} register={register} setValue={setValue} />
      }) }
    </div>
  </>;
}

export default BrandingConfiguration;
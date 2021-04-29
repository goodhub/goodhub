import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ITag, Tags } from '@strawberrylemonade/goodhub-lib';
import Social from '../../../../translations/Social';
import RoundedButton from '../../../generic/RoundedButton';

export interface CategoryConfigurationProps {}

const CategoryConfiguration: FC<CategoryConfigurationProps> = () => {

  const [selectedCategories, setSelectedCategories] = useState<{ [key: number]: boolean }>({});
  const { register, setValue, errors, watch } = useFormContext();

  const selectedTags = watch('tags') as ITag[];

  useEffect(() => {
    if (!selectedTags) return;
    setSelectedCategories(selectedTags.reduce<{ [key: number]: boolean }>((obj, tag) => {
      obj[tag as number] = true;
      return obj;
    }, {}))
  }, [setSelectedCategories, selectedTags])

  const toggleCategory = (tagNumber: number) => {
    const category = { ...selectedCategories, [tagNumber]: !selectedCategories[tagNumber] };
    const tags = Object.keys(category).map(Number).filter((c) => category[c]);
    setValue('tags', tags, { shouldDirty: true });
  }

  useEffect(() => {
    register('tags', {validate: (v) => {
      console.log(v, 'tags');
      return v && !!v.length;
    }});
  }, [register])

  const tags = Tags;

  return <div className="text-center">
    <div className="flex mx-auto flex-wrap max-w-4xl justify-center p-4">
      { tags.map(tagNumber => (<RoundedButton onClick={() => toggleCategory(tagNumber)} mode={selectedCategories[tagNumber] ? 'primary' : 'plain'} className="min-w-max-content m-1">{ Social.tags[tagNumber] }</RoundedButton>)) }
    </div>
    {errors?.tags ? <p className="mt-2 w-full text-sm text-red-600" id="tags-error"></p> : null}
    <label className="block w-full text-sm italic text-gray-500">We use these to match interests with other users.</label>
  </div>;
}

export default CategoryConfiguration;
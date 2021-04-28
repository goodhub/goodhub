import { FC, useEffect, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { Tags } from '@strawberrylemonade/goodhub-lib';
import Social from '../../../../translations/Social';
import RoundedButton from '../../../generic/RoundedButton';

export interface ChoosingCategoriesProps {
  register: any
  setValue: any 
  errors?: FieldErrors
}

const ChoosingCategories: FC<ChoosingCategoriesProps> = ({ register, setValue, errors }) => {

  const [selectedCategories, setSelectedCategories] = useState<{ [key: number]: boolean }>({})

  const toggleCategory = (tagNumber: number) => {
    const category = { ...selectedCategories, [tagNumber]: !selectedCategories[tagNumber] };
    setSelectedCategories(category)
    const tags = Object.keys(category).map(Number).filter((c) => category[c]);
    setValue('tags', tags);
  }

  useEffect(() => {
    register({ name: 'tags', required: true });
  }, [register])

  const tags = Tags;

  return <div>
    <div className="flex mx-auto flex-wrap max-w-xl justify-center p-4">
      { tags.map(tagNumber => (<RoundedButton onClick={() => toggleCategory(tagNumber)} mode={selectedCategories[tagNumber] ? 'primary' : 'plain'} className="min-w-max-content m-1">{ Social.tags[tagNumber] }</RoundedButton>)) }
    </div>
    {errors?.tags ? <p className="mt-2 text-sm text-red-600" id="tags-error">You must select at least one of the categories.</p> : null}
    <label className="block w-full text-center text-sm italic text-gray-500">We use these to match interests with other users.</label>
  </div>;
}

export default ChoosingCategories;
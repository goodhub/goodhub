import { IImage } from '@strawberrylemonade/goodhub-lib';
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { sentenceCase } from 'sentence-case'
import { uploadImage } from '../../../services/image-service';
import { FormFieldProps } from './FormField'


interface ImageFieldProps extends FormFieldProps {
  setValue: any
}

export const ImageField: FC<ImageFieldProps> = ({ name, register, setValue, validationFailed, validationMessage }) => {

  const [image, setImage] = useState<IImage>()

  useEffect(() => {
    register({ name });
  }, [register, name]);

  const onSelectFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const image = await uploadImage(file, 'Some alt for now');
    setValue(name, { type: 'image', image });
    setImage(image);
  }

  return <div className="w-full flex flex-col">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 sr-only">{sentenceCase(name)}</label>
    <input type="file" onChange={onSelectFile} className="mt-2 flex flex-col justify-center items-center h-20 pt-3 pb-1.5 rounded-md shadow-sm border border-gray-300 cursor-pointer">
    </input>
    { image ? <img src={image.thumbnail} alt={image.alt}/> : null }
    {validationFailed ? <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>{validationMessage}</p> : null}
  </div>
}
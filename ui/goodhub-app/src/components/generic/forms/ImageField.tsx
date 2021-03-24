import { FC, useEffect, useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone';
import { IImage } from '@strawberrylemonade/goodhub-lib';

import { uploadImage } from '../../../services/image-service';
import Spinner from '../Spinner';
import { FormFieldProps } from './FormField'
import Button from '../Button';


interface ImageFieldProps extends FormFieldProps {
  setValue: any
}

enum Status {
  Idle,
  Selected,
  Loading,
  Uploaded
}

export const ImageField: FC<ImageFieldProps> = ({ name, register, setValue, validationFailed, validationMessage }) => {

  const [file, setFile] = useState<File>()
  const [alt, setAlt] = useState<string>('')

  const [status, setStatus] = useState<Status>(Status.Idle)
  const [image, setImage] = useState<IImage>()

  
  useEffect(() => {
    register({ name });
  }, [register, name]);
  
  const onDrop = useCallback(files => {
    const [file] = files;
    if (!file) return;

    setFile(file);
    setStatus(Status.Selected);
  }, [])

  const uploadFile = async () => {
    setStatus(Status.Loading);
    const image = await uploadImage(file, alt);
    setValue(name, { type: 'image', image });
    setImage(image);
    setStatus(Status.Uploaded);
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

  return <div className="w-full flex flex-col">
    { status === Status.Idle ? <div {...getRootProps()} className="mt-2 flex justify-center items-center h-24 rounded-md shadow-sm border border-gray-300 cursor-pointer overflow-hidden">
      <input type="file" placeholder="" {...getInputProps()}>
      </input>
      <label className="text-sm font-sem text-gray-600">
        { isDragActive ? 'Drop to upload' : 'Drag a picture here, or click to select a picture' }
      </label>
    </div> : null }
    { status === Status.Selected ? <div className="mt-2 flex flex-col justify-center items-center px-4 h-24 rounded-md shadow-sm border border-gray-300 cursor-pointer overflow-hidden">
      <label className="text-sm mb-2 font-medium text-gray-700">How would you describe this picture?</label>
      <div className="flex w-full">
        <div className="flex-grow relative rounded-md shadow-sm">
          <input onChange={(e) => setAlt(e.target.value)} value={alt} type="text" className="block w-full pr-10 flex-grow shadow-sm focus:ring-purple-500 text-sm border border-gray-300 rounded-md" placeholder="This is important for visually impaired users of GoodHub"></input>
        </div>
        <Button className="ml-2" mode="primary" onClick={() => uploadFile()}>Upload</Button>
      </div>
    </div> : null }
    { status === Status.Loading ? <div className="mt-2 flex flex-col justify-center items-center px-4 h-24 rounded-md shadow-sm border border-gray-300 cursor-pointer overflow-hidden">
      <label className="text-sm mb-2 font-medium text-gray-700">Uploading</label>
      <Spinner size="8"></Spinner>
    </div> : null }
    { status === Status.Uploaded && image ? <div className="mt-2 flex flex-col justify-center items-center px-4 h-24 rounded-md shadow-sm border border-gray-300 cursor-pointer overflow-hidden">
      <label className="text-sm mb-2 font-medium text-gray-700">Uploaded!</label>
      <Button mode="primary" onClick={() => window.open(image.original)}>View picture</Button>
    </div> : null }
    { validationFailed ? <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>{validationMessage}</p> : null}
  </div>
}
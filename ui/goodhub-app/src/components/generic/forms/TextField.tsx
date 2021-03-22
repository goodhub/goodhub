import { FC } from 'react'
import { sentenceCase } from 'sentence-case'
import { FormFieldProps } from './FormField'


interface TextFieldProps extends FormFieldProps {
  placeholder: string
}

export const TextField: FC<TextFieldProps> = ({ name, placeholder, register, validationFailed, validationMessage }) => {
  
  return <div className="mt-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{sentenceCase(name)}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input ref={register({ required: validationMessage })} type="text" name={name} id={name} className="block w-full pr-10 flex-grow shadow-sm focus:ring-purple-500 text-sm border border-gray-300 rounded-md" placeholder={placeholder} aria-invalid={!!validationFailed?.message} aria-describedby={`${name}-error`}></input>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
    </div>
    { validationFailed?.message ? <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>{ validationFailed?.message }</p> : null }
  </div>
}
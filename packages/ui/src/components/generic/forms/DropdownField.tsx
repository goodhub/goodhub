import { FC } from 'react';
import { sentenceCase } from 'sentence-case';
import { FormFieldProps } from './FormField';

interface DropdownFieldProps extends FormFieldProps {
  options?: { name: string; id: string }[];
  hidden?: boolean;
}

export const DropdownField: FC<DropdownFieldProps> = ({
  name,
  hidden,
  title,
  description,
  options,
  register,
  validationFailed,
  validationMessage
}) => {
  return (
    <div className={`flex-grow mb-3 ${hidden ? 'hidden' : ''}`}>
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {title ? title : sentenceCase(name)}
        </label>
        {description ? <label className="block text-sm italic text-gray-500">{description}</label> : null}
      </div>
      <select
        ref={register({ required: validationMessage })}
        name={name}
        id={name}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        defaultValue="Canada"
        aria-invalid={!!validationFailed?.message}
        aria-describedby={`${name}-error`}
      >
        {options ? options.map(option => <option value={option.id}>{option.name}</option>) : null}
      </select>
      {validationFailed?.message ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {validationFailed?.message}
        </p>
      ) : null}
    </div>
  );
};

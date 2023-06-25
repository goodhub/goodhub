import { FC } from 'react';
import { sentenceCase } from 'sentence-case';
import { FormFieldProps } from './FormField';

interface CheckboxProps extends FormFieldProps {}

export const CheckboxField: FC<CheckboxProps> = ({ name, register, title }) => {
  return (
    <div>
      <div key={name} className="relative mt-4 flex items-start">
        <div className="flex items-center h-5">
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={register}
            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            {title}
          </label>
        </div>
      </div>
    </div>
  );
};

interface CheckboxesProps extends FormFieldProps {
  value?: { name: string; title: string }[];
}

export const Checkboxes: FC<CheckboxesProps> = ({ name, register, title, value }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title ? title : sentenceCase(name)}
      </label>
      {value && value.length > 0 ? (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-3">
          {value.map(v => (
            <CheckboxField register={register} name={`${name}.${v.name}`} title={v.title} />
          ))}
        </div>
      ) : (
        <div className="py-5 px-6 w-full flex justify-center">
          <p className="text-xs font-medium text-gray-500 uppercase py-1">No projects</p>
        </div>
      )}
    </div>
  );
};

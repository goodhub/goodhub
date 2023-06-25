import { FC } from 'react';
import { sentenceCase } from 'sentence-case';

interface TextInputProps {
  name: string;
  description: string;
  optional?: boolean;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const TextInput: FC<TextInputProps> = ({
  name,
  description,
  children,
  optional,
  value = '',
  onChange,
  onBlur
}) => {
  return (
    <div className="flex-grow mb-3">
      <div className="flex justify-between">
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {sentenceCase(name)}
          </label>
          {description ? <label className="block text-sm italic text-gray-500">{description}</label> : null}
        </div>
        {optional ? <label className="block text-sm font-medium text-gray-700">Optional</label> : null}
      </div>
      <div className="flex relative mt-1 items-center w-full text-gray-600">
        <input
          value={value}
          onBlur={onBlur}
          onChange={e => onChange(e.target.value)}
          type="text"
          name={name}
          id={name}
          className="block w-full flex-grow shadow-sm focus:ring-primary-500 text-sm border border-gray-300 rounded-md"
        ></input>
        <span className="absolute right-2">{children}</span>
      </div>
    </div>
  );
};

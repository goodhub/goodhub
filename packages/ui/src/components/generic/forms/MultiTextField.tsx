import { FC, useEffect } from 'react';
import { sentenceCase } from 'sentence-case';
import { FormFieldProps } from './FormField';

interface MultiTextFieldProps extends FormFieldProps {
  placeholder: string;
  setValue: any;
  value: string[];
}

export const MultiTextField: FC<MultiTextFieldProps> = ({
  name,
  title,
  description,
  placeholder,
  register,
  setValue,
  value,
  validationFailed,
  validationMessage
}) => {
  useEffect(() => {
    register(name, {
      validate: validationMessage
        ? (v: string[]) => {
            return v && !!v.length;
          }
        : null
    });
    setValue(name, ['']);
  }, [register, name, setValue, validationMessage]);

  const updateValue = (id: number, text: string) => {
    value[id] = text;
    value = value.filter(Boolean);
    if (value[value.length - 1] || !value.length) value.push('');
    setValue(name, value, { shouldDirty: true });
  };

  return (
    <div className="my-3">
      <div className="flex justify-between">
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {title ? title : sentenceCase(name)}
          </label>
          {description ? <label className="block text-sm italic text-gray-500">{description}</label> : null}
        </div>
        {!validationMessage ? <label className="block text-sm font-medium text-gray-700">Optional</label> : null}
      </div>
      {value
        ? value.map((v, id) => (
            <div key={id} className="mt-1 relative rounded-md shadow-sm">
              <input
                value={v}
                onChange={e => updateValue(id, e.target.value)}
                type="text"
                className="block w-full pr-10 flex-grow shadow-sm focus:ring-primary-500 text-sm border border-gray-300 rounded-md"
                placeholder={placeholder}
              ></input>
            </div>
          ))
        : null}
      {validationFailed?.message ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {validationFailed?.message}
        </p>
      ) : null}
    </div>
  );
};

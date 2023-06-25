import { FC } from 'react';
import { sentenceCase } from 'sentence-case';
import { FormFieldProps } from './FormField';

interface TextFieldProps extends FormFieldProps {
  placeholder: string;
  dataCheck?: string;
}

export const TextField: FC<TextFieldProps> = ({
  name,
  title,
  description,
  placeholder,
  register,
  validationFailed,
  validationMessage,
  dataCheck
}) => {
  return (
    <div className="flex-grow mb-3">
      <div className="flex justify-between">
        <div>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {title ? title : sentenceCase(name)}
          </label>
          {description ? <label className="block text-sm italic text-gray-500">{description}</label> : null}
        </div>
        {!validationMessage ? <label className="block text-sm font-medium text-gray-700">Optional</label> : null}
      </div>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          ref={register({ required: validationMessage })}
          type="text"
          name={name}
          id={name}
          className="block w-full pr-10 flex-grow shadow-sm focus:ring-primary-500 text-sm border border-gray-300 rounded-md"
          placeholder={placeholder}
          aria-invalid={!!validationFailed?.message}
          aria-describedby={`${name}-error`}
        ></input>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {dataCheck ? (
            <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect x="14.2949" y="9.41455" width="3.46457" height="11.2711" fill="#327266" />
                <path d="M14.2965 20.6854H3.27344V9.43457H14.2965V20.6854Z" fill="#47B19D" />
                <path
                  d="M10.4801 0.269531C7.18116 0.269531 4.4973 3.04264 4.4973 6.45174V8.92432H3.57718C3.06945 8.92516 2.65625 9.35129 2.65625 9.87595V20.3387C2.65625 20.8625 3.06945 21.2894 3.57637 21.2894H17.3837C17.8907 21.2894 18.3039 20.8625 18.3039 20.3387V9.87595C18.3039 9.35129 17.8907 8.92516 17.3837 8.92516H16.4636V6.45258C16.4628 3.04284 13.7792 0.269531 10.4801 0.269531ZM10.4801 1.22032C13.2714 1.22032 15.5428 3.56743 15.5428 6.45178V8.92436H14.6227V6.45178C14.6219 4.09217 12.7637 2.17192 10.4802 2.17192C8.19679 2.17192 6.33845 4.092 6.33845 6.45178V8.92436H5.41833V6.45178C5.41752 3.56743 7.68877 1.22032 10.4801 1.22032ZM10.4801 3.12271C12.2567 3.12271 13.7016 4.61583 13.7016 6.45161V8.92419H7.25836V6.45161C7.25836 4.61575 8.70352 3.12271 10.4801 3.12271ZM3.57639 9.87579H13.7016V20.3385H3.57639V9.87579ZM14.6217 9.87579H17.3827V20.3385H14.6217V9.87579Z"
                  fill="#111827"
                />
              </g>
            </svg>
          ) : null}
        </div>
      </div>
      {validationFailed?.message ? (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {validationFailed?.message}
        </p>
      ) : null}
    </div>
  );
};

import { FC } from 'react';

interface CheckboxProps {
  value: boolean
  name: string
  title: string
  onChange: (value: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = ({ name, value, title, onChange }) => {

  return <div>
    <div key={name} className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
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
}
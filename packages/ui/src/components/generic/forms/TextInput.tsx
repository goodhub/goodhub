import { FC } from 'react'
import { sentenceCase } from 'sentence-case'


interface TextInputProps {
  name: string
  description: string
  optional?: boolean
  value?: string
  onChange: (value: string) => void
}

export const TextInput: FC<TextInputProps> = ({ name, description, optional, value = '', onChange }) => {

  return <div className="flex-grow mb-3">
    <div className="flex justify-between">
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{sentenceCase(name)}</label>
        {description ? <label className="block text-sm italic text-gray-500">{description}</label> : null}
      </div>
      { optional ? <label className="block text-sm font-medium text-gray-700">Optional</label> : null }
    </div>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input value={value} onChange={(e) => onChange(e.target.value)} type="text" name={name} id={name} className="block w-full pr-10 flex-grow shadow-sm focus:ring-primary-500 text-sm border border-gray-300 rounded-md"></input>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      </div>
    </div>
  </div>
}
import { FieldError } from 'react-hook-form'

export interface FormFieldProps {
  name: string
  validationMessage?: string
  validationFailed?: FieldError
  register: any
}
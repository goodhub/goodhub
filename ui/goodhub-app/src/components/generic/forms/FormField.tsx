import { FieldError } from 'react-hook-form'

export interface FormFieldProps {
  name: string
  title?: string
  description?: string
  validationMessage?: string
  validationFailed?: FieldError
  register: any
}
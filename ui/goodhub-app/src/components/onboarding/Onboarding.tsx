import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FieldError } from 'react-hook-form';
import { sentenceCase } from 'change-case';

import { IPersonState, IPerson } from '@strawberrylemonade/goodhub-lib';
import { useAuthenticationService, User } from '../../services/authentication-service';
import { createPerson, usePersonService } from '../../services/person-service';
import Button from '../generic/Button';
export interface OnboardingProps { }

const Onboarding: FC<OnboardingProps> = () => {

  const user = useAuthenticationService(state => state.user);
  const [state, setPerson] = usePersonService(state => [state.state, state.setPerson]);

  const history = useHistory()

  if (!user || state !== IPersonState.RequiresOnboarding) {
    history.push('/');
  }

  return <div className="flex h-screen sm:items-center sm:justify-center">
    <div className="bg-white overflow-hidden shadow sm:rounded-lg w-full max-w-xl">
      <div className="p-4 sm:p-10">
        <h3 className="text-xl leading-6 font-medium text-gray-900">
          Welcome to GoodHub!
        </h3>
        <p className="mt-2 text-sm text-gray-800">It's great to have you. We just need you to confirm a few details for us and then you can start making change.</p>
        <div>
          { user ? <OnboardingForm user={user} setPerson={setPerson}></OnboardingForm> : null }
        </div>
      </div>
    </div>
  </div>
}

export default Onboarding;

interface OnboardingFormProps {
  user: User
  setPerson: (person: IPerson) => void
}

const OnboardingForm: FC<OnboardingFormProps> = ({ user, setPerson }) => {

  interface OnboardingFormFields {
    firstName: string
    lastName: string
    email?: string
    phoneNumber?: string
  }

  const { register, handleSubmit, errors } = useForm<OnboardingFormFields>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    }
  });

  const history = useHistory();

  const onSubmit = async (data: OnboardingFormFields) => {
    const { firstName, lastName, email, phoneNumber } = data;
    const person = await createPerson(user.id, firstName, lastName, email, phoneNumber);
    setPerson(person);
    history.goBack();
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <FormField name="firstName" placeholder="Please enter your first name" validationMessage="Your first name is required." validationFailed={errors.firstName} register={register}></FormField>
    <FormField name="lastName" placeholder="Please enter your last name" validationMessage="Your last name is required." validationFailed={errors.lastName} register={register}></FormField>
    <FormField name="email" placeholder="Please enter your email" register={register}></FormField>
    <FormField name="phoneNumber" placeholder="Please enter your phone number" register={register}></FormField>
    <p className="mt-4 text-sm text-gray-800">Information about privacy policy and other things.</p>
    <div className="mt-4 flex justify-end">
      <Button type="submit">Next</Button>
    </div>
  </form>;
}

interface FormFieldProps {
  name: string
  placeholder: string
  validationMessage?: string
  validationFailed?: FieldError
  register: any
}

const FormField: FC<FormFieldProps> = ({ name, placeholder, register, validationFailed, validationMessage }) => {
  
  return <div className="mt-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{sentenceCase(name)}</label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input ref={register({ required: !!validationMessage })} type="text" name={name} id={name} className="block w-full pr-10 flex-grow shadow-sm focus:ring-purple-500 text-sm border border-gray-300 rounded-md" placeholder={placeholder} aria-invalid="true" aria-describedby={`${name}-error`}></input>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
    </div>
    { validationFailed ? <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>{ validationMessage }</p> : null }
  </div>
}
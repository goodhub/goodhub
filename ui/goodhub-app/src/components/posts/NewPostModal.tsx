import { Content, IPost, IPostIdentity, IPostOrigin, IPostType } from '@strawberrylemonade/goodhub-lib';
import { FC, useEffect, useState } from 'react';
import EditorJs from 'react-editor-js';
import { useForm, FieldError } from 'react-hook-form';
import { sentenceCase } from 'sentence-case';

import Button from '../generic/Button';
import Modal, { ModalState } from '../generic/Modal';
import { FormField } from '../onboarding/Onboarding';

import Header from '@editorjs/header'
import { submitNewPost } from '../../services/post-service';

interface ContentFieldProps {
  name: string
  placeholder?: string
  validationMessage?: string
  validationFailed?: FieldError
  setValue: any
  register: any
}

const ContentField: FC<ContentFieldProps> = ({ name, register, setValue, validationFailed, validationMessage }) => {

  const [isReady, setReadyState] = useState(false);

  useEffect(() => {
    register({ name });
  }, [register, name]);
  
  return <div className="mt-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{sentenceCase(name)}</label>
    <div className="mt-1 px-3 py-1.5 relative rounded-md shadow-sm focus:ring-purple-500 text-sm border border-gray-300">
      { !isReady ? <div className="h-8 w-full m-0 p-0"></div> : null }
      <span className={!isReady ? 'hidden' : ''}>
        <EditorJs
          onChange={(api: unknown, data?: unknown) => {
            setValue(name, data as Content);
          }}
          onReady={() => setReadyState(true)}
          minHeight={0}
          //@ts-ignore
          tools={{ header: Header }}
        />
      </span>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
    </div>
    { validationFailed ? <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>{ validationMessage }</p> : null }
  </div>
}

export interface NewPostModalProps {
  state: ModalState
  onDismiss: () => void
}

interface NewPostFormFields {
  text: Content
  type: IPostType
}

export const NewPostModal: FC<NewPostModalProps> = ({ state, onDismiss }) => {

  const { register, handleSubmit, setValue, errors } = useForm<NewPostFormFields>();

  const submit = async (data: NewPostFormFields) => {
    const post: Partial<IPost> = {
      organisationId: '7ebb6bb1-3f4e-4b7c-89ad-0f2050a00067',
      origin: IPostOrigin.GoodHub,
      projectId: 'default',
      text: data.text,
      type: data.type,
      postedIdentity: IPostIdentity.Individual
    }
    await submitNewPost(post);
  }

  return <Modal className="max-w-2xl w-full" state={state} onDismiss={onDismiss}>    
    <h3 className="text-xl leading-6 font-medium text-gray-900">
      Start a new post
    </h3>
    <form onSubmit={handleSubmit(submit)}>
      <ContentField name="text" register={register} setValue={setValue}></ContentField>
      <FormField name="type" validationMessage="Post type is required." validationFailed={errors.type} register={register} placeholder="What kind of post is this?"></FormField>
      <div className="mt-4 flex justify-end">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  </Modal>
}
import { convertToRaw } from 'draft-js';
import { FC, useEffect, useState } from 'react';
import { EditorState, Editor } from 'react-draft-wysiwyg';
import { sentenceCase } from 'sentence-case'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { FormFieldProps } from './FormField';

interface ContentFieldProps extends FormFieldProps {
  setValue: any
}

export const ContentField: FC<ContentFieldProps> = ({ name, register, setValue, validationFailed, validationMessage }) => {

  const [editorState, setEditorState] = useState<EditorState>();

  useEffect(() => {
    register({ name });
  }, [register, name]);
  
  return <div className="mt-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{sentenceCase(name)}</label>
    <div className="mt-2">
      <Editor editorState={editorState} onEditorStateChange={(state) => {
        setEditorState(state);
        const blocks = convertToRaw(state.getCurrentContent());
        setValue(name, blocks);
      }} 
        editorClassName="mt-1 px-3 relative rounded-md shadow-sm focus:ring-purple-500 text-sm border border-gray-300 goodhub-content"
        toolbar={{
          options: ['inline', 'blockType'],
          inline: {
            options: ['bold']
          },
          blockType: {
            inDropdown: true,
            options: ['Normal', 'H1'],
          },
        }}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"></div>
    </div>
    { validationFailed ? <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>{ validationMessage }</p> : null }
  </div>
}
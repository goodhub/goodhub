import create, { State } from 'zustand';
import produce from 'immer';
import { lastEventId } from '@sentry/react';
import { CustomError } from '@strawberrylemonade/goodhub-lib';

export interface ErrorService extends State {
  error?: CustomError
  eventId?: string

  setError: (error: CustomError) => void
  clearError: () => void
}

export const useErrorService = create<ErrorService>((set) => ({
  eventId: lastEventId(),

  setError: (error: CustomError) => set(state => {
    return { ...state, error, eventId: lastEventId() }
  }),
  clearError: () => set(state => ({ ...state, error: undefined })),

  warnings: [],
  addWarning: (error: Error) => set(produce(state => state.warnings.push(error)))
}))

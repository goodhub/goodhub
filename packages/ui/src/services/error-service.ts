import create, { State } from 'zustand';
import produce from 'immer';
import { lastEventId } from '@sentry/react';
import { CustomError } from '../../../shared';

export interface ErrorService extends State {
  error?: CustomError
  eventId?: string

  setError: (error: unknown) => void
  clearError: () => void
}

export const useErrorService = create<ErrorService>((set) => ({
  eventId: lastEventId(),

  setError: (e: unknown) => set(state => {
    const error = e as CustomError;
    return { ...state, error, eventId: lastEventId() }
  }),
  clearError: () => set(state => ({ ...state, error: undefined })),

  warnings: [],
  addWarning: (error: Error) => set(produce(state => state.warnings.push(error)))
}))

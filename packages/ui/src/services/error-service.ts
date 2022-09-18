import create, { State } from 'zustand';
import produce from 'immer';
import { lastEventId } from '@sentry/react';

export class CustomError extends Error {
  type: string
  code: number

  constructor(message: string) {
    super(message)
    this.type = 'CustomError'
    this.code = 400
  }

  toJSON() {
    return {
      message: this.message,
      type: this.type
    }
  }

  toString() {
    return JSON.stringify(this.toJSON());
  }
}

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

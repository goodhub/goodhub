import { Event } from '@sentry/react';
import create, { State } from 'zustand';
import produce from 'immer';

export interface ErrorService extends State {
  errors: Event[]

  addError: (error: Event) => void
}

export const usePersonService = create<ErrorService>((set) => ({
  errors: [],
  addError: (error: Event) => set(produce(state => {
    state.errors.push(error);
  }))
}))

import create, { State } from 'zustand';
import { v4 } from 'uuid';

export interface Notification {
  id: string
  text: string
}

export interface NotificationService extends State {
  notifications: Notification[]

  addNotification: (text: string) => void
  clearNotification: (id: string) => void
  clearNotifications: () => void
}

export const useNotificationService = create<NotificationService>((set) => ({
  notifications: [],
  addNotification: (text: string) => set(state => {
    state.notifications.push({ text, id: v4() });
    return { ...state }
  }),
  clearNotification: (id: string) => set(state => {
    return { ...state, notifications: state.notifications.filter(n => id !== n.id)  }
  }),
  clearNotifications: () => set(state => ({ ...state, notifications: [] })),
}))

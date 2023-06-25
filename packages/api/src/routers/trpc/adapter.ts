import * as trpcExpress from '@trpc/server/adapters/express';

import { router, createContext } from './';
const { default: Example } = await import('../../applications/example/Example');
const routes = router({
  [Example.id]: Example.router
});
export type AppRouter = typeof routes;

export const adapter = trpcExpress.createExpressMiddleware({
  router: routes,
  createContext
});

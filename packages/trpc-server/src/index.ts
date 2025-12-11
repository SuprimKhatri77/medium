import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { auth } from '@medium/auth'
import { db } from '@medium/database'
import { createContextFactory } from './context'
import { appRouter } from './routers/index'

const createContext = createContextFactory({
  auth,
  db,
})

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
  createContext,
})

export { appRouter } from './routers/index'
export type { AppRouter } from './routers/index'

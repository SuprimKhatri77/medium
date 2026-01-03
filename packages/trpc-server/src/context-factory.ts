import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { type DATABASE, db } from '@repo/database'
import { type AUTH, auth, fromNodeHeaders } from '@repo/auth'
import { type TRPCContext } from '@repo/types'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from './routers/index'

export const createContextFactory = (deps: { db: DATABASE; auth: AUTH }) => {
  return async ({
    req,
    res,
  }: CreateExpressContextOptions): Promise<TRPCContext> => {
    console.log('Context factory triggered')
    const session = await deps.auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
    return {
      req,
      res,
      db: deps.db,
      auth: deps.auth,
      session,
    }
  }
}

const createContext = createContextFactory({
  auth,
  db,
})

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
  createContext,
})

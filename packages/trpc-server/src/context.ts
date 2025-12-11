import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import type { DATABASE } from '@medium/database'
import { auth, fromNodeHeaders, type AUTH } from '@medium/auth'
import type { AppContext } from '@medium/types'

export const createContextFactory = (deps: { db: DATABASE; auth: AUTH }) => {
  return async ({
    req,
    res,
  }: CreateExpressContextOptions): Promise<AppContext> => {
    let session
    const result = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
    if (result) {
      session = {
        ...result.session,
        user: result.user,
      }
    }
    return {
      req,
      res,
      db: deps.db,
      auth: deps.auth,
      session,
    }
  }
}

export type Context = AppContext

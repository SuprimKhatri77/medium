import { initTRPC, TRPCError } from '@trpc/server'
import { Context, ProtectedContext } from '@medium/types'

export const t = initTRPC.context<Context>().create()

export const router = t.router as typeof t.router
export const publicProcedure = t.procedure as typeof t.procedure

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not logged in.',
    })
  }

  return next({
    ctx: {
      ...ctx,
      session: {
        ...ctx.session,
        user: ctx.session.user,
      },
    } as ProtectedContext,
  })
}) as typeof t.procedure

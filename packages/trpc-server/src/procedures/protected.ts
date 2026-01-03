import { ProtectedTRPCContext, TRPCContext } from '@repo/types'
import { TRPCError, TRPCProcedureBuilder } from '@trpc/server'
import { t } from './public'

export const protectedProcedure: TRPCProcedureBuilder<
  TRPCContext,
  object,
  ProtectedTRPCContext,
  any,
  any,
  any,
  any,
  false
> = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    })
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    } as ProtectedTRPCContext,
  })
})

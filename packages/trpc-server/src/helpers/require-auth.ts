import { TRPCError } from '@trpc/server'
import type { TRPCContext } from '@repo/types'

export function requireAuth(ctx: TRPCContext) {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    })
  }
  return ctx.session
}

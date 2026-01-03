import {
  setUserInterestsResponseSchema,
  setUserInterestsSchema,
  setUsernameResponseSchema,
  setUsernameSchema,
} from '@repo/contracts'
import { publicProcedure, router } from '../procedures/public'
import { setUserInterest, setUsername } from '@repo/core'
import { fromNodeHeaders } from '@repo/auth'
import { requireAuth } from '../helpers/require-auth'
import { TRPCError } from '@trpc/server'

export const onboardingRoutes = router({
  setUserName: publicProcedure
    .input(setUsernameSchema)
    .output(setUsernameResponseSchema)
    .mutation(async ({ input, ctx }) => {
      requireAuth(ctx)
      const result = await setUsername(input, fromNodeHeaders(ctx.req.headers))
      if (!result.success) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: result.message,
        })
      }
      return result
    }),
  setUserInterest: publicProcedure
    .input(setUserInterestsSchema)
    .output(setUserInterestsResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const session = requireAuth(ctx)
      const result = await setUserInterest(input, session.user.id)
      if (!result.success) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: result.message,
        })
      }
      return result
    }),
})

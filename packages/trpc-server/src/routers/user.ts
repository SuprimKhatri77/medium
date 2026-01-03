import {
  updateUserResponseSchema,
  updateUserSchema,
  userInterestResponseSchema,
} from '@repo/contracts'
import { publicProcedure, router } from '../procedures/public'
import { updateUser } from '@repo/core'
import { requireAuth } from '../helpers/require-auth'
import { eq, userInterests } from '@repo/database'
import { TRPCError } from '@trpc/server'

export const userRoutes = router({
  updateUser: publicProcedure
    .input(updateUserSchema)
    .output(updateUserResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const session = requireAuth(ctx)
      const result = await updateUser(input, session.user.id)
      if (!result.success) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: result.message,
        })
      }
      return result
    }),
  getUserInterests: publicProcedure
    .output(userInterestResponseSchema)
    .query(async ({ input, ctx }) => {
      const session = requireAuth(ctx)
      const interests = await ctx.db.query.userInterests.findMany({
        where: eq(userInterests.userId, session.user.id),
      })
      const allInterests =
        interests.length === 0 ? [] : interests.map((i) => i.topic)
      return { interests: allInterests }
    }),
})

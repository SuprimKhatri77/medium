import {
  sendMagicLinkResponseSchema,
  sendMagicLinkSchema,
  sessionSchema,
  userRecordResponseSchema,
  verifyMagicLinkResponseSchema,
  verifyMagicLinkSchema,
} from '@repo/contracts'
import { publicProcedure, router } from '../procedures/public'
import { sendMagicLink, verifyMagicLink } from '@repo/core'
import { fromNodeHeaders } from '@repo/auth'
import { db, eq, user } from '@repo/database'
import { TRPCError } from '@trpc/server'
import { requireAuth } from '../helpers/require-auth'

export const authRoutes = router({
  sendMagicLink: publicProcedure
    .input(sendMagicLinkSchema)
    .output(sendMagicLinkResponseSchema)
    .mutation(async ({ input, ctx }) => {
      return sendMagicLink(input, fromNodeHeaders(ctx.req.headers))
    }),
  verifyMagicLink: publicProcedure
    .input(verifyMagicLinkSchema)
    .output(verifyMagicLinkResponseSchema)
    .mutation(async ({ input, ctx }) => {
      const result = await verifyMagicLink(
        input,
        fromNodeHeaders(ctx.req.headers),
      )
      if (!result.success) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: result.message,
        })
      }
      if (result.success && result.cookies) {
        ctx.res.setHeader('Set-Cookie', result.cookies)
      }
      return result
    }),
  getUserSession: publicProcedure
    .output(sessionSchema)
    .query(async ({ ctx }) => {
      return ctx.session
    }),
  getCurrentUser: publicProcedure
    .output(userRecordResponseSchema)
    .query(async ({ ctx }) => {
      const session = requireAuth(ctx)

      const userRecord = await db.query.user.findFirst({
        where: eq(user.id, session.user.id),
      })

      if (!userRecord) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User record not found.',
        })
      }

      return { user: userRecord }
    }),
})

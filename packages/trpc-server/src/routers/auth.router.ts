import {
  authResponseSchema,
  authSchema,
  socialAuthResponseSchema,
  socialAuthSchema,
  verifyMagicLinkResponseSchema,
  verifyMagicLinkSchema,
} from '@medium/types'
import { AuthorizeUser, VerifyMagicLink } from '@medium/core'
import { publicProcedure, router } from '../trpc'

export const authRouter = router({
  authenticate: publicProcedure
    .input(authSchema)
    .output(authResponseSchema)
    .mutation(async ({ input, ctx }) => {
      return AuthorizeUser(input, ctx)
    }),

  verifyMagicLink: publicProcedure
    .input(verifyMagicLinkSchema)
    .output(verifyMagicLinkResponseSchema)
    .mutation(({ input, ctx }) => {
      return VerifyMagicLink(input, ctx)
    }),
  getUserSession: publicProcedure.query(({ input, ctx }) => {
    if (!ctx.session) return null
    return ctx.session
  }),
})

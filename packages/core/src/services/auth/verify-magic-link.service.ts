import { verification } from '@medium/database'
import {
  APIError,
  AppContext,
  fromNodeHeaders,
  VerifyMagicLinkResponseType,
  verifyMagicLinkSchema,
} from '@medium/types'
import z from 'zod'
import { eq } from 'drizzle-orm'

export async function verifyMagicLink(
  input: z.infer<typeof verifyMagicLinkSchema>,
  ctx: AppContext,
): Promise<VerifyMagicLinkResponseType> {
  try {
    const [magicLinkTokneRecord] = await ctx.db
      .select()
      .from(verification)
      .where(eq(verification.identifier, input.token))
    if (!magicLinkTokneRecord) {
      return { success: false, message: 'Invalid magic link.' }
    }
    if (magicLinkTokneRecord.expiresAt < new Date()) {
      return { success: false, message: 'Magic link expired.' }
    }

    const { headers } = await ctx.auth.api.magicLinkVerify({
      query: {
        token: input.token,
      },
      headers: fromNodeHeaders(ctx.req.headers),
      returnHeaders: true,
    })

    const getSetCookie = headers.get('set-cookie') || ''
    console.log('cookie: ', getSetCookie)
    if (getSetCookie) {
      console.log('cookie found: ', getSetCookie)
      ctx.res.setHeader('Set-Cookie', getSetCookie)
    }
    return {
      success: true,
      message: 'Magic link verified.',
    }
  } catch (error) {
    console.log('error : ', error)
    if (error instanceof APIError) {
      console.log('api error message: ', error.message)
      return { success: false, message: error.message }
    }
    return { success: false, message: 'Failed to verify magic link.' }
  }
}

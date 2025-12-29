import { VerifyMagicLink, VerifyMagicLinkResponse } from '@repo/types'
import { auth } from '../../utils/auth'
import { fromNodeHeaders } from 'better-auth/node'
import { APIError } from 'better-auth'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import { verification } from '../../db/schema'

export async function verifyMagicLink(
  input: VerifyMagicLink,
  headers: ReturnType<typeof fromNodeHeaders>,
): Promise<VerifyMagicLinkResponse> {
  try {
    const tokenRecord = await db.query.verification.findFirst({
      where: eq(verification.identifier, input.token),
    })

    if (!tokenRecord) {
      return { success: false, message: 'Invalid token.' }
    }

    if (tokenRecord.expiresAt < new Date()) {
      return { success: false, message: 'Token expired.' }
    }

    const { response, headers: responseHeaders } =
      await auth.api.magicLinkVerify({
        query: {
          ...input,
        },
        headers,
        returnHeaders: true,
      })
    console.log('response: ', response)

    const getSetCookie = responseHeaders.get('set-cookie') || ''
    console.log('cookie to set: ', getSetCookie)

    const isNewUser =
      response &&
      Date.now() - new Date(response.user.createdAt).getTime() < 60000

    return {
      success: true,
      message: 'Magic link verified.',
      cookies: getSetCookie,
      redirectTo: isNewUser ? '/get-started/me' : '/',
    }
  } catch (error) {
    console.log('error: ', error)
    if (error instanceof APIError) {
      console.log('api error message: ', error.message)
      return { success: false, message: error.message }
    }
    return { success: false, message: 'Failed to verify magic link.' }
  }
}

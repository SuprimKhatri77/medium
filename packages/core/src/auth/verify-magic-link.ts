import { VerifyMagicLink, VerifyMagicLinkResponse } from '@repo/contracts'
import { auth, APIError } from '@repo/auth'
import { db, eq, verification } from '@repo/database'
import { HeadersType } from '../types/headers.type'

export async function verifyMagicLink(
  input: VerifyMagicLink,
  headers: HeadersType,
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

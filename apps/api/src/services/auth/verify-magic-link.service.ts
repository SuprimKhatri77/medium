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

    const { headers: responseHeaders } = await auth.api.magicLinkVerify({
      query: {
        ...input,
      },
      headers,
      returnHeaders: true,
    })

    const getSetCookie = responseHeaders.get('set-cookie') || ''

    return {
      success: true,
      message: 'Magic link verified.',
      cookies: getSetCookie,
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

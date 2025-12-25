import { SendMagicLink, SendMagicLinkResponse } from '@repo/types'
import type { fromNodeHeaders } from 'better-auth/node'
import { APIError } from 'better-auth'
import { auth } from '../../utils/auth'

export async function sendMagicLink(
  input: SendMagicLink,
  headers: ReturnType<typeof fromNodeHeaders>,
): Promise<SendMagicLinkResponse> {
  try {
    await auth.api.signInMagicLink({
      body: {
        email: input.email,
      },
      headers,
    })
    return { success: true, message: 'A magic link is sent to your email.' }
  } catch (error) {
    console.log('error: ', error)
    if (error instanceof APIError) {
      console.log('api error message: ', error.message)
      return { success: false, message: error.message }
    }
    return { success: false, message: 'Failed to sent magic link.' }
  }
}

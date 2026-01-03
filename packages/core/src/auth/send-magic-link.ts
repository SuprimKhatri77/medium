import { SendMagicLink, SendMagicLinkResponse } from '@repo/contracts'
import { APIError } from '@repo/auth'
import { auth } from '@repo/auth'
import { HeadersType } from '../types/headers.type'

export async function sendMagicLink(
  input: SendMagicLink,
  headers: HeadersType,
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

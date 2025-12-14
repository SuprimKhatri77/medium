import {
  APIError,
  AppContext,
  AuthResponseType,
  authSchema,
  fromNodeHeaders,
} from '@medium/types'
import z from 'zod'

export async function authorizeUser(
  input: z.infer<typeof authSchema>,
  ctx: AppContext,
): Promise<AuthResponseType> {
  try {
    await ctx.auth.api.signInMagicLink({
      body: {
        email: input.email,
      },
      headers: fromNodeHeaders(ctx.req.headers),
    })
    return {
      success: true,
      message: 'A one time authentication link is sent to your email.',
    }
  } catch (error) {
    console.log('error: ', error)
    if (error instanceof APIError) {
      console.log('api error message: ', error.message)
      return {
        success: false,
        message: error.message,
        inputs: { ...input },
      }
    }
    return {
      success: false,
      message: 'Failed to authenticate.',
      inputs: { ...input },
    }
  }
}

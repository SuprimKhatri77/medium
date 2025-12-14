import { AppContext, AuthResponseType, authSchema } from '@medium/types'
import z from 'zod'
import { authorizeUser } from '../../services/auth/auth.service'

export async function AuthorizeUser(
  input: z.infer<typeof authSchema>,
  ctx: AppContext,
): Promise<AuthResponseType> {
  const validateInput = authSchema.safeParse({ ...input })
  if (!validateInput.success) {
    return {
      success: false,
      message: 'Validation failed.',
      errors: {
        properties: {
          email: z.treeifyError(validateInput.error).properties?.email?.errors,
        },
      },
      inputs: { ...input },
    }
  }

  try {
    const result = await authorizeUser(input, ctx)
    return result
  } catch (error) {
    console.log('error: ', error)
    return { success: false, message: 'Something went wrong.' }
  }
}

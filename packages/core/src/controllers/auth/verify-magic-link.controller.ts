import {
  AppContext,
  VerifyMagicLinkResponseType,
  verifyMagicLinkSchema,
} from '@medium/types'
import z from 'zod'
import { verifyMagicLink } from '../../services/auth/verify-magic-link.service'

export async function VerifyMagicLink(
  input: z.infer<typeof verifyMagicLinkSchema>,
  ctx: AppContext,
): Promise<VerifyMagicLinkResponseType> {
  const validateInput = verifyMagicLinkSchema.safeParse({ ...input })
  if (!validateInput.success) {
    return {
      success: false,
      message: 'Validation failed.',
    }
  }

  try {
    const result = await verifyMagicLink(input, ctx)
    return result
  } catch (error) {
    console.log('error: ', error)
    return { success: false, message: 'Something went wrong.' }
  }
}

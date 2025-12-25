import z from 'zod'

export const sendMagicLinkSchema = z.object({
  email: z.email(),
})

export const verifyMagicLinkSchema = z.object({
  token: z.string({ error: 'Token is required.' }),
})

export type VerifyMagicLink = z.infer<typeof verifyMagicLinkSchema>
export type SendMagicLink = z.infer<typeof sendMagicLinkSchema>

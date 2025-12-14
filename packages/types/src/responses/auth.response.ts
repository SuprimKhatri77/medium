import z from 'zod'

export const authResponseSchema = z.object({
  success: z.boolean().nonoptional(),
  message: z.string().trim().nonempty(),
  inputs: z
    .object({
      email: z.string(),
    })
    .optional(),
  cookies: z.string().optional(),
  redirectTo: z.string().optional(),
  errors: z
    .object({
      properties: z
        .object({ email: z.array(z.string()).optional() })
        .optional(),
    })
    .optional(),
})

export const verifyMagicLinkResponseSchema = z.object({
  success: z.boolean().nonoptional(),
  message: z.string().trim().nonempty(),
})

export const socialAuthResponseSchema = z.object({
  success: z.boolean().nonoptional(),
  message: z.string().trim().nonempty(),
  cookies: z.string().trim().optional(),
})

export type AuthResponseType = z.infer<typeof authResponseSchema>
export type VerifyMagicLinkResponseType = z.infer<
  typeof verifyMagicLinkResponseSchema
>
export type SocialAuthResponseType = z.infer<typeof socialAuthResponseSchema>

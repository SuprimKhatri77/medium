import z from 'zod'

export const sendMagicLinkResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          email: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
})

export const verifyMagicLinkResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  cookies: z.string().optional(),
  errors: z
    .object({
      properties: z
        .object({
          token: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
  redirectTo: z.string().optional(),
})

export type VerifyMagicLinkResponse = z.infer<
  typeof verifyMagicLinkResponseSchema
>
export type SendMagicLinkResponse = z.infer<typeof sendMagicLinkResponseSchema>

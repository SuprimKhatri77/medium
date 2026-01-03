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

export const sessionSchema = z
  .object({
    session: z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      userId: z.string(),
      expiresAt: z.date(),
      token: z.string(),
      ipAddress: z.string().nullable().optional(),
      userAgent: z.string().nullable().optional(),
    }),

    user: z.object({
      id: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      email: z.string(),
      emailVerified: z.boolean(),
      name: z.string(),
      image: z.string().nullable().optional(),
      username: z.string().nullable().optional(),
      displayUsername: z.string().nullable().optional(),
    }),
  })
  .nullable()
  .optional()

export type Session = z.infer<typeof sessionSchema>
export type VerifyMagicLinkResponse = z.infer<
  typeof verifyMagicLinkResponseSchema
>
export type SendMagicLinkResponse = z.infer<typeof sendMagicLinkResponseSchema>

import z from 'zod'

export const setUsernameResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  errors: z
    .object({
      properties: z
        .object({
          name: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
})
export const setUserInterestsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          topics: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
})

export type SetUserInterestsResponse = z.infer<
  typeof setUserInterestsResponseSchema
>
export type SetUsernameResponse = z.infer<typeof setUsernameResponseSchema>

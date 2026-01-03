import z from 'zod'
import { allTopics } from '../utils/topic-enum'
import { pronouns } from '../utils/pronoun-enum'

export const userInterestResponseSchema = z.object({
  interests: z.array(z.enum(allTopics)),
})
export const userRecordResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string().nullable(),
    username: z.string().nullable(),
    bio: z.string().nullable(),
    displayUsername: z.string().nullable(),
    hasCompletedOnboarding: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string(),
    pronoun: z.enum(pronouns).nullable(),
  }),
})

export const updateUserResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z
    .object({
      properties: z
        .object({
          name: z.array(z.string()).optional(),
          bio: z.array(z.string()).optional(),
          username: z.array(z.string()).optional(),
          pronoun: z.array(z.string()).optional(),
          image: z.array(z.string()).optional(),
        })
        .optional(),
    })
    .optional(),
})

export type UpdateUserResponse = z.infer<typeof updateUserResponseSchema>
export type UserRecordResponse = z.infer<typeof userRecordResponseSchema>
export type UserInterestResponse = z.infer<typeof userInterestResponseSchema>
export type ProfilePageUser = UserRecordResponse['user'] & {
  name: string
  username: string
  displayUsername: string
}

import z from 'zod'
import { allTopics } from '../utils/topic'

export const setUsernameSchema = z.object({
  name: z.string().min(1).max(50),
})

export const setUserInterestsSchema = z.object({
  topics: z.array(z.enum(allTopics)),
})

export type SetUserInterest = z.infer<typeof setUserInterestsSchema>
export type SetUsername = z.infer<typeof setUsernameSchema>

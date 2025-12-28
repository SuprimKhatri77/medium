import z from 'zod'
import { allTopics } from '../utils/topic'

export const userInterestSchema = z.object({
  interests: z.array(z.enum(allTopics)),
})

export type UnserInterest = z.infer<typeof userInterestSchema>

import z from 'zod'
import { pronouns } from '../utils/pronoun-enum'

export const updateUserSchema = z.object({
  name: z.string().trim().nonempty({ error: 'Name is required.' }),
  username: z.string().trim().nonempty(),
  bio: z.string().trim().max(160).optional().nullable(),
  pronoun: z.enum(pronouns).optional().nullable(),
  image: z.string().trim(),
})

export type UpdateUser = z.infer<typeof updateUserSchema>

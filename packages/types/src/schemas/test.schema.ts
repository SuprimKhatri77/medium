import z from 'zod'

export const testSchema = z.object({
  name: z.string().nonempty(),
  email: z.email().nonempty(),
  password: z.string().min(8).max(30).nonempty(),
})

export type TestSchema = z.infer<typeof testSchema>

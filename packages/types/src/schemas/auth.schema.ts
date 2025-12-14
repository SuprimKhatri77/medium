import z from 'zod'

export const authSchema = z.object({
  email: z.email().nonempty('Email is required'),
})

export const verifyMagicLinkSchema = z.object({
  token: z.string().trim().nonempty(),
})

export const socialAuthSchema = z.object({
  provider: z.enum(['google', 'github']).nonoptional(),
})

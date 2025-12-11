import type { Request, Response } from 'express'
import type { DATABASE } from '@medium/database'
import type { AUTH } from '@medium/auth'

export interface AppContext {
  req: Request
  res: Response
  db: DATABASE
  auth: AUTH
  session?: {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    expiresAt: Date
    token: string
    ipAddress?: string | null | undefined | undefined

    userAgent?: string | null | undefined | undefined

    user: {
      id: string
      createdAt: Date
      updatedAt: Date
      email: string
      emailVerified: boolean
      name: string
      image?: string | null | undefined | undefined
    }
  } | null
}

export type ProtectedContext = AppContext & {
  session: NonNullable<AppContext['session']>
}

export type Context = AppContext

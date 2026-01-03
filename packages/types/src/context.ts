import type { Request, Response } from 'express'
import type { DATABASE } from '@repo/database'
import type { AUTH, Session } from '@repo/auth'

export interface TRPCContext {
  req: Request
  res: Response
  db: DATABASE
  auth: AUTH
  session?: Session | null
}

export interface ProtectedTRPCContext extends TRPCContext {
  session: NonNullable<TRPCContext['session']>
}

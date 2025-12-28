import { Request } from 'express'
import { Session } from '../utils/auth'

export interface AuthenticatedRequest extends Request {
  session: NonNullable<Session>
}

import { Request, Response, NextFunction } from 'express'
import { Session } from '../utils/auth'

export function requireSession(
  req: Request,
  res: Response,
  next: NextFunction,
): asserts req is Request & { session: NonNullable<Session> } {
  if (!req.session) {
    res.sendStatus(401)
    return
  }
  next()
}

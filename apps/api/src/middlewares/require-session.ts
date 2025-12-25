import { NextFunction, Request, Response } from 'express'

export async function requireSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.session) {
    return res.status(401).json({ error: { message: 'Unauthorized' } })
  }
  next()
}

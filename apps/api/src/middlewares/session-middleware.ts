import { NextFunction, Request, Response } from 'express'
import { auth } from '../utils/auth'
import { fromNodeHeaders } from 'better-auth/node'

export async function sessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // console.log('req headers: ', req.headers, req.header)
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  })

  if (session) {
    req.session = session
  }
  console.log('session: ', session)
  next()
}

import type { VerifyMagicLink, VerifyMagicLinkResponse } from '@repo/types'
import { Request, Response } from 'express'
import { verifyMagicLink } from '../../services/auth/verify-magic-link.service'
import { fromNodeHeaders } from 'better-auth/node'

export async function VerifyMagicLink(
  req: Request<{}, {}, VerifyMagicLink>,
  res: Response<VerifyMagicLinkResponse>,
) {
  try {
    const result = await verifyMagicLink(req.body, fromNodeHeaders(req.headers))
    if (result.success && result.cookies) {
      res.setHeader('Set-Cookie', result.cookies)
      return res
        .status(200)
        .json({ success: result.success, message: result.message })
    }

    return res.status(400).json(result)
  } catch (error) {
    console.log('error: ', error)
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong.' })
  }
}

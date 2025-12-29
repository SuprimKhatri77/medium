import { Request, Response } from 'express'
import { setUsername } from '../../services/get-started/set-user-name.service'
import type { SetUsername, SetUsernameResponse } from '@repo/types'
import { fromNodeHeaders } from 'better-auth/node'

export async function SetUsernameController(
  req: Request<{}, {}, SetUsername>,
  res: Response<SetUsernameResponse>,
) {
  if (!req.session)
    return res.status(401).json({ success: false, message: 'Unauthorized.' })
  try {
    const result = await setUsername(req.body, fromNodeHeaders(req.headers))
    if (result.success) {
      return res.status(200).json(result)
    }
    return res.status(400).json(result)
  } catch (error) {
    console.log('error: ', error)
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong.' })
  }
}

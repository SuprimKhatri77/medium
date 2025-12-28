import { SetUserInterestsResponse } from '@repo/types'
import { Response } from 'express'
import { setUserInterest } from '../../services/get-started/set-user-interests.service'
import { AuthenticatedRequest } from '../../types/authenticated-request'

export const SetUserInterestController = async (
  req: AuthenticatedRequest,
  res: Response<SetUserInterestsResponse>,
) => {
  try {
    const result = await setUserInterest(req.body, req.session.user.id)
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

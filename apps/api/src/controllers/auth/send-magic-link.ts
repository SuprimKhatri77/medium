import {
  sendMagicLinkSchema,
  type SendMagicLink,
  type SendMagicLinkResponse,
} from '@repo/types'
import { Request, Response } from 'express'
import z from 'zod'
import { sendMagicLink } from '../../services/auth/send-magic-link.service'
import { fromNodeHeaders } from 'better-auth/node'

export async function SendMagicLink(
  req: Request<{}, {}, SendMagicLink, {}>,
  res: Response<SendMagicLinkResponse>,
) {
  // const input = req.body;
  // const validateInput = sendMagicLinkSchema.safeParse(input);
  // if (!validateInput.success) {
  //   const tree = z.treeifyError(validateInput.error).properties;
  //   return res.status(400).json({
  //     success: false,
  //     errors: { properties: { email: tree?.email?.errors } },
  //     message: "Validation failed.",
  //   });
  // }
  // const validatedData = validateInput.data;
  try {
    const result = await sendMagicLink(req.body, fromNodeHeaders(req.headers))
    if (result.success) {
      return res.status(200).json(result)
    } else {
      return res.status(400).json(result)
    }
  } catch (error) {
    console.log('error: ', error)
    return res
      .status(500)
      .json({ success: false, message: 'Something went wrong.' })
  }
}

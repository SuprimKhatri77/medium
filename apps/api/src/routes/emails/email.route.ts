import { Router } from 'express'
import { SendMagicLink } from '../../controllers/auth/send-magic-link'
import { validate } from '../../middlewares/validate'
import { sendMagicLinkSchema } from '@repo/types'

const router: Router = Router()

router.post('/send-magic-link', validate(sendMagicLinkSchema), SendMagicLink)
export default router

import { Router } from 'express'
import { VerifyMagicLink } from '../../controllers/auth/verify-magic-link'
import { validate } from '../../middlewares/validate'
import { verifyMagicLinkSchema } from '@repo/types'

const router: Router = Router()

router.post(
  '/verify-magic-link',
  validate(verifyMagicLinkSchema),
  VerifyMagicLink,
)

export default router

import { RequestHandler, Router } from 'express'
import { validate } from '../../../middlewares/validate'
import { setUserInterestsSchema, setUsernameSchema } from '@repo/types'
import { SetUsername } from '../../../controllers/get-started/set-user-name'
import { SetUserInterest } from '../../../controllers/get-started/set-user-interests'

const router: Router = Router()

router.post('/me', validate(setUsernameSchema), SetUsername)
router.post(
  '/topics',
  validate(setUserInterestsSchema),
  SetUserInterest as RequestHandler,
)

export default router

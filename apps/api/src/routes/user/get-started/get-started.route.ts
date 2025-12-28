import { RequestHandler, Router } from 'express'
import { validate } from '../../../middlewares/validate'
import { setUserInterestsSchema, setUsernameSchema } from '@repo/types'
import { SetUsernameController } from '../../../controllers/get-started/set-user-name'
import { SetUserInterestController } from '../../../controllers/get-started/set-user-interests'

const router: Router = Router()

router.post('/me', validate(setUsernameSchema), SetUsernameController)
router.post(
  '/topics',
  validate(setUserInterestsSchema),
  SetUserInterestController as RequestHandler,
)

export default router

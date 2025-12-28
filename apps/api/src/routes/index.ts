import { Router } from 'express'
import emailRouter from './emails/email.route'
import verificationRouter from './verification/verification.route'
import sessionRouter from './session/session.route'
import userRouter from './user/user.route'
import { requireSession } from '../middlewares/require-session'
import { sessionMiddleware } from '../middlewares/session-middleware'

const router: Router = Router()

router.use('/email', emailRouter)
router.use('/verification', verificationRouter)
router.use('/session', sessionRouter)

router.use('/user', sessionMiddleware, requireSession, userRouter)
export default router

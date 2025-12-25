import { Router } from 'express'
import emailRouter from './emails/email.route'
import verificationRouter from './verification/verification.route'
import sessionRouter from './session/session.route'

const router: Router = Router()

router.use('/email', emailRouter)
router.use('/verification', verificationRouter)
router.use('/session', sessionRouter)

export default router

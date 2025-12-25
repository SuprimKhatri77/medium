import { Request, Response, Router } from 'express'
import { sessionMiddleware } from '../../middlewares/session-middleware'
import { auth } from '../../utils/auth'

const router: Router = Router()
router.get(
  '/get-user-session',
  sessionMiddleware,
  (req: Request, res: Response) => {
    return res.status(200).json({
      session: req.session || null,
    })
  },
)

export default router

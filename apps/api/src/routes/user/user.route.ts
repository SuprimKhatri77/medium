import { Request, Response, Router } from 'express'
import { sessionMiddleware } from '../../middlewares/session-middleware'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import { userInterests } from '../../db/schema'
import { UnserInterest } from '@repo/types'
import getStartedRouter from './get-started/get-started.route'

const router: Router = Router()

router.use('/get-started', getStartedRouter)

router.get(
  '/interests',
  sessionMiddleware,
  async (req: Request, res: Response<UnserInterest>) => {
    if (!req.session) return res.sendStatus(401)

    const interests = await db.query.userInterests.findMany({
      where: eq(userInterests.userId, req.session.user.id),
    })

    const allInterests =
      interests.length === 0 ? [] : interests.map((i) => i.topic)

    console.log('all interests: ', allInterests)

    return res.status(200).json({ interests: allInterests })
  },
)

export default router

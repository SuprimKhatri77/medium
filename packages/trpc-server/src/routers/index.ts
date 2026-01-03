import { router } from '../procedures/public'
import { authRoutes } from './auth'
import { onboardingRoutes } from './onboarding'
import { userRoutes } from './user'

export const appRouter = router({
  auth: authRoutes,
  user: userRoutes,
  onboarding: onboardingRoutes,
})

export type AppRouter = typeof appRouter

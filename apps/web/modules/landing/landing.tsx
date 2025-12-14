import Dashboard from './with-session-landing'
import { LandingWithoutSession } from './without-session-landing'

type Props = {
  session: {
    id: string
    createdAt: string
    updatedAt: string
    userId: string
    expiresAt: string
    token: string
    ipAddress?: string | null | undefined | undefined

    userAgent?: string | null | undefined | undefined

    user: {
      id: string
      createdAt: string
      updatedAt: string
      email: string
      emailVerified: boolean
      name: string
      image?: string | null | undefined | undefined
    }
  } | null
}

export function Landing({ session }: Props) {
  return session ? <Dashboard session={session} /> : <LandingWithoutSession />
}

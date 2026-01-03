import { Session } from '@repo/contracts'
import { LandingWithSession } from './landing-with-session'
import { LandingWithoutSession } from './landing-without-session'

type Props = {
  session: Session
}
export function Landing({ session }: Props) {
  return session ? (
    <LandingWithSession session={session} />
  ) : (
    <LandingWithoutSession />
  )
}

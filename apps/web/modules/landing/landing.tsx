import { SessionType } from '@repo/types'
import { LandingWithSession } from './landing-with-session'
import { LandingWithoutSession } from './landing-without-session'

type Props = {
  session: SessionType
}
export function Landing({ session }: Props) {
  return session ? (
    <LandingWithSession session={session} />
  ) : (
    <LandingWithoutSession />
  )
}

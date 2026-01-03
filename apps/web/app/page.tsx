export const dynamic = 'force-dynamic'

import { trpc } from '@repo/trpc-client/server'
import { Landing } from '../modules/landing/landing'

export default async function Home() {
  const session = await trpc.auth.getUserSession.query()

  return <Landing session={session} />
}

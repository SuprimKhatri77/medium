export const dynamic = 'force-dynamic'

import { Landing } from '@/modules/landing/landing'
import { trpc } from '@medium/trpc-client'

export default async function Page() {
  const result = await trpc.auth.getUserSession.query()
  return <Landing session={result} />
}

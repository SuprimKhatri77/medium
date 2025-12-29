import { Landing } from '@/modules/landing/landing'
import { getUserSession } from '@/utils/get-user-session'

export default async function Home() {
  const session = await getUserSession()

  console.log('session: ', session)

  return <Landing session={session} />
}

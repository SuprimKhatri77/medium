import { Landing } from '@/modules/landing/landing'
import { getUserSession } from '@/utils/get-user-session'

export default async function Home() {
  const session = await getUserSession()

  return <Landing session={session} />
}

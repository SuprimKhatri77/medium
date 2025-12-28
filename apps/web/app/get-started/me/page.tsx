import SetUsername from '@/modules/get-started/set-user-name'
import { getUserSession } from '@/utils/get-user-session'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getUserSession()

  if (!session) redirect('/')

  return <SetUsername />
}

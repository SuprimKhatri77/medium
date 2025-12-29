import { ProfilePage } from '@/modules/user/profile'
import { getUserSession } from '@/utils/get-user-session'
import { notFound, redirect } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const session = await getUserSession()
  if (!session || !session.user) redirect('/')

  const { username } = await params
  const normalizedUsername = decodeURIComponent(username).replace(/^@/, '')

  if (session.user.username !== normalizedUsername) return notFound()

  return <ProfilePage />
}

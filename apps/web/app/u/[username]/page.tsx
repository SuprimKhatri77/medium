export const dynamic = 'force-dynamic'

import { ProfilePage } from '@/modules/user/profile'
import { handleTRPCError } from '@/utils/trpc-error'
import { ProfilePageUser } from '@repo/contracts'
import { trpc } from '@repo/trpc-client/server'
import { notFound, redirect } from 'next/navigation'

function hasRequiredProfileFields(
  user: Awaited<ReturnType<typeof trpc.auth.getCurrentUser.query>>['user'],
): user is ProfilePageUser {
  return !!user.name && !!user.username && !!user.displayUsername
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { user } = await trpc.auth.getCurrentUser.query().catch((error) => {
    handleTRPCError(error)
  })

  if (!hasRequiredProfileFields(user)) {
    redirect('/get-started')
  }

  const { username } = await params
  const normalizedUsername = decodeURIComponent(username).replace(/^@/, '')

  if (normalizedUsername !== user.username) return notFound()

  return <ProfilePage user={user} />
}

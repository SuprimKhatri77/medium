export const dynamic = 'force-dynamic'

import { handleTRPCError } from '@/utils/trpc-error'
import { trpc } from '@repo/trpc-client/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const { user } = await trpc.auth.getCurrentUser.query().catch((error) => {
    handleTRPCError(error)
  })

  if (!user.name) redirect('/get-started/me')
  if (!user.hasCompletedOnboarding) redirect('/get-started/topics')

  redirect('/')
}

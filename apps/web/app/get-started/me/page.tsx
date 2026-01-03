export const dynamic = 'force-dynamic'

import SetUsernamePage from '@/modules/get-started/set-user-name'
import { handleTRPCError } from '@/utils/trpc-error'
import { trpc } from '@repo/trpc-client/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const result = await trpc.auth.getUserSession.query().catch((error) => {
    handleTRPCError(error)
  })
  if (!result || !result.session || !result.user || result.user.name)
    redirect('/')

  return <SetUsernamePage />
}

export const dynamic = 'force-dynamic'

import { trpc } from '@repo/trpc-client/server'
import { SelectTopics } from '@/modules/get-started/select-topics'
import { handleTRPCError } from '@/utils/trpc-error'

export default async function Page() {
  const { interests } = await trpc.user.getUserInterests
    .query()
    .catch((error) => {
      handleTRPCError(error)
    })

  return <SelectTopics userInterests={interests} />
}

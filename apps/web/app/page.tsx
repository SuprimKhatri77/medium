'use client'

import { trpcClient } from '@medium/trpc-client'

export default function Home() {
  const { data, isPending } = trpcClient.test.testEndpoint.useQuery()

  return isPending ? (
    <div>
      <h1>Fetching....</h1>
    </div>
  ) : (
    <div>
      <h1>{data?.message}</h1>
    </div>
  )
}

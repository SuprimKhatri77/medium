'use client'

import { trpcClient as trpc } from './client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { httpBatchLink } from '@trpc/client'
import React, { useState } from 'react'
import superjson from 'superjson'

export const TRPCQueryClientProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [queryClient] = useState(() => new QueryClient())
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'

  console.log('trpc client url: ', baseUrl)

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${baseUrl}/trpc`,
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' })
          },
          transformer: superjson,
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

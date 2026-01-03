import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@repo/trpc-server'
import type { createTRPCProxyClient as CreateTRPCProxyClient } from '@trpc/client'
import { cookies } from 'next/headers'
import superjson from 'superjson'

export const trpc: ReturnType<typeof CreateTRPCProxyClient<AppRouter>> =
  createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/trpc`,
        async headers() {
          console.log('trpc url: ', process.env.NEXT_PUBLIC_BACKEND_URL)
          const cookieStore = await cookies()
          const cookieString = cookieStore
            .getAll()
            .map((cookie) => `${cookie.name}=${cookie.value}`)
            .join('; ')

          console.log('cookies being sent:', cookieString)

          return {
            cookie: cookieString,
          }
        },

        transformer: superjson,
      }),
    ],
  })

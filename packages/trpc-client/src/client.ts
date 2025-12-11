import { AppRouter } from '@medium/trpc-server'
import { createTRPCReact } from '@trpc/react-query'
import type { CreateTRPCReact } from '@trpc/react-query'

export const trpcClient: CreateTRPCReact<AppRouter, unknown> =
  createTRPCReact<AppRouter>()

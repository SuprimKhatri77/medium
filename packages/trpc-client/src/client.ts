import { CreateTRPCReact, createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@repo/trpc-server'

export const trpcClient: CreateTRPCReact<AppRouter, unknown> =
  createTRPCReact<AppRouter>()

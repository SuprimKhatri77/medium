import { initTRPC, TRPCError, type TRPCProcedureBuilder } from '@trpc/server'
import type { TRPCContext, ProtectedTRPCContext } from '@repo/types'
import superjson from 'superjson'

export const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router
export const publicProcedure = t.procedure

import { publicProcedure, router } from '../trpc'

export const testRouter = router({
  testEndpoint: publicProcedure.query(() => {
    return { message: 'Hello world.' }
  }),
})

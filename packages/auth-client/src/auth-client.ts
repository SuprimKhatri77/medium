import { createAuthClient } from 'better-auth/react'

const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BACKEND_URL || 'http://localhost:5000',
})

export type AuthClientType = typeof authClient
export { authClient }

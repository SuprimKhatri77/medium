import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.BETTER_AUTH_URL ||
        process.env.BACKEND_URL ||
        process.env.NEXT_PUBLIC_API_URL
      : process.env.BETTER_AUTH_URL || 'http://localhost:5000',
})

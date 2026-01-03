import { TRPCClientError } from '@repo/trpc-client'
import { redirect } from 'next/navigation'

interface ZodIssue {
  code: string
  path: string[]
  message: string
}

export function getFieldErrors<T>(error: { message: string }): T {
  console.log('error: ', error)
  try {
    const issues: ZodIssue[] = JSON.parse(error.message)
    const fieldErrors: Record<string, string[]> = {}

    issues.forEach((issue) => {
      const fieldName = issue.path[0] as string
      if (fieldName) {
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = []
        }
        fieldErrors[fieldName].push(issue.message)
      }
    })

    return {
      properties: fieldErrors,
    } as T
  } catch {
    return { properties: {} } as T
  }
}

export function isTRPCUnauthorized(error: unknown): boolean {
  return error instanceof TRPCClientError && error.data?.code === 'UNAUTHORIZED'
}

export function handleTRPCAuthError(error: unknown): never {
  if (isTRPCUnauthorized(error)) {
    redirect('/login')
  }
  throw error
}

export function handleTRPCError(error: unknown, redirectPath = '/'): never {
  if (error instanceof TRPCClientError) {
    if (error.data?.code === 'UNAUTHORIZED') {
      redirect(redirectPath)
    }
    throw error
  }
  throw error
}

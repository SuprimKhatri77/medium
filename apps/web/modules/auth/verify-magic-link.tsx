'use client'

import { trpcClient } from '@repo/trpc-client'
import { cn } from '../../lib/utils'
import type { VerifyMagicLink } from '@repo/contracts'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  token: string
}

export function VerifyMagicLink({ token }: Props) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isVerified, setIsVerified] = useState<boolean>(false)

  const { mutate, reset } = trpcClient.auth.verifyMagicLink.useMutation({
    onSuccess: (result) => {
      toast.success(result.message)
      setIsVerified(true)
      router.replace(result.redirectTo as string)
      reset()
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong.')
      setErrorMessage(error.message)

      reset()
    },
  })
  useEffect(() => {
    if (!token) return
    mutate({ token })
  }, [token, mutate])
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4">
              {errorMessage ? (
                <div className="rounded-full bg-red-100 p-3">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              ) : isVerified ? (
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="rounded-full bg-blue-100 p-3">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                </div>
              )}
            </div>

            <h2 className="mb-2 text-2xl font-semibold text-gray-900">
              {errorMessage
                ? 'Verification Failed'
                : isVerified
                  ? 'Verified Successfully!'
                  : 'Verifying Your Link'}
            </h2>

            <p
              className={cn(
                'mb-6 ',
                errorMessage ? 'text-red-600' : 'text-gray-600',
              )}
            >
              {errorMessage
                ? errorMessage
                : isVerified
                  ? 'Redirecting you to your dashboard...'
                  : 'Please wait while we verify your magic link.'}
            </p>

            {errorMessage && (
              <div className="w-full rounded-md bg-gray-50 p-4 text-left">
                <p className="text-sm text-gray-700">
                  <strong>Need help?</strong>
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>• Request a new magic link</li>
                  <li>• Check if the link has expired</li>
                  <li>• Make sure you&apos;re using the latest link</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

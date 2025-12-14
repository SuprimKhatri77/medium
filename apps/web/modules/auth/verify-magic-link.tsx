'use client'

import { trpcClient } from '@medium/trpc-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Props = {
  token: string
  callbackURL: string
}

export function VerifyMagicLink({ token, callbackURL }: Props) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const { mutate, isPending, reset } =
    trpcClient.auth.verifyMagicLink.useMutation({
      onSuccess: (result) => {
        if (!result.success) {
          setErrorMessage(result.message)
          toast.success(result.message)
          reset()
          return
        }
        setIsVerified(true)
        router.replace('/dashboard')
        reset()
      },
      onError: (error) => {
        const validationError = JSON.parse(error.message)
        setErrorMessage(validationError[0].message)
        toast.error(validationError[0].message)
        reset()
      },
    })
  useEffect(() => {
    if (!token) return
    mutate({ token })
  }, [])
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}
      <h1>
        {isVerified
          ? 'Verified, Logging in....'
          : isPending
            ? 'Verifying...'
            : 'Once we verify the credentials of yours then you can access your dashboard'}
      </h1>
    </div>
  )
}

'use client'

import { trpcClient } from '@repo/trpc-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import type { SetUsernameResponse } from '@repo/contracts'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { getFieldErrors } from '@/utils/trpc-error'

export default function SetUsernamePage() {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<SetUsernameResponse['errors']>({})

  const { mutate, isPending, reset } =
    trpcClient.onboarding.setUserName.useMutation({
      onSuccess: (result) => {
        toast.success(result.message)
        router.replace('/get-started/topics')
        reset()
      },
      onError: (error) => {
        if (error.data?.code === 'BAD_REQUEST') {
          const fieldErrors =
            getFieldErrors<SetUsernameResponse['errors']>(error)
          setError(fieldErrors)
          toast.error('Validation failed.')
        } else {
          toast.error(error.message || 'Something went wrong.')
        }
        reset()
      },
    })

  return (
    <div
      inert={isPending}
      className="min-h-screen flex flex-col justify-center items-center gap-4"
    >
      <h1>Enter your full Name</h1>
      <div className="flex flex-col gap-2">
        <Input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error?.properties?.name && (
          <p className="text-red-500 text-sm">{error.properties.name[0]}</p>
        )}
        <Button
          onClick={() => {
            mutate({ name })
          }}
          disabled={isPending}
        >
          {isPending ? <Spinner /> : 'Continue'}
        </Button>
      </div>
    </div>
  )
}

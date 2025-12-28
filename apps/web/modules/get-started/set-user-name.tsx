'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { apiFetch } from '@/utils/api'
import type { SetUsername, SetUsernameResponse } from '@repo/types'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SetUsername() {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<SetUsernameResponse['errors']>({})
  const { mutate, isPending, reset } = useMutation<
    SetUsernameResponse,
    { message: string; errors: SetUsernameResponse['errors'] },
    SetUsername
  >({
    mutationFn: (data) => {
      return apiFetch('/user/get-started/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })
    },
    onSuccess: (result) => {
      if (result.success) {
        router.push('/')
        reset()
      } else {
        toast.error(result.message)
        reset()
      }
    },
    onError: (error) => {
      setError(error.errors)
      toast.error(error.message)
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

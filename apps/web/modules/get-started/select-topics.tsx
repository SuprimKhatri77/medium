'use client'

import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { apiFetch } from '@/utils/api'
import {
  allTopics,
  SetUserInterest,
  SetUserInterestsResponse,
  TopicsType,
} from '@repo/types'
import { useMutation } from '@tanstack/react-query'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  userInterests: TopicsType[] | []
}
export function SelectTopics({ userInterests }: Props) {
  const router = useRouter()
  const [selectedTopics, setSelectedTopics] =
    useState<TopicsType[]>(userInterests)
  console.log('selected topics: ', selectedTopics)
  const [error, setError] = useState<SetUserInterestsResponse['errors']>()
  const { mutate, isPending, reset } = useMutation<
    SetUserInterestsResponse,
    { message: string; errors: SetUserInterestsResponse['errors'] },
    SetUserInterest
  >({
    mutationFn: (data) => {
      return apiFetch('/user/get-started/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      })
    },
    onSuccess: (result) => {
      toast.success(result.message)
      setSelectedTopics([])
      setError({})
      router.replace('/')
      reset()
    },
    onError: (error) => {
      console.log('error: ', error)
      setError(error.errors)
      toast.error(error.message)
      reset()
    },
  })
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1>Select topics.</h1>
      <div className="flex max-w-xl gap-3 flex-wrap ">
        {allTopics.map((t) => (
          <Button
            variant="outline"
            key={t}
            className={cn(
              'capitalize',
              selectedTopics.includes(t) && 'border-green-400',
            )}
            onClick={() => {
              setSelectedTopics((prev) =>
                prev.includes(t)
                  ? prev.filter((topic) => topic !== t)
                  : [...prev, t],
              )
            }}
          >
            {t}
            {selectedTopics.includes(t) ? <CheckIcon /> : <PlusIcon />}
          </Button>
        ))}
      </div>
      {error?.properties?.topics && (
        <FieldError>{error.properties.topics[0]}</FieldError>
      )}
      <Button
        disabled={isPending}
        onClick={() => mutate({ topics: selectedTopics })}
      >
        {isPending ? <Spinner /> : 'Continue'}
      </Button>
    </div>
  )
}

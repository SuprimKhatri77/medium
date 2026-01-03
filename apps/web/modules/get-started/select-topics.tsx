'use client'

import {
  allTopics,
  SetUserInterestsResponse,
  TopicsType,
} from '@repo/contracts'
import { trpcClient } from '@repo/trpc-client'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { getFieldErrors } from '@/utils/trpc-error'
import { FieldError } from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'

type Props = {
  userInterests: TopicsType[] | []
}
export function SelectTopics({ userInterests }: Props) {
  const router = useRouter()
  const [selectedTopics, setSelectedTopics] =
    useState<TopicsType[]>(userInterests)
  console.log('selected topics: ', selectedTopics)
  const [error, setError] = useState<SetUserInterestsResponse['errors']>()

  const { mutate, isPending, reset } =
    trpcClient.onboarding.setUserInterest.useMutation({
      onSuccess: (result) => {
        toast.success(result.message)
        router.replace('/')
      },
      onError: (error) => {
        if (error.data?.code === 'BAD_REQUEST') {
          const fieldError =
            getFieldErrors<SetUserInterestsResponse['errors']>(error)
          setError(fieldError)
          console.log('field error: ', fieldError)
          toast.error('Validation failed.')
        } else {
          toast.error(error.message || 'Something went wrong.')
        }
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

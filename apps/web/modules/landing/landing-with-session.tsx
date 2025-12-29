'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@/utils/auth-client'
import { SessionType } from '@repo/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  session: NonNullable<SessionType>
}

export function LandingWithSession({ session }: Props) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push('/')
          },
          onError: ({ error }) => {
            toast.error(error.message)
          },
        },
      })
    } finally {
      setIsLoggingOut(false)
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <h1>Hello, {session.user.name}</h1>
      <div className="flex items-center gap-3">
        <Button onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? <Spinner /> : 'Logout'}
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/u/@${session.user.username}`}>Profile</Link>
        </Button>
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { authClient } from '@medium/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

type Props = {
  session: {
    id: string
    createdAt: string
    updatedAt: string
    userId: string
    expiresAt: string
    token: string
    ipAddress?: string | null | undefined | undefined

    userAgent?: string | null | undefined | undefined

    user: {
      id: string
      createdAt: string
      updatedAt: string
      email: string
      emailVerified: boolean
      name: string
      image?: string | null | undefined | undefined
    }
  }
}

const Dashboard = ({ session }: Props) => {
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
  const router = useRouter()
  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace('/')
          },
          onError({ error }) {
            toast.error(error.message)
          },
        },
      })
    } finally {
      setIsLoggingOut(false)
    }
  }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-2">
      <p>Hi, {session.user.name} from Dashboard.</p>
      <Button onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? <Spinner /> : 'Logout'}
      </Button>
    </div>
  )
}

export default Dashboard

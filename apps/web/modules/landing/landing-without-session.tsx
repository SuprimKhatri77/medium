'use client'

import { Button } from '@/components/ui/button'
import { AuthModal } from '../auth/auth'
import { useState } from 'react'

export function LandingWithoutSession() {
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false)
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>(
    'login',
  )
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-5">
      <div className="flex gap-4 items-center border-gray-400 border-2 py-4 px-7 rounded-md">
        <Button
          onClick={() => {
            setShowAuthModal(true)
            setAuthModalType('login')
          }}
          variant="destructive"
        >
          Login
        </Button>
        <Button
          onClick={() => {
            setShowAuthModal(true)
            setAuthModalType('signup')
          }}
          variant="outline"
        >
          Signup
        </Button>
      </div>
      {showAuthModal && (
        <div className="min-h-screen w-full absolute flex items-center justify-center">
          <AuthModal
            authModalType={authModalType}
            closeModal={setShowAuthModal}
          />
        </div>
      )}
    </div>
  )
}

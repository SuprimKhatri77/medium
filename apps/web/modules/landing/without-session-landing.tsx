'use client'

import { useState } from 'react'
import { AuthModal } from '../auth/auth'

export function LandingWithoutSession() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'login' | 'signup'>('login')

  const openModal = (mode: 'login' | 'signup') => {
    setModalMode(mode)
    setIsModalOpen(true)
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center gap-3">
        <button
          onClick={() => openModal('login')}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => openModal('signup')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Get Started
        </button>
      </div>
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  )
}

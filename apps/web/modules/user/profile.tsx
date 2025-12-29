'use client'

import { useState } from 'react'
import { Camera, Check, X, Edit2 } from 'lucide-react'
import Image from 'next/image'

// Mock session for preview
const mockSession = {
  user: {
    id: '123',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-20'),
    email: 'user@example.com',
    emailVerified: true,
    name: 'Alex Richardson',
    image: null,
    username: 'alexrichardson',
    displayUsername: '@alexrichardson',
  },
}

export function ProfilePage() {
  const session = mockSession
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: session.user.name,
    username: session.user.username || '',
    email: session.user.email,
  })

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: session.user.name,
      username: session.user.username || '',
      email: session.user.email,
    })
    setIsEditing(false)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header with Edit Button */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Profile</h1>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Edit2 size={18} />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Check size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 border border-black text-black rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="border-2 border-black rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Profile Header */}
          <div className="bg-black text-white p-8">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-white flex items-center justify-center text-black text-3xl font-bold overflow-hidden">
                  {session.user.image ? (
                    <Image
                      fill
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{session.user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </button>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 pt-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="text-3xl font-bold bg-white text-black px-3 py-1 rounded w-full mb-2"
                  />
                ) : (
                  <h2 className="text-3xl font-bold mb-2">
                    {session.user.name}
                  </h2>
                )}

                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-300">@</span>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                      }
                      className="bg-white text-black px-2 py-1 rounded"
                    />
                  </div>
                ) : (
                  <p className="text-gray-300 text-lg">
                    {session.user.displayUsername ||
                      `@${session.user.username}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white p-8 space-y-6">
            {/* Email */}
            <div className="border-b border-gray-200 pb-6">
              <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="text-lg border-2 border-black px-3 py-2 rounded-lg w-full"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <p className="text-lg">{session.user.email}</p>
                  {session.user.emailVerified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                      Verified
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* User ID */}
            <div className="border-b border-gray-200 pb-6">
              <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                User ID
              </label>
              <p className="text-lg font-mono text-gray-700">
                {session.user.id}
              </p>
            </div>

            {/* Account Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                  Member Since
                </label>
                <p className="text-lg">{formatDate(session.user.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                  Last Updated
                </label>
                <p className="text-lg">{formatDate(session.user.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Profile URL: /u/
            {session.user.displayUsername || `@${session.user.username}`}
          </p>
        </div>
      </div>
    </div>
  )
}

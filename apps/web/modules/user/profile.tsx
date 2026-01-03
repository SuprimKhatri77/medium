'use client'

import { useState } from 'react'
import { Camera, Check, X, Edit2 } from 'lucide-react'
import Image from 'next/image'
import { ProfilePageUser, UpdateUserResponse } from '@repo/contracts'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ImageUploadButton } from '@/components/image-upload-btn'
import { Spinner } from '@/components/ui/spinner'
import { FieldError } from '@/components/ui/field'
import { trpcClient } from '@repo/trpc-client'
import { getFieldErrors } from '@/utils/trpc-error'

type Props = {
  user: ProfilePageUser
}

export function ProfilePage({ user }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<UpdateUserResponse['errors']>()
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>(user.image)
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio || '',
    pronoun: user.pronoun || null,
    image: profilePhotoUrl,
  })
  const router = useRouter()

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const { mutate, isPending, reset } = trpcClient.user.updateUser.useMutation({
    onSuccess: (result) => {
      toast.success(result.message)

      if (formData.username !== user.username) {
        router.replace(`/u/@${formData.username}`)
      } else {
        router.refresh()
      }

      reset()
    },
    onError: (error) => {
      if (error.data?.code === 'BAD_REQUEST') {
        const fieldErrors = getFieldErrors<UpdateUserResponse['errors']>(error)

        setErrors(fieldErrors)
        toast.error('Validation failed.')
      } else {
        toast.error(error.message || 'Something went wrong.')
      }
      reset()
    },
  })
  const normalizeBio = (bio: string | null | undefined) => bio ?? ''
  const handleSave = () => {
    // console.log(
    //   `formdata image url: ${formData.image}\n user image url: ${user.image}`,
    // )
    if (
      formData.name === user.name &&
      formData.username === user.username &&
      normalizeBio(formData.bio) === normalizeBio(user.bio) &&
      formData.pronoun === user.pronoun &&
      formData.image === user.image
    ) {
      toast.error('No changes detected.')
      return
    }
    const payload = {
      ...formData,
      bio: formData.bio.trim() === '' ? null : formData.bio,
    }
    return mutate(payload)
  }
  const handleCancel = () => {
    setFormData({
      name: user.name,
      username: user.username,
      bio: user.bio || '',
      pronoun: user.pronoun || null,
      image: user.image,
    })
    setErrors({})
    setProfilePhotoUrl(user.image)
    setIsEditing(false)
  }

  return (
    <div inert={isPending} className="min-h-screen bg-white text-black">
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
                disabled={isPending}
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isPending ? (
                  <Spinner />
                ) : (
                  <>
                    <Check size={18} />
                    Save
                  </>
                )}
              </button>
              <button
                disabled={isPending}
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
                  {profilePhotoUrl ? (
                    <Image
                      fill
                      src={profilePhotoUrl}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                {isEditing && (
                  <ImageUploadButton
                    onUploadComplete={(url) => {
                      setProfilePhotoUrl(url)
                      setFormData((prev) => ({
                        ...prev,
                        image: url,
                      }))
                    }}
                    defaultImage={profilePhotoUrl}
                    showPreview={false}
                    uploadingContent={
                      <div className="absolute inset-0 bg-gray-800/80 rounded-full flex justify-center items-center">
                        <Spinner className="h-5 w-5 text-white" />
                      </div>
                    }
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Camera size={24} className="text-white" />
                    </div>
                  </ImageUploadButton>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 pt-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="text-3xl font-bold bg-white text-black px-3 py-1 rounded w-full mb-2 outline-none border-2 border-white focus:border-white"
                    />

                    {errors?.properties?.name && (
                      <FieldError>{errors.properties.name[0]}</FieldError>
                    )}
                  </>
                ) : (
                  <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
                )}

                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-300">@</span>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          username: e.target.value,
                        })
                      }
                      className="bg-white text-black px-2 py-1 rounded outline-none border-2 border-white focus:border-white"
                    />

                    {errors?.properties?.username && (
                      <FieldError>{errors.properties.username[0]}</FieldError>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-300 text-lg">{`@${user.username}`}</p>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="bg-white p-8 space-y-6">
            {/* Bio */}
            <div className="border-b border-gray-200 pb-6">
              <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                Bio
              </label>
              {isEditing ? (
                <>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={3}
                    placeholder="Tell us about yourself..."
                    className="text-lg border-2 border-black px-3 py-2 rounded-lg w-full resize-none outline-none focus:border-black"
                  />

                  {errors?.properties?.bio && (
                    <FieldError>{errors.properties.bio[0]}</FieldError>
                  )}
                </>
              ) : (
                <p className="text-lg text-gray-700">
                  {user.bio || 'No bio added yet'}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="border-b border-gray-200 pb-6">
              <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                Email Address
              </label>
              <div className="flex items-center gap-3">
                <p className="text-lg">{user.email}</p>
                {user.emailVerified && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-black text-white">
                    Verified
                  </span>
                )}
              </div>
            </div>

            {/* Pronouns */}
            <div className="border-b border-gray-200 pb-6">
              <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                Pronouns
              </label>
              {isEditing ? (
                <>
                  <select
                    value={formData.pronoun || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pronoun: e.target.value as 'he' | 'she' | null,
                      })
                    }
                    className="text-lg border-2 border-black px-3 py-2 rounded-lg bg-white outline-none focus:border-black appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M4 6l4 4 4-4z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      paddingRight: '2.5rem',
                    }}
                  >
                    <option value="" disabled defaultChecked>
                      Select a pronoun
                    </option>
                    <option value="he">he/him</option>
                    <option value="she">she/her</option>
                  </select>

                  {errors?.properties?.pronoun && (
                    <FieldError>{errors.properties.pronoun[0]}</FieldError>
                  )}
                </>
              ) : (
                <p className="text-lg">
                  {user.pronoun === 'he'
                    ? 'he/him'
                    : user.pronoun === 'she'
                      ? 'she/her'
                      : 'Not specified'}
                </p>
              )}
            </div>

            {/* Account Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                  Member Since
                </label>
                <p className="text-lg">{formatDate(user.createdAt)}</p>
              </div>

              <div>
                <label className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2 block">
                  Last Updated
                </label>
                <p className="text-lg">{formatDate(user.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Profile URL: /u/@{user.username}</p>
        </div>
      </div>
    </div>
  )
}

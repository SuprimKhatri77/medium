'use client'
import { useUploadThing } from '@/utils/uploadthing'
import Image from 'next/image'
import { useRef, useState } from 'react'

type Props = {
  onUploadComplete: (url: string) => void
  children?: React.ReactNode
  className?: string
  uploadingContent?: React.ReactNode
  showPreview?: boolean
  previewClassName?: string
}

export function ImageUploadButton({
  onUploadComplete,
  children,
  className = '',
  uploadingContent,
  showPreview = true,
  previewClassName = '',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { isUploading, startUpload } = useUploadThing('imageUploader')
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const filesArray = Array.from(files)
    const uploaded = await startUpload(filesArray)

    if (uploaded && uploaded[0].ufsUrl) {
      const url = uploaded[0].ufsUrl
      setUploadedUrl(url)
      onUploadComplete(url)
    }
  }

  const handleClick = () => {
    if (!isUploading) {
      inputRef.current?.click()
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleClick}
        disabled={isUploading}
        className={`transition-all ${isUploading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:opacity-80'} ${className}`}
        type="button"
      >
        {isUploading
          ? uploadingContent || (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Uploading...</span>
              </div>
            )
          : children || 'Upload Image'}
      </button>

      {showPreview && uploadedUrl && (
        <div
          className={`relative rounded-lg overflow-hidden border-2 border-gray-200 ${previewClassName}`}
        >
          <Image
            fill
            src={uploadedUrl}
            alt="Uploaded preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

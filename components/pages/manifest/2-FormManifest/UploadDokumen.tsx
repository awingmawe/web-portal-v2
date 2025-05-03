'use client'

import { EditIcon } from '@/components/icons/edit'
import TrashIcon from '@/components/icons/trash'
import { UploadDokumenIcon, UploadIconPrimary } from '@/components/icons/upload'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import React, { useRef, useState } from 'react'

interface FileUploadProps {
  label: string
  description?: string
  accept?: string
  required?: boolean
  onChange?: (file: File | null) => void
  className?: string
  value?: File | string | null
}

export function FileUpload({
  label,
  description = 'Tarik dokumen ke area ini untuk mengunggah dokumen',
  accept = 'image/jpeg,image/jpg,application/pdf',
  required = false,
  onChange,
  className,
  value,
}: FileUploadProps) {
  const [file, setFile] = useState<File | string | null>(value ?? null)
  const inputRef = useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setFile(value || null)
  }, [value])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview if it's an image
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {}
        reader.readAsDataURL(selectedFile)
      }

      if (onChange) onChange(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]

      // Check if file type is accepted
      if (accept) {
        const acceptedTypes = accept.split(',')
        if (!acceptedTypes.includes(droppedFile.type)) {
          alert('File type not accepted')
          return
        }
      }

      setFile(droppedFile)

      // Create preview if it's an image
      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(droppedFile)
      }

      if (onChange) onChange(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
    if (onChange) onChange(null)
  }

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <FormLabel className="text-s-medium text-neutral-900">
        {label} {required && <span className="text-error-500">*</span>}
      </FormLabel>

      <div
        className={cn(
          'group bg-neutral-0 relative flex items-center justify-between gap-2 rounded-xl border border-neutral-300  px-2.5 py-3 transition-colors',
          file ? 'border-primary-500' : 'border-dashed hover:bg-neutral-100'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />

        {file ? (
          <div className="flex w-full items-center justify-start gap-1">
            <UploadIconPrimary />
            <p className="text-m-medium text-center text-neutral-900">
              {file instanceof File ? file.name : label}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="flex items-center gap-1">
              <UploadDokumenIcon size={24} />
              <p className="text-m-regular text-center text-neutral-900">
                {description}
              </p>
            </div>
            <p className="text-s-regular text-center text-neutral-900">
              mendukung tipe file: Jpeg, Jpg, PDF
            </p>
          </div>
        )}

        {!file && (
          <Button
            type="button"
            onClick={handleUploadClick}
            className="border-primary-500 border-[2px] px-5 py-3"
            variant="outline"
          >
            Upload
          </Button>
        )}
        {file && (
          <div className="flex items-center gap-1">
            <div onClick={handleUploadClick}>
              <EditIcon />
            </div>
            <div onClick={handleRemoveFile}>
              <TrashIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

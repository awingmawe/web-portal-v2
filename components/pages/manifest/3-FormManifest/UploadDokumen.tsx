'use client'

import { EditIcon } from '@/components/icons/edit'
import { TrashIcon } from '@/components/icons/trash'
import { UploadDokumenIcon, UploadIconPrimary } from '@/components/icons/upload'
import { Button } from '@/components/ui/button'
import { FormLabel } from '@/components/ui/form'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
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
  disabled?: boolean
}

export function FileUpload({
  label,
  description = 'Tarik dokumen ke area ini untuk mengunggah dokumen',
  accept = 'image/jpeg,image/jpg,application/pdf,image/png',
  required = false,
  onChange,
  className,
  value,
  disabled = false,
}: FileUploadProps) {
  const [file, setFile] = useState<File | string | null>(value ?? null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { lg: isMobile } = useTailwindBreakpoint()

  React.useEffect(() => {
    setFile(value || null)
  }, [value])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return // Prevent file change when disabled

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
    if (disabled) return // Prevent drop when disabled

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
    if (disabled) return // Prevent drag over when disabled
    e.preventDefault()
  }

  const handleRemoveFile = () => {
    if (disabled) return // Prevent remove when disabled

    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
    if (onChange) onChange(null)
  }

  const handleUploadClick = () => {
    if (disabled) return // Prevent upload click when disabled

    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <FormLabel
        className={cn(
          'text-s-medium',
          disabled ? 'text-neutral-400' : 'text-neutral-900'
        )}
      >
        {label} {required && <span className="text-error-500">*</span>}
      </FormLabel>

      <div
        className={cn(
          'group bg-neutral-0 relative flex items-center justify-between gap-2 rounded-xl border px-2.5 py-3 transition-colors',
          disabled
            ? 'cursor-not-allowed border-neutral-200 bg-neutral-50'
            : file
              ? 'border-primary-500 border-neutral-300'
              : 'border-dashed border-neutral-300 hover:bg-neutral-100'
        )}
        onDrop={!disabled ? handleDrop : undefined}
        onDragOver={!disabled ? handleDragOver : undefined}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
          disabled={disabled}
        />

        {file ? (
          <div className="flex w-full items-center justify-start gap-1">
            <UploadIconPrimary className={disabled ? 'opacity-50' : ''} />
            <p
              className={cn(
                'text-center text-[12px]',
                disabled ? 'text-neutral-400' : 'text-neutral-900'
              )}
            >
              {file instanceof File ? file.name : label}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start gap-1">
            <div className="flex items-center gap-1 max-lg:gap-2">
              <UploadDokumenIcon
                size={24}
                className={disabled ? 'opacity-50' : ''}
              />
              <p
                className={cn(
                  'text-center text-[12px] max-lg:text-left',
                  disabled ? 'text-neutral-400' : 'text-neutral-900'
                )}
              >
                {isMobile ? 'Unggah dokumen disini' : description}
              </p>
            </div>
            <p
              className={cn(
                'text-center text-[12px] max-lg:text-left',
                disabled ? 'text-neutral-400' : 'text-neutral-900'
              )}
            >
              mendukung tipe file: Jpeg, Jpg, PNG, PDF
            </p>
          </div>
        )}

        {!file && (
          <Button
            type="button"
            onClick={handleUploadClick}
            className={cn(
              'border-[2px] px-5 py-3',
              disabled
                ? 'cursor-not-allowed border-neutral-200 text-neutral-400 hover:bg-transparent'
                : 'border-primary-500'
            )}
            variant="outline"
            disabled={disabled}
          >
            Upload
          </Button>
        )}
        {file && (
          <div className="flex items-center gap-1">
            <div
              onClick={!disabled ? handleUploadClick : undefined}
              className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            >
              <EditIcon
                className={cn(
                  disabled ? 'text-neutral-300' : 'text-neutral-200'
                )}
              />
            </div>
            <div
              onClick={!disabled ? handleRemoveFile : undefined}
              className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
            >
              <TrashIcon
                className={cn(
                  disabled ? 'text-neutral-300' : 'text-neutral-200'
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { CircleArrowRight, FileText, X, ZoomIn } from 'lucide-react'
import React, { useState } from 'react'

interface ConfirmationDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
  formData: any
  uploadedFiles: {
    kk: File | string | null
    ktp: File | string | null
    passport: File | string | null
    userPhoto: File | string | null
  }
}

interface PreviewModalProps {
  isOpen: boolean
  onClose: () => void
  file: File | string | null
  title: string
  onOpen: any
}

const PreviewDrawer: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  file,
  title,
  onOpen,
}) => {
  if (!file) return null

  const getFileUrl = (file: File | string) => {
    if (typeof file === 'string') return file
    return URL.createObjectURL(file)
  }

  const getFileType = (file: File | string) => {
    if (typeof file === 'string') {
      return file.toLowerCase().includes('.pdf') ? 'pdf' : 'image'
    }
    return file.type.startsWith('image/') ? 'image' : 'pdf'
  }

  const fileType = getFileType(file)
  const fileUrl = getFileUrl(file)

  const renderPdfViewer = () => {
    // Langsung buka PDF di tab baru karena preview iframe sering bermasalah
    return (
      <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4 rounded-lg border bg-gray-50">
        <FileText className="h-16 w-16 text-gray-400" />
        <div className="text-center">
          <p className="mb-2 text-lg font-medium text-gray-900">
            File PDF Siap Dibuka
          </p>
          <p className="mb-4 text-sm text-gray-600">
            Klik tombol di bawah untuk membuka atau mendownload file PDF
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                window.open(fileUrl, '_blank')
                // Tutup drawer setelah membuka PDF
                onOpen(true)
                onClose()
              }}
              className="text-sm"
            >
              Buka PDF
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                const link = document.createElement('a')
                link.href = fileUrl
                link.download = title
                link.click()
              }}
              className="text-sm"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onOpen(true)
          onClose()
          // Clean up object URL jika file adalah File object
          if (typeof file !== 'string') {
            URL.revokeObjectURL(fileUrl)
          }
        }
      }}
    >
      <DrawerContent className="mx-auto max-h-[90vh] max-w-4xl gap-0 overflow-y-auto rounded-t-2xl bg-white p-0">
        <DrawerHeader className="flex items-center justify-between border-b p-4">
          <DrawerTitle className="text-lg font-semibold">{title}</DrawerTitle>
          <button
            onClick={() => {
              onOpen(true)
              onClose()
            }}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </DrawerHeader>
        <div className="max-h-[80vh] overflow-auto p-4">
          {fileType === 'image' ? (
            <img
              src={fileUrl}
              alt={title}
              className="h-auto max-w-full rounded-lg"
              onError={(e) => {
                console.error('Image failed to load:', e)
              }}
            />
          ) : (
            renderPdfViewer()
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

const FilePreview: React.FC<{
  file: File | string | null
  label: string
  onClick: () => void
}> = ({ file, label, onClick }) => {
  if (!file) {
    return (
      <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200">
          <FileText className="h-6 w-6 text-gray-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{label}</p>
        </div>
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-700">
          Belum
        </span>
      </div>
    )
  }

  const getFileUrl = (file: File | string) => {
    if (typeof file === 'string') return file
    return URL.createObjectURL(file)
  }

  const getFileType = (file: File | string) => {
    if (typeof file === 'string') {
      return file.toLowerCase().includes('.pdf') ? 'pdf' : 'image'
    }
    return file.type.startsWith('image/') ? 'image' : 'pdf'
  }

  const fileType = getFileType(file)
  const fileUrl = getFileUrl(file)

  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="group relative h-12 w-12 overflow-hidden rounded-lg border bg-white">
        {fileType === 'image' ? (
          <>
            <img
              src={fileUrl}
              alt={label}
              className="h-full w-full object-cover"
            />
            <div className="bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black transition-all">
              <ZoomIn className="h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FileText className="h-6 w-6 text-red-600" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {fileType === 'pdf' && (
          <p className="text-xs text-gray-500">PDF Document</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded px-2 py-1 text-xs text-neutral-900">
          Lihat File
        </button>
        <CircleArrowRight />
      </div>
    </div>
  )
}

const ConfirmationDrawer: React.FC<ConfirmationDrawerProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  isLoading = false,
  formData,
  uploadedFiles,
}) => {
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean
    file: File | string | null
    title: string
  }>({
    isOpen: false,
    file: null,
    title: '',
  })

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const handleFilePreview = (file: File | string | null, title: string) => {
    if (!file) return

    const getFileType = (file: File | string) => {
      if (typeof file === 'string') {
        return file.toLowerCase().includes('.pdf') ? 'pdf' : 'image'
      }
      return file.type.startsWith('image/') ? 'image' : 'pdf'
    }

    const getFileUrl = (file: File | string) => {
      if (typeof file === 'string') return file
      return URL.createObjectURL(file)
    }

    const fileType = getFileType(file)

    // Jika PDF, langsung buka di tab baru
    if (fileType === 'pdf') {
      const fileUrl = getFileUrl(file)
      window.open(fileUrl, '_blank')
      return
    }

    // Jika gambar, buka drawer preview
    setPreviewModal({
      isOpen: true,
      file,
      title,
    })
  }

  const closePreview = () => {
    setPreviewModal({
      isOpen: false,
      file: null,
      title: '',
    })
  }

  return (
    <>
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 py-2.5">
          {/* Header */}
          <DrawerHeader className="p-6 pb-4">
            <div className="flex flex-col gap-3 p-0 text-left">
              <div className="flex items-center justify-between">
                <DrawerTitle>
                  <p className="text-m-semibold">Apakah datanya sudah benar?</p>
                </DrawerTitle>

                <X onClick={onCancel} />
              </div>
              <DrawerDescription className="text-m-regular text-left text-neutral-600">
                Data ini akan segera terkirim kepada pihak mitra untuk proses
                administrasi dan keperluan mitra.
              </DrawerDescription>
            </div>
          </DrawerHeader>

          {/* Content */}
          <div className="overflow-y-auto px-6 pb-6">
            {/* Personal Info - Two Column Layout */}
            <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
              <div>
                <span className="text-gray-500">Nama Jemaah</span>
                <div className="font-medium text-gray-900">
                  {formData.name || '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Nomor Telepon</span>
                <div className="font-medium text-gray-900">
                  {formData.phoneNumber ? `+62${formData.phoneNumber}` : '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">NIK</span>
                <div className="font-medium text-gray-900">
                  {formData.nik || '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Jenis Kelamin</span>
                <div className="font-medium text-gray-900">
                  {formData.gender || '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Tempat Lahir</span>
                <div className="font-medium text-gray-900">
                  {formData.placeBorn || '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Tanggal Lahir</span>
                <div className="font-medium text-gray-900">
                  {formatDate(formData.born)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Kota Asal</span>
                <div className="font-medium text-gray-900">
                  {formData.hometown || '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Alamat</span>
                <div className="font-medium text-gray-900">
                  {formData.address || '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Nomor Paspor</span>
                <div className="font-medium text-gray-900">
                  {formData.passportNumber || '-'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Masa Berlaku Paspor</span>
                <div className="font-medium text-gray-900">
                  {formatDate(formData.passportExpiredAt)}
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="mb-2 space-y-3">
              <div className="mb-2 text-xs text-gray-500">Foto Paspor</div>
              <FilePreview
                file={uploadedFiles.passport}
                label="Paspor Jemaah 1"
                onClick={() => {
                  onOpenChange(false)
                  handleFilePreview(uploadedFiles.passport, 'Paspor Jemaah 1')
                }}
              />

              <div className="mt-4 mb-2 text-xs text-gray-500">
                Pas Foto (Latar Belakang Putih)
              </div>
              <FilePreview
                file={uploadedFiles.userPhoto}
                label="Pas Foto Jemaah 1"
                onClick={() => {
                  onOpenChange(false)
                  handleFilePreview(
                    uploadedFiles.userPhoto,
                    'Pas Foto Jemaah 1'
                  )
                }}
              />

              <div className="mt-4 mb-2 text-xs text-gray-500">Foto KTP</div>
              <FilePreview
                file={uploadedFiles.ktp}
                label="Foto KTP Jemaah 1"
                onClick={() => {
                  onOpenChange(false)
                  handleFilePreview(uploadedFiles.ktp, 'Foto KTP Jemaah 1')
                }}
              />

              <div className="mt-4 mb-2 text-xs text-gray-500">Foto KK</div>
              <FilePreview
                file={uploadedFiles.kk}
                label="Foto KK Jemaah 1"
                onClick={() => {
                  onOpenChange(false)
                  handleFilePreview(uploadedFiles.kk, 'Foto KK Jemaah 1')
                }}
              />
            </div>

            {/* Action Buttons */}
            <DrawerFooter>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1 border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Belum, Cek lagi
                </Button>
                <Button
                  onClick={onConfirm}
                  className="flex-1 bg-yellow-500 text-sm text-white hover:bg-yellow-600"
                  disabled={isLoading}
                >
                  {isLoading ? 'Menyimpan...' : 'Ya, Simpan'}
                </Button>
              </div>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Preview Drawer */}
      <PreviewDrawer
        isOpen={previewModal.isOpen}
        onClose={closePreview}
        onOpen={onOpenChange}
        file={previewModal.file}
        title={previewModal.title}
      />
    </>
  )
}

// Custom hook to manage confirmation drawer
export function useConfirmSubmitDrawer() {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpen,
    setIsOpen,
  }
}

export function ConfirmSubmitDrawer({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  isLoading = false,
  formData,
  uploadedFiles,
}: ConfirmationDrawerProps) {
  return (
    <ConfirmationDrawer
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
      formData={formData}
      uploadedFiles={uploadedFiles}
    />
  )
}

export default ConfirmationDrawer

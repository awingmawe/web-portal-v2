/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertCircle,
  CircleArrowRight,
  FileText,
  X,
  ZoomIn,
} from 'lucide-react'
import React, { useState } from 'react'

interface ConfirmationModalProps {
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

const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  file,
  title,
  onOpen,
}) => {
  if (!isOpen || !file) return null

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
    <div className="bg-opacity-75 fixed inset-0 z-[99999] flex items-center justify-center bg-black">
      <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={() => {
              onOpen(true)
              onClose()
            }}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[80vh] overflow-auto p-4">
          {fileType === 'image' ? (
            <img
              src={fileUrl}
              alt={title}
              className="h-auto max-w-full rounded-lg"
            />
          ) : (
            <iframe
              src={fileUrl}
              className="h-[70vh] w-full rounded-lg border"
              title={title}
            />
          )}
        </div>
      </div>
    </div>
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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
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
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="mx-auto max-h-[90vh] max-w-lg gap-0 overflow-y-auto rounded-2xl bg-white p-0">
          {/* Header */}
          <DialogHeader className="p-6 pb-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex-1">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Apakah data jemaah yang diisi sudah benar?
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="px-6 pb-6">
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
            <div className="mb-6 space-y-3">
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
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModal.isOpen}
        onClose={closePreview}
        onOpen={onOpenChange}
        file={previewModal.file}
        title={previewModal.title}
      />
    </>
  )
}

export default ConfirmationModal

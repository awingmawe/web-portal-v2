/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { ChevronIcon } from '@/components/icons/chevron'
import { FilterSquare } from '@/components/icons/filter'
import KotaAsalCombobox from '@/components/pages/manifest/3-FormManifest/KotaAsal'
import TriggerCalendar from '@/components/pages/manifest/3-FormManifest/TriggerCalendar'
import { FileUpload } from '@/components/pages/manifest/3-FormManifest/UploadDokumen'
import CompletionDialog from '@/components/pages/manifest/dialog/dialogComplate'
import ConfirmationModal from '@/components/pages/manifest/dialog/dialogConfirmation'
import {
  ConfirmSubmitDrawer,
  useConfirmSubmitDrawer,
} from '@/components/pages/manifest/mobile/DrawerConfirmation'
import {
  SubmissionDialogOrDrawer,
  useSubmissionDrawer,
} from '@/components/pages/manifest/mobile/DrawerStatus'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from '@/components/ui/sonner'
import { Textarea } from '@/components/ui/textarea'
import {
  defaultValueManifest,
  formSchemaManifest,
} from '@/constant/schema/manifest'
import { useManifest } from '@/contexts/manifest-context/context'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import {
  postManfestCommited,
  updateDataManifest,
  uploadDokumen,
} from '@/services/umrah-service'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { CalendarDays } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { z } from 'zod'

export default function BiodataForm({
  idBooking,
  getDetailBooking,
  dataJemaah,
}: {
  idBooking: number
  getDetailBooking: any
  dataJemaah: any
}) {
  const { manifestActive, setManifestActive } = useManifest()
  const [loading, setLoading] = useState(false)
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [isDesktopConfirmOpen, setIsDesktopConfirmOpen] = useState(false)
  const [noKTP, setNoKTP] = useState(false) // State untuk checkbox "Belum memiliki KTP"
  const router = useRouter()
  const { lg } = useTailwindBreakpoint()
  const [selectedRoomtypeMobile, setSelectedRoomtypeMobile] = useState<
    string | ''
  >('')
  const [showCompletionDialog, setShowCompletionDialog] = useState(false)
  // State for file uploads (separate from form)
  const [uploadedFiles, setUploadedFiles] = useState({
    kk: null as File | any | null,
    ktp: null as File | any | null,
    passport: null as File | any | null,
    userPhoto: null as File | any | null,
  })
  const handleOpenDrawer = () => {
    const current = form.getValues('roomtype')
    const quantity =
      roomTypeQuantity[current as keyof typeof roomTypeQuantity] || 0
    const selectedCount = getSelectedRoomTypeCount(current)
    const remainingQuota = quantity - selectedCount

    if (remainingQuota <= 0) {
      setSelectedRoomtypeMobile('') // Reset karena sudah tidak tersedia
    } else {
      setSelectedRoomtypeMobile(current) // Masih tersedia, gunakan sebagai default
    }
  }
  const beforeUnloadHandler = (event: {
    preventDefault: () => void
    returnValue: boolean
  }) => {
    // Recommended
    event.preventDefault()

    // Included for legacy support, e.g. Chrome/Edge < 119
    event.returnValue = true
  }

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadHandler)
    return () => {
      window.removeEventListener('beforeunload', beforeUnloadHandler)
    }
  }, [])

  const { isOpen: isConfirmOpen, setIsOpen: setConfirmOpen } =
    useConfirmSubmitDrawer()

  const {
    isOpen: isSubmissionOpen,
    setIsOpen: setSubmissionOpen,
    state: submissionState,
    setState: setSubmissionState,
    errorMessage,
    setErrorMessage,
  } = useSubmissionDrawer()

  // Define your form
  const form = useForm<z.infer<typeof formSchemaManifest>>({
    resolver: zodResolver(formSchemaManifest),
    defaultValues: defaultValueManifest,
  })

  // Update form values when manifestActive changes
  useEffect(() => {
    if (manifestActive && manifestActive.id) {
      // console.log(manifestActive)

      // Create values object from manifestActive
      const manifestValues = {
        name: manifestActive.name || '',
        nik: manifestActive.nik || '',
        phoneNumber: manifestActive.phoneNumber || '',
        email: manifestActive.email || '',
        gender: manifestActive.gender || 'male',
        placeBorn: manifestActive.placeBorn || '',
        born: manifestActive.born || '',
        hometown: manifestActive.hometown || '',
        passportNumber: manifestActive.passportNumber || '',
        passportExpiredAt: manifestActive.passportExpiredAt || '',
        roomtype: manifestActive.roomType || '',
        address: manifestActive.address || '',
      }

      // Reset form with manifest values
      form.reset(manifestValues)

      if (
        manifestActive.attachment &&
        Array.isArray(manifestActive.attachment) &&
        manifestActive.attachment.length > 0
      ) {
        // Get all attachments
        const kkAttachment = manifestActive.attachment.find(
          (attachment) => attachment.type === 'kk'
        )
        const ktpAttachment = manifestActive.attachment.find(
          (attachment) => attachment.type === 'ktp'
        )
        const passportAttachment = manifestActive.attachment.find(
          (attachment) => attachment.type === 'passport'
        )
        const userPhotoAttachment = manifestActive.attachment.find(
          (attachment) => attachment.type === 'user-photo'
        )

        // Update state with found attachments
        setUploadedFiles({
          kk: kkAttachment ? kkAttachment.src : null,
          ktp: ktpAttachment ? ktpAttachment.src : null,
          passport: passportAttachment ? passportAttachment.src : null,
          userPhoto: userPhotoAttachment ? userPhotoAttachment.src : null,
        })
      } else {
        setUploadedFiles({
          kk: null,
          ktp: null,
          passport: null,
          userPhoto: null,
        })
      }
    }
  }, [manifestActive, form])

  // File change handlers
  const handleKKChange = (file: File | string | null) => {
    setUploadedFiles((prev) => ({ ...prev, kk: file }))
  }

  const handleKTPChange = (file: File | string | null) => {
    setUploadedFiles((prev) => ({ ...prev, ktp: file }))
  }

  const handlePassportChange = (file: File | string | null) => {
    setUploadedFiles((prev) => ({ ...prev, passport: file }))
  }

  const handleUserPhotoChange = (file: File | string | null) => {
    setUploadedFiles((prev) => ({ ...prev, userPhoto: file }))
  }

  const checkAllJemaahReadyToComplete = (
    dataJemaah: any[],
    currentManifestId: number
  ) => {
    if (!dataJemaah || dataJemaah.length === 0) return false

    // Urutkan berdasarkan ID atau kriteria lain jika perlu
    const sorted = [...dataJemaah].sort((a, b) => a.id - b.id)

    const lastJemaah = sorted[sorted.length - 1]

    // Pastikan jemaah terakhir adalah yang sedang aktif sekarang
    const isCurrentLast = lastJemaah.id === currentManifestId

    // Semua selain terakhir sudah submitted
    const othersAreSubmitted = sorted
      .slice(0, -1)
      .every((j) => j.submitted || j.isCompleted)

    // Return true kalau syarat terpenuhi
    return isCurrentLast && othersAreSubmitted
  }

  const checkAllJemaahAllComplete = (dataJemaah: any[]) => {
    if (!dataJemaah || dataJemaah.length === 0) return false

    const allSubmitted = dataJemaah.every(
      (jemaah) => jemaah.submitted === true || jemaah.isCompleted === true
    )
    // Return true kalau syarat terpenuhi
    return allSubmitted
  }
  async function onSubmit(values: z.infer<typeof formSchemaManifest>) {
    // If we're already submitting, don't show confirmation again
    if (formSubmitting) {
      await performSubmit(values)
      return
    }

    // On mobile, show confirmation drawer first
    if (lg) {
      const shouldShowCompletionDialog = checkAllJemaahAllComplete(dataJemaah)
      if (shouldShowCompletionDialog) {
        setShowCompletionDialog(true)
      } else {
        setConfirmOpen(true)
      }
    } else {
      const shouldShowCompletionDialog = checkAllJemaahAllComplete(dataJemaah)
      if (shouldShowCompletionDialog) {
        setShowCompletionDialog(true)
      } else {
        setIsDesktopConfirmOpen(true)
      }
    }
  }

  // Define a submit handler
  async function performSubmit(values: z.infer<typeof formSchemaManifest>) {
    if (lg) {
      setConfirmOpen(false) // Close confirmation drawer
      setFormSubmitting(true)
    } else {
      setLoading(true)
    }

    const request = {
      name: values?.name ?? '',
      phoneNumber: `+62${values?.phoneNumber}`,
      address: values?.address ?? '',
      email: values?.email ?? '',
      nik: values?.nik ?? '',
      born: values?.born ?? '',
      placeBorn: values?.placeBorn ?? null,
      hometown: values?.hometown ?? '',
      passportNumber: values?.passportNumber ?? '',
      passportExpiredAt: values?.passportExpiredAt,
      medicalHistory: '',
      roomType: values.roomtype,
      gender: values?.gender ?? 'male',
      bookingId: Number(idBooking),
    }

    try {
      const response = await updateDataManifest(manifestActive.id, request)

      // Handle file uploads
      const uploadPromises = []

      if (uploadedFiles.kk) {
        uploadPromises.push(
          uploadDokumen(uploadedFiles.kk, 'kk', manifestActive.id)
        )
      }

      if (uploadedFiles.ktp) {
        uploadPromises.push(
          uploadDokumen(uploadedFiles.ktp, 'ktp', manifestActive.id)
        )
      }

      if (uploadedFiles.passport) {
        uploadPromises.push(
          uploadDokumen(uploadedFiles.passport, 'passport', manifestActive.id)
        )
      }

      if (uploadedFiles.userPhoto) {
        uploadPromises.push(
          uploadDokumen(
            uploadedFiles.userPhoto,
            'user-photo',
            manifestActive.id
          )
        )
      }

      setManifestActive(response.updated)
      await Promise.all(uploadPromises)

      const shouldShowCompletionDialog = checkAllJemaahReadyToComplete(
        dataJemaah,
        manifestActive.id
      )
      if (shouldShowCompletionDialog) {
        // Show completion dialog instead of success message
        if (lg) {
          setShowCompletionDialog(true)
        } else {
          // Show completion dialog for mobile
          setShowCompletionDialog(true) // You'll need to add this state
        }
      } else {
        toast.success('Data berhasil diperbarui!')
        setLoading(false)
      }
    } catch (error: any) {
      const errorMsg =
        error?.message ??
        'Terjadi kesalahan saat memperbarui data. Silakan coba lagi.'

      if (lg) {
        setErrorMessage(errorMsg)
        setSubmissionState('error')
      } else {
        toast.error(errorMsg)
        setLoading(false)
      }
    } finally {
      if (lg) {
        setLoading(false)
      }
      router.refresh()
      setFormSubmitting(false)
    }
  }

  // Input validation functions for numbers only
  const handleNumberOnly = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/\D0/g, '')
    e.target.value = value
    return value
  }

  // Handle confirmation actions
  const handleConfirmSubmit = () => {
    form.handleSubmit(performSubmit)()
  }

  const handleCancelSubmit = () => {
    setConfirmOpen(false)
  }

  // Handle retry action for mobile drawer
  const handleRetry = () => {
    form.handleSubmit(onSubmit)()
  }

  // Handle close action for mobile drawer
  const handleDrawerClose = () => {
    setSubmissionOpen(false)
  }
  const roomTypeQuantity = getDetailBooking?.roomTypeQuantity || {
    quad: 0,
    double: 0,
    triple: 0,
  }

  const getRoomTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      double: 'Double',
      triple: 'Triple',
      quad: 'Quad',
    }
    return labels[type] || type
  }

  // Define room type order
  const roomTypeOrder = ['double', 'triple', 'quad']
  const getRoomDescription = (type: string): string => {
    const descriptions: Record<string, string> = {
      double: '1 kamar berdua',
      triple: '1 kamar bertiga',
      quad: '1 kamar berempat',
    }
    return descriptions[type] || type
  }

  const getSelectedRoomTypeCount = (roomType: string): number => {
    if (!dataJemaah) return 0
    return dataJemaah.filter((jemaah: any) => jemaah.roomType === roomType)
      .length
  }

  const handleDesktopConfirmSubmit = () => {
    setIsDesktopConfirmOpen(false)
    form.handleSubmit(performSubmit)()
  }

  const handleDesktopCancelSubmit = () => {
    setIsDesktopConfirmOpen(false)
  }

  const roomTypeWatch = form.watch('roomtype')
  // Handle checkbox change for "Belum memiliki KTP"
  const handleNoKTPChange = (checked: boolean) => {
    setNoKTP(checked)
    if (checked) {
      // Clear KTP file when checkbox is checked
      setUploadedFiles((prev) => ({ ...prev, ktp: null }))
    }
  }
  return (
    <>
      <ConfirmationModal
        isOpen={isDesktopConfirmOpen}
        onOpenChange={setIsDesktopConfirmOpen}
        onConfirm={handleDesktopConfirmSubmit}
        onCancel={handleDesktopCancelSubmit}
        isLoading={formSubmitting}
        formData={form.getValues()}
        uploadedFiles={uploadedFiles}
      />
      <SubmissionDialogOrDrawer
        isOpen={isSubmissionOpen}
        onOpenChange={setSubmissionOpen}
        state={submissionState}
        errorMessage={errorMessage}
        onRetry={handleRetry}
        onClose={handleDrawerClose}
      />
      <ConfirmSubmitDrawer
        isOpen={isConfirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
        isLoading={formSubmitting}
        formData={form.getValues()}
        uploadedFiles={uploadedFiles}
      />
      <CompletionDialog
        isOpen={showCompletionDialog}
        // onOpenChange={}
        onOpenChange={setShowCompletionDialog}
        onConfirm={async () => {
          try {
            await postManfestCommited(idBooking)
            setShowCompletionDialog(false)
            setSubmissionOpen(true)
            setSubmissionState('success')
          } catch (error) {
            console.log(error)
          }
        }}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-6"
        >
          <div className="bg-neutral-0 space-y-6 rounded-xl border border-neutral-100 p-8 max-lg:mb-4 max-lg:hidden max-lg:px-5">
            <h2 className="text-l-semibold mb-6">Pilih Kamar</h2>

            <FormField
              control={form.control}
              name="roomtype"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                    Tipe Kamar <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full rounded-full border border-neutral-200 py-5 shadow-none">
                        <SelectValue placeholder="Pilih tipe kamar">
                          {field.value
                            ? getRoomTypeLabel(field.value)
                            : 'Pilih tipe kamar'}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border border-neutral-200">
                      {roomTypeOrder.map((type) => {
                        const quantity =
                          roomTypeQuantity[
                            type as keyof typeof roomTypeQuantity
                          ] || 0
                        const numQuantity = Number(quantity)

                        const selectedCount = getSelectedRoomTypeCount(type)
                        const remainingQuota = numQuantity - selectedCount
                        const isDisabled = remainingQuota <= 0
                        return (
                          <SelectItem
                            key={type}
                            value={type}
                            disabled={isDisabled}
                            className={`${isDisabled ? 'opacity-50' : ''}`}
                          >
                            <div className="flex flex-col">
                              <span
                                className={`font-medium ${isDisabled ? 'text-neutral-400' : 'text-neutral-900'}`}
                              >
                                {getRoomTypeLabel(type)} (
                                {getRoomDescription(type)})
                              </span>
                              <span
                                className={`text-sm ${isDisabled ? 'text-neutral-400' : 'text-neutral-500'}`}
                              >
                                {isDisabled
                                  ? 'Tidak tersedia'
                                  : `Sisa ${numQuantity - selectedCount} Kuota`}
                              </span>
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="bg-neutral-0 space-y-6 rounded-xl border border-neutral-100 p-8 max-lg:mb-4 lg:hidden">
            <h2 className="text-l-semibold mb-6 ">Pilih Kamar</h2>
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  onClick={handleOpenDrawer}
                  className="flex w-full items-center justify-between gap-2 rounded-full border border-neutral-200 px-3 py-2.5 text-left"
                >
                  {roomTypeWatch
                    ? getRoomTypeLabel(roomTypeWatch)
                    : 'Pilih Tipe Kamar'}
                  <ChevronIcon />
                </button>
              </DrawerTrigger>
              <DrawerContent className="z-100 border-0 outline-0">
                <DrawerHeader className="p-3">
                  <DrawerTitle className="flex items-center">
                    <FilterSquare />
                    <p className="text-m-semibold ml-2 font-semibold">
                      Pilih Tipe Kamar
                    </p>
                  </DrawerTitle>
                </DrawerHeader>

                <div className="space-y-2 overflow-y-auto px-4 pb-4 text-sm">
                  <RadioGroup
                    value={selectedRoomtypeMobile}
                    onValueChange={(value) => setSelectedRoomtypeMobile(value)}
                  >
                    {roomTypeOrder.map((type) => {
                      const quantity =
                        roomTypeQuantity[
                          type as keyof typeof roomTypeQuantity
                        ] || 0
                      const selectedCount = getSelectedRoomTypeCount(type)
                      const remainingQuota = quantity - selectedCount
                      const isDisabled = remainingQuota <= 0

                      return (
                        <div
                          key={type}
                          className="flex items-center space-x-2 border-t border-neutral-100 pt-2"
                        >
                          <RadioGroupItem
                            value={type}
                            id={`roomtype-${type}`}
                            className="peer h-4 w-4 border border-neutral-300 peer-disabled:border-neutral-300 peer-disabled:bg-neutral-100 disabled:bg-neutral-100"
                            disabled={isDisabled}
                          />
                          <label
                            htmlFor={`roomtype-${type}`}
                            className={`text-s-regular ml-1 flex cursor-pointer ${
                              isDisabled ? 'text-neutral-400' : ''
                            }`}
                          >
                            {getRoomTypeLabel(type)} ({getRoomDescription(type)}
                            ) –{' '}
                            {isDisabled
                              ? 'Tidak tersedia'
                              : `Sisa ${remainingQuota} kuota`}
                          </label>
                        </div>
                      )
                    })}
                  </RadioGroup>
                </div>

                <div className="flex w-full px-3 pt-3 pb-5">
                  <DrawerClose className="mr-3 w-full" asChild>
                    <Button
                      variant="outline"
                      type="button"
                      className="border-primary-500 w-full border-2 py-3"
                    >
                      Batal
                    </Button>
                  </DrawerClose>
                  <DrawerClose className="w-full" asChild>
                    <Button
                      className="w-full py-3"
                      type="button"
                      onClick={() => {
                        if (selectedRoomtypeMobile) {
                          form.setValue('roomtype', selectedRoomtypeMobile)
                        }
                      }}
                    >
                      Simpan
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          <div className="bg-neutral-0 space-y-6 rounded-xl border border-neutral-100 p-8 max-lg:mb-4  max-lg:px-5">
            <div className="flex items-center justify-between">
              <h2 className="text-l-semibold mb-0">KTP</h2>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="no-ktp"
                  checked={noKTP}
                  onCheckedChange={handleNoKTPChange}
                  className="mt-2 h-4 w-4"
                />
                <label
                  htmlFor="no-ktp"
                  className="cursor-pointer text-sm font-medium text-neutral-700"
                >
                  Belum memiliki KTP
                </label>
              </div>
            </div>

            {/* Pas Foto Upload */}
            <FileUpload
              label="Foto KTP"
              required={!noKTP}
              onChange={handleKTPChange}
              value={uploadedFiles.ktp}
              disabled={noKTP}
            />
          </div>

          <div className="bg-neutral-0 space-y-6 rounded-xl border border-neutral-100 p-8 max-lg:px-5">
            <h2 className="text-l-semibold mb-6">Biodata</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Nama Lengkap */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s-medium text-neutral-900">
                      Nama Lengkap <span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NIK */}
              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s-medium text-neutral-900">
                      NIK <span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan NIK"
                        maxLength={16}
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          const value = handleNumberOnly(e)
                          field.onChange(value)
                        }}
                        value={field.value}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Nomor Telepon */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s-medium text-neutral-900">
                      Nomor Telepon <span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <p className="text-m-regular absolute left-3 flex items-center text-neutral-500">
                          +62
                        </p>
                        <Input
                          className="pl-11"
                          placeholder="85867467367"
                          type="tel"
                          maxLength={17}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          onChange={(e) => {
                            // Remove any existing prefix if user manually types it
                            let value = e.target.value.replace(/^\+?62/, '')
                            // Apply handleNumberOnly to clean the input
                            value = handleNumberOnly({
                              ...e,
                              target: { ...e.target, value },
                            })
                            // Store the value without the prefix in the form
                            field.onChange(value)
                          }}
                          value={field.value.replace(/^\+?62/, '')}
                          onBlur={field.onBlur}
                          name={field.name}
                          ref={field.ref}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s-medium text-neutral-900">
                      Email <span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Jenis Kelamin */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s-medium text-neutral-900">
                      Jenis Kelamin <span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex w-full flex-row gap-4"
                      >
                        <FormItem className="flex w-full items-center rounded-full border border-neutral-200 px-4 py-2.5">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel className="font-normal">Pria</FormLabel>
                        </FormItem>
                        <FormItem className="flex w-full items-center rounded-full border border-neutral-200 px-4 py-2.5">
                          <FormControl>
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel className="font-normal">Wanita</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tempat Lahir */}
              <FormField
                control={form.control}
                name="placeBorn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s-medium text-neutral-900">
                      Tempat Lahir
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan tempat lahir"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal Lahir */}
              <FormField
                control={form.control}
                name="born"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-s-medium text-neutral-900">
                      Tanggal Lahir <span className="text-error-500">*</span>
                    </FormLabel>
                    <TriggerCalendar field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kota Asal Combobox */}
              <KotaAsalCombobox control={form.control} />
            </div>

            {/* Alamat (full width) */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-s-medium text-neutral-900">
                    Alamat
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan alamat"
                      className="bg-neutral-0"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-neutral-0 space-y-6 rounded-xl border border-neutral-100 p-8 max-lg:px-5">
            <h2 className="text-l-semibold mb-6">Data Paspor Jemaah</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Nomor Paspor */}
              <FormField
                control={form.control}
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-s-medium text-neutral-900">
                      Nomor Paspor <span className="text-error-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan nomor paspor"
                        {...field}
                        maxLength={16}
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                          const value = handleNumberOnly(e)
                          field.onChange(value)
                        }}
                        value={field.value}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tanggal Expired Paspor */}
              <FormField
                control={form.control}
                name="passportExpiredAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-s-medium text-neutral-900">
                      Masa berlaku paspor{' '}
                      <span className="text-error-500">*</span>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger
                        className={`flex w-full items-center justify-between rounded-full border border-neutral-200 px-4 py-2.5 text-left`}
                      >
                        <span
                          className={`
                          text-m-regular w-full text-left
                          ${!field.value && 'text-neutral-400'}
                        `}
                        >
                          {field.value
                            ? format(new Date(field.value), 'dd MMMM yyyy', {
                                locale: id,
                              })
                            : 'Pilih tanggal'}
                        </span>
                        <CalendarDays size={18} />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, 'yyyy-MM-dd') : ''
                            )
                          }
                          locale={id}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Paspor Upload */}
            <FileUpload
              label="Foto Paspor"
              required
              onChange={handlePassportChange}
              value={uploadedFiles.passport}
            />

            <div>
              <p className="text-s-regular">Catatan pengambilan foto:</p>
              <p className="text-s-regular">
                1. Foto harus bisa dibaca jelas dan tidak buram.
              </p>
              <p className="text-s-regular">2. Pastikan pencahayaan baik.</p>
              <p className="text-s-regular">
                3. Gunakan dokumen asli, bukan layar digital.
              </p>
              <p className="text-s-regular">
                4. Dokumen masih berlaku dan bukan fotokopi.
              </p>
            </div>
          </div>

          <div className="bg-neutral-0 space-y-6 rounded-xl border border-neutral-100 p-8 max-lg:mb-4  max-lg:px-5">
            <h2 className="text-l-semibold mb-6">Dokumen Lainnya</h2>

            {/* Pas Foto Upload */}
            <FileUpload
              label="Pas Foto Latar Belakang Putih"
              required
              value={uploadedFiles.userPhoto}
              onChange={handleUserPhotoChange}
            />

            {/* Pas Foto Upload */}
            <FileUpload
              label="Foto KK"
              required
              onChange={handleKKChange}
              value={uploadedFiles.kk}
            />

            <div>
              <p className="text-s-regular">Catatan pengambilan foto:</p>
              <p className="text-s-regular">
                1. Foto harus bisa dibaca jelas dan tidak buram.
              </p>
              <p className="text-s-regular">2. Pastikan pencahayaan baik.</p>
              <p className="text-s-regular">
                3. Gunakan dokumen asli, bukan layar digital.
              </p>
              <p className="text-s-regular">
                4. Dokumen masih berlaku dan bukan fotokopi.
              </p>
            </div>
          </div>

          <div className="max-lg:bg-neutral-0 flex justify-end max-lg:fixed max-lg:bottom-0 max-lg:w-full max-lg:p-3 max-lg:shadow-[0px_-4px_24px_0px_rgba(0,0,0,0.10)] max-lg:backdrop-blur">
            <Button
              className="mr-2 border border-[#F0143E] bg-white px-6 text-[#950823] hover:bg-[#F0143E]/10 max-lg:w-full max-lg:py-2"
              disabled={loading}
              isLoading={loading}
            >
              Atur Ulang
            </Button>
            <Button
              type="submit"
              className="px-6 max-lg:w-full max-lg:py-2"
              disabled={loading}
              isLoading={loading}
            >
              Simpan Data Jemaah
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

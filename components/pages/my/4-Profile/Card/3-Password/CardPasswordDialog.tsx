'use client'
import { EyeIcon, EyeSlashIcon } from '@/components/icons/eye'
import { PasswordIcon } from '@/components/icons/password'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const passwordSchema = ({ havePassword }: { havePassword: boolean }) =>
  z
    .object({
      oldPassword: havePassword
        ? z.string().min(8, { message: 'Kata sandi saat ini harus diisi' })
        : z.string().optional(),
      newPassword: z
        .string()
        .min(8, { message: 'Kata sandi baru harus diisi' })
        .refine(
          (val) => /[A-Z]/.test(val) && /[0-9]/.test(val) && /[a-z]/.test(val),
          {
            message:
              'Harap menggunakan minimal satu huruf kapital dan satu angka',
          }
        ),
      newPasswordConfirmation: z.string().min(8, {
        message:
          'Konfirmasi kata sandi baru harus diisi dan sama dengan kata sandi baru',
      }),
    })
    .refine((data) => data.newPassword === data.newPasswordConfirmation, {
      message: 'Password tidak sama harap lakukan pengecekan kembali',
      path: ['newPasswordConfirmation'],
    })

type PasswordFormValues = z.infer<ReturnType<typeof passwordSchema>>

interface PasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  havePassword: boolean
  isEditing?: boolean
  isLoading?: boolean
  defaultValues?: Partial<PasswordFormValues>
  onSubmit: (data: PasswordFormValues) => void
}

export default function PasswordDialog({
  open,
  onOpenChange,
  havePassword = false,
  isEditing = false,
  isLoading = false,
  onSubmit,
}: PasswordDialogProps) {
  const [showPasswordOld, setShowPasswordOld] = useState(false)
  const [showPasswordNew, setShowPasswordNew] = useState(false)
  const [showPasswordNewConfirmation, setShowPasswordNewConfirmation] =
    useState(false)

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema({ havePassword })),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    },
  })

  useEffect(() => {
    form.reset()
  }, [form, open])

  const handleSubmit = (data: PasswordFormValues) => {
    form.reset()
    onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-0 sm:max-w-xl">
        <DialogHeader className="gap-3 pb-2">
          <div className="flex items-center">
            <div className="flex">
              <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-md">
                <PasswordIcon className="h-7 w-7 text-yellow-600" />
              </div>
            </div>
            <div className="ml-5">
              <DialogTitle className="heading-3-semibold">
                {isEditing ? 'Ganti Password' : 'Tambah Password'}
              </DialogTitle>
              <p className="text-m-regular mt-1 text-neutral-500">
                {isEditing
                  ? 'Silakan masukkan password lama dan masukkan password baru'
                  : 'Silakan masukkan password'}
              </p>
            </div>
            <DialogClose asChild>
              <Button className="absolute top-3 right-3 h-6 w-6 bg-[#E5E5E5] py-0 hover:bg-neutral-500">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {havePassword && (
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                        Password Lama <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPasswordOld ? 'text' : 'password'}
                            placeholder="Masukkan kata sandi saat ini"
                            className="rounded-full py-3"
                          />
                          <Button
                            type="button"
                            variant={'ghost'}
                            onClick={() => setShowPasswordOld(!showPasswordOld)}
                            className="absolute top-1/2 right-3 -translate-y-1/2 transform px-1 py-1 text-sm text-neutral-300"
                          >
                            {showPasswordOld ? (
                              <EyeIcon className="text-neutral-300" />
                            ) : (
                              <EyeSlashIcon className="text-neutral-300" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )
                }}
              />
            )}

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                      Password <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPasswordNew ? 'text' : 'password'}
                          placeholder="Masukkan password"
                          className="rounded-full py-3"
                        />
                        <Button
                          type="button"
                          onClick={() => setShowPasswordNew(!showPasswordNew)}
                          variant={'ghost'}
                          className="absolute top-1/2 right-3 -translate-y-1/2 transform px-1 py-1 text-sm text-neutral-300"
                        >
                          {showPasswordNew ? (
                            <EyeIcon className="text-neutral-300" />
                          ) : (
                            <EyeSlashIcon className="text-neutral-300" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name="newPasswordConfirmation"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                      Konfirmasi password{' '}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={
                            showPasswordNewConfirmation ? 'text' : 'password'
                          }
                          placeholder="Masukkan kata sandi baru"
                          className="rounded-full py-3"
                        />
                        <Button
                          type="button"
                          variant={'ghost'}
                          onClick={() =>
                            setShowPasswordNewConfirmation(
                              !showPasswordNewConfirmation
                            )
                          }
                          className="absolute top-1/2 right-3 -translate-y-1/2 transform px-1 py-1 text-sm text-neutral-300"
                        >
                          {showPasswordNewConfirmation ? (
                            <EyeIcon className="text-neutral-300" />
                          ) : (
                            <EyeSlashIcon className="text-neutral-300" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )
              }}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 rounded-full bg-yellow-400 text-black hover:bg-yellow-500"
                isLoading={isLoading}
              >
                Lanjut
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

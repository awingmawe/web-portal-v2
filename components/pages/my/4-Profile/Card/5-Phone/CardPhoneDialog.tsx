'use client'
import { PhoneIcon } from '@/components/icons/phone'
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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const phoneNumberSchema = () =>
  z.object({
    phoneNumber: z
      .string()
      .regex(/^\+?\d{8,14}$/, { message: 'Nomor telepon tidak valid' }),
  })

type PhoneNumberFormValue = z.infer<ReturnType<typeof phoneNumberSchema>>

interface CardPhoneNumberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoading?: boolean
  defaultValues?: Partial<PhoneNumberFormValue>
  onSubmit: (data: PhoneNumberFormValue) => void
}

export default function CardPhoneNumberDialog({
  open,
  onOpenChange,
  isLoading = false,
  onSubmit,
}: CardPhoneNumberDialogProps) {
  const form = useForm<PhoneNumberFormValue>({
    resolver: zodResolver(phoneNumberSchema()),
    defaultValues: {
      phoneNumber: '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [form, open])

  const handleSubmit = (data: PhoneNumberFormValue) => {
    onSubmit(data)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-0 sm:max-w-xl">
        <DialogHeader className="gap-3 pb-2">
          <div className="flex items-center">
            <div className="flex">
              <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-md">
                <PhoneIcon className="h-7 w-7 text-yellow-600" />
              </div>
            </div>
            <div className="ml-5">
              <DialogTitle className="heading-3-semibold">
                Ganti Nomor Telepon Baru
              </DialogTitle>
              <p className="text-m-regular mt-1 text-neutral-500">
                Masukkan nomor telepon baru yang ingin kamu gunakan
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
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                      Nomor Telepon <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Masukkan nomor telepon"
                        className="rounded-full py-3"
                      />
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

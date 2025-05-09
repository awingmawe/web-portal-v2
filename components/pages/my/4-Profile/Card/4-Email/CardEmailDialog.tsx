'use client'
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const emailSchema = () =>
  z.object({
    email: z.string().email({ message: 'Alamat email tidak valid' }),
  })

type EmailFormValue = z.infer<ReturnType<typeof emailSchema>>

interface CardEmailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isLoading?: boolean
  defaultValues?: Partial<EmailFormValue>
  onSubmit: (data: EmailFormValue) => void
}

export default function CardEmailDialog({
  open,
  onOpenChange,
  isLoading = false,
  onSubmit,
}: CardEmailDialogProps) {
  const { lg } = useTailwindBreakpoint()
  const form = useForm<EmailFormValue>({
    resolver: zodResolver(emailSchema()),
    defaultValues: {
      email: '',
    },
  })

  useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [form, open])

  const handleSubmit = (data: EmailFormValue) => {
    onSubmit(data)
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Masukkan email"
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
  )

  const headerContent = (
    <div>
      {lg ? (
        <DrawerTitle className="text-m-semibold mb-2">
          Ganti Email Baru
        </DrawerTitle>
      ) : (
        <div className="flex items-center">
          <div className="flex">
            <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-md">
              <PasswordIcon className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
          <div className="ml-5">
            <DialogTitle className="heading-3-semibold">
              Ganti Email Baru
            </DialogTitle>
            <p className="text-m-regular mt-1 text-neutral-500">
              Masukkan email baru yang ingin kamu gunakan
            </p>
          </div>
        </div>
      )}
    </div>
  )

  if (lg) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-4 pb-6">
          <DrawerHeader className="gap-3 px-0 pb-2">
            {headerContent}
            <DrawerClose asChild>
              <Button
                className="absolute top-3 right-3 h-6 w-6  py-0 hover:bg-neutral-500"
                variant={'ghost'}
              >
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          {formContent}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border-0 sm:max-w-xl">
        <DialogHeader className="gap-3 pb-2">
          {headerContent}
          <DialogClose asChild>
            <Button className="absolute top-3 right-3 h-6 w-6 bg-[#E5E5E5] py-0 hover:bg-neutral-500">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}

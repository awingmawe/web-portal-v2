'use client'
import { CardPosIcon } from '@/components/icons/card-pos'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Facility } from '@/constant/types/FacilityProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import { getFacilityEnum } from '@/services/general-service'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

// Define the validation schema
const bankAccountSchema = z.object({
  bank: z.string().min(1, { message: 'Bank harus dipilih' }),
  accountNumber: z.string().min(5, { message: 'Nomor rekening tidak valid' }),
  accountName: z
    .string()
    .min(1, { message: 'Nama pemilik rekening harus diisi' }),
})

type BankAccountFormValues = z.infer<typeof bankAccountSchema>

interface BankAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isEditing?: boolean
  isLoading?: boolean
  defaultValues?: Partial<BankAccountFormValues>
  onSubmit: (data: BankAccountFormValues & { bankLogo?: string }) => void
}

export default function BankAccountResponsive({
  open,
  onOpenChange,
  isEditing = false,
  isLoading = false,
  defaultValues = {},
  onSubmit,
}: BankAccountDialogProps) {
  const { lg } = useTailwindBreakpoint()
  const form = useForm<BankAccountFormValues & { bankLogo?: string }>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      bank: defaultValues.bank || '',
      accountNumber: defaultValues.accountNumber || '',
      accountName: defaultValues.accountName || '',
    },
  })

  const [banks, setBanks] = useState<Facility[]>([])

  useEffect(() => {
    const fetchBanks = async () => {
      const banks = await getFacilityEnum('bank')
      setBanks(banks.results)
    }
    fetchBanks()
  }, [])

  useEffect(() => {
    form.reset()
  }, [form, open])

  const handleSubmit = (data: BankAccountFormValues) => {
    const selectedBank = banks.find((bank) => bank.name === data.bank)
    onSubmit({
      ...data,
      bankLogo: selectedBank?.image,
    })
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                Pilih Bank <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full rounded-full border border-neutral-200 py-5 shadow-none">
                    <SelectValue placeholder="Pilih bank rekening kamu" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border border-neutral-200">
                  {banks.map((bank) => (
                    <SelectItem key={bank.name} value={bank.name}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                Nomor Rekening <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan nomor rekening kamu"
                  className="rounded-full py-3"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-0 text-sm !font-normal text-neutral-800">
                Nama Pemilik Rekening <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Masukkan nama pemilik rekening"
                  className="rounded-full py-3"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
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
          {isEditing ? 'Ubah Data Rekening' : 'Tambah Rekening'}
        </DrawerTitle>
      ) : (
        <div className="flex items-center">
          <div className="flex">
            <div className="bg-primary-100 flex h-12 w-12 items-center justify-center rounded-md">
              <CardPosIcon className="h-7 w-7 text-yellow-600" />
            </div>
          </div>
          <div className="ml-5">
            <DialogTitle className="heading-3-semibold">
              {isEditing ? 'Ubah Data Rekening' : 'Tambah Rekening'}
            </DialogTitle>
            <p className="text-m-regular mt-1 text-neutral-500">
              Silakan masukkan data rekening kamu
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

import TriggerCalendar from '@/components/pages/manifest/3-FormManifest/TriggerCalendar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/sonner'
import { Textarea } from '@/components/ui/textarea'
import { Gender, Profile } from '@/contexts/auth/shared/type'
import { updateProfile } from '@/services/identity-service'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

// Define the validation schema
const personalFormSchema = z.object({
  name: z.string().min(1, { message: 'Nama harus diisi' }),
  gender: z.string().min(1, { message: 'Jenis kelamin harus dipilih' }),
  born: z.string({
    required_error: 'Tanggal lahir harus dipilih',
  }),
  address: z.string().min(1, { message: 'Alamat harus diisi' }),
})

// Define the form values type
type PersonalFormValues = z.infer<typeof personalFormSchema>

export default function CardProfile(props: { profile: Profile | undefined }) {
  const { profile } = props
  const [loading, setLoading] = useState(false)
  const defaultValues = useMemo(
    () => ({
      name: profile?.name ?? '',
      gender: profile?.persona?.gender ?? Gender.MALE,
      address: profile?.persona?.address ?? '',
      born: dayjs(profile?.persona?.born).format('YYYY-MM-DD'),
    }),
    [profile]
  )

  // Initialize the form
  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalFormSchema),
    defaultValues,
  })

  const watchedValues = useWatch({ control: form.control })

  const isChanged = useMemo(() => {
    return JSON.stringify(defaultValues) !== JSON.stringify(watchedValues)
  }, [defaultValues, watchedValues])

  // Handle form submission
  async function onSubmit(data: PersonalFormValues) {
    setLoading(true)
    try {
      await updateProfile({
        name: data.name,
        persona: {
          gender: data.gender as Gender,
          address: data.address,
          born: dayjs(data.born).format('YYYY-MM-DD'),
        },
      })
      toast.success('Profile updated successfully')
      setLoading(false)
    } catch (error) {
      console.error('Error update profile:', error)
      setLoading(false)
      toast.error('Failed to update profile')
    }
  }

  return (
    <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
      <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
        <CardTitle className="text-m-semibold">Data Personal</CardTitle>
      </CardHeader>
      <CardContent className="gap-0 space-y-4 px-4 pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-s-regular block">
                    Nama <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="disabled rounded-full"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-4 md:grid md:grid-cols-2 md:gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2 md:space-y-0">
                    <FormLabel className="text-s-regular block">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl className="flex items-center space-x-4">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                        disabled={loading}
                      >
                        <div className="flex w-full items-center rounded-full border border-neutral-200 px-6 py-2.5">
                          <RadioGroupItem
                            value="male"
                            id="male"
                            className="mr-2"
                            disabled={loading}
                          />
                          <label
                            htmlFor="male"
                            className="text-m-regular w-full cursor-pointer"
                          >
                            Pria
                          </label>
                        </div>
                        <div className="flex w-full items-center rounded-full border border-neutral-200 px-6 py-2.5">
                          <RadioGroupItem
                            value="female"
                            id="female"
                            className="mr-2"
                            disabled={loading}
                          />
                          <label
                            htmlFor="female"
                            className="text-m-regular w-full cursor-pointer"
                          >
                            Wanita
                          </label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="born"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2 md:space-y-0">
                    <FormLabel className="text-s-regular block">
                      Tanggal Lahir <span className="text-red-500">*</span>
                    </FormLabel>

                    <FormControl className="flex items-center">
                      <TriggerCalendar field={field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-s-regular block">
                    Alamat <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Masukkan Alamat"
                      className="min-h-[100px] rounded-2xl"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                className="rounded-full px-10 py-3 text-black max-lg:w-full"
                isLoading={loading}
                disabled={!isChanged || loading}
              >
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

'use client'

import { ChevronIcon } from '@/components/icons/chevron'
import { EditIcon } from '@/components/icons/edit'
import { PlusIcon } from '@/components/icons/plus'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { useState } from 'react'

export default function MyProfilePage() {
  const [name, setName] = useState('John Doe')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('Johndoeexample@example.com')
  const [phone, setPhone] = useState('+62 858-9087-1783')

  return (
    <div className="container mx-auto pb-3">
      <h1 className="text-l-medium mb-6">Pengaturan Akun</h1>

      {/* Personal Data Section */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <CardTitle className="text-m-semibold">Data Personal</CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-4 px-4 pt-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-s-regular block">
              Nama <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-full py-3"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-s-regular block block">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <RadioGroup
                value={gender}
                onValueChange={setGender}
                className="flex gap-4"
              >
                <div className="justify-left flex w-full items-center rounded-full border border-neutral-200 px-6 py-2.5">
                  <RadioGroupItem value="male" id="male" className="mr-2" />
                  <label
                    htmlFor="male"
                    className="text-m-regular w-full cursor-pointer"
                  >
                    Pria
                  </label>
                </div>
                <div className="justify-left flex w-full items-center rounded-full border border-neutral-200 px-6 py-2.5">
                  <RadioGroupItem value="female" id="female" className="mr-2" />
                  <label
                    htmlFor="female"
                    className="text-m-regular w-full cursor-pointer"
                  >
                    Wanita
                  </label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-s-regular block">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <span
                    id="birthDate"
                    className={cn(
                      'justify-left text-m-regular inline-flex w-full cursor-pointer items-center rounded-[100px] border border-neutral-200 bg-transparent px-3 py-2.5 text-left text-sm font-normal transition-all duration-300 ease-out hover:bg-neutral-100 focus-visible:outline-0 focus-visible:outline-none active:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50',
                      !birthDate && 'text-neutral-400'
                    )}
                  >
                    {birthDate ? (
                      dayjs(birthDate).locale('id').format('DD MMMM YYYY')
                    ) : (
                      <span className="text-m-regular flex w-full items-center justify-between text-neutral-400">
                        Belum dipilih
                        <ChevronIcon />
                      </span>
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-s-regular block">
              Alamat <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Masukkan Alamat"
              className="min-h-[100px] rounded-2xl"
            />
          </div>

          <div className="flex justify-end">
            <Button className="rounded-full px-10 py-3 text-black">
              Simpan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account Section */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <CardTitle className="text-m-semibold">Rekening Bank</CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-4 px-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">
              Belum ada rekening bank ditambahkan
            </p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
            >
              <PlusIcon className="h-4 w-4" /> Tambah Rekening
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <CardTitle className="text-m-semibold">Password</CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-4 px-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">
              Belum ada rekening bank ditambahkan
            </p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
            >
              <PlusIcon className="h-4 w-4" /> Tambah Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Section */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <CardTitle className="text-m-semibold flex items-center justify-between">
            <span>Email</span>
            <Badge
              variant="outline"
              className="rounded-full border-red-200 bg-red-100 px-3 py-1 text-xs text-red-500"
            >
              Belum Diverifikasi
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-4 px-4 pt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p>{email}</p>
            </div>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
            >
              <EditIcon className="h-4 w-4" /> Ganti Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Phone Number Section */}
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <CardTitle className="text-m-semibold">Nomor Telepon</CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-4 px-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">Nomor telepon belum diatur</p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
            >
              <PlusIcon className="h-4 w-4" /> Tambah No. Telpon
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-6 !gap-[0px] rounded-3xl border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <CardTitle className="text-m-semibold">Nomor Telepon</CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-4 px-4 pt-5">
          <div className="flex items-center justify-between">
            <p className="text-neutral-500">Nomor telepon belum diatur</p>
            <Button
              variant="ghost"
              className="text-l-medium gap-1 rounded-full border-gray-300 px-3 py-2"
            >
              <EditIcon className="h-4 w-4" /> Ganti Nomor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

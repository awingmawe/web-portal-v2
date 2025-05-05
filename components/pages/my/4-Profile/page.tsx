'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

export default function MyProfilePage() {
  const [name, setName] = useState('John Doe')
  const [gender, setGender] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('Johndoeexample@example.com')
  const [phone, setPhone] = useState('+62 858-9087-1783')

  return (
    <div className="container mx-auto pb-3">
      <h1 className="text-l-medium mb-6">Pengaturan Akun</h1>

      {/* Personal Data Section */}
      <Card className="mb-6 !gap-0 border border-neutral-200 !pt-3 shadow-none">
        <CardHeader className="pt border-b border-neutral-200 px-5 !pb-2">
          <CardTitle className="text-m-semibold">Data Personal</CardTitle>
        </CardHeader>
        <CardContent className="gap-0 space-y-4 p-5 px-4">
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
              <label htmlFor="gender" className="block text-sm">
                Jenis Kelamin <span className="text-red-500">*</span>
              </label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Belum dipilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Laki-laki</SelectItem>
                  <SelectItem value="female">Perempuan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate" className="block text-sm">
                Tanggal Lahir <span className="text-red-500">*</span>
              </label>
              <Select value={birthDate} onValueChange={setBirthDate}>
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Belum dipilih" />
                </SelectTrigger>
                <SelectContent>
                  {/* Generate date options dynamically in a real app */}
                  <SelectItem value="2000-01-01">1 Januari 2000</SelectItem>
                  <SelectItem value="2000-01-02">2 Januari 2000</SelectItem>
                  <SelectItem value="2000-01-03">3 Januari 2000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm">
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
            <Button className="rounded-full bg-yellow-200 px-6 text-black hover:bg-yellow-300">
              Simpan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Account Section */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="border-b px-6 pt-4 pb-2">
          <CardTitle className="text-base font-medium">Rekening Bank</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Belum ada rekening bank ditambahkan</p>
            <Button
              variant="outline"
              className="gap-1 rounded-full border-gray-300"
            >
              <Plus className="h-4 w-4" /> Tambah Rekening
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Section */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="border-b px-6 pt-4 pb-2">
          <CardTitle className="text-base font-medium">Password</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">Belum memiliki password.</p>
            <Button
              variant="outline"
              className="gap-1 rounded-full border-gray-300"
            >
              <Plus className="h-4 w-4" /> Tambah Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email Section */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="border-b px-6 pt-4 pb-2">
          <CardTitle className="text-base font-medium">Email</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <p>{email}</p>
              <Badge
                variant="outline"
                className="rounded-full border-red-200 bg-red-100 px-3 py-1 text-xs text-red-500"
              >
                Belum Diverifikasi
              </Badge>
            </div>
            <Button
              variant="outline"
              className="gap-1 rounded-full border-gray-300"
            >
              <Pencil className="h-4 w-4" /> Ganti Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Phone Number Section */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="border-b px-6 pt-4 pb-2">
          <CardTitle className="text-base font-medium">Nomor Telepon</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <p>{phone}</p>
            <Button
              variant="outline"
              className="gap-1 rounded-full border-gray-300"
            >
              <Pencil className="h-4 w-4" /> Ganti Nomor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

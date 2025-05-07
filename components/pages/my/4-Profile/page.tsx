'use client'

import { EditIcon } from '@/components/icons/edit'
import { PlusIcon } from '@/components/icons/plus'
import CardProfile from '@/components/pages/my/4-Profile/Card/1-Profile/CardProfile'
import CardRekening from '@/components/pages/my/4-Profile/Card/2-Rekening/CardRekening'
import CardPassword from '@/components/pages/my/4-Profile/Card/3-Password/CardPassword'
import CardProfileLoading from '@/components/pages/my/4-Profile/Card/Loading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth/context'
import 'dayjs/locale/id'

export default function MyProfilePage() {
  const { profile, refetchProfile } = useAuth()

  return !profile ? (
    <CardProfileLoading />
  ) : (
    <div className="container mx-auto pb-3">
      <h1 className="text-l-medium mb-6">Pengaturan Akun</h1>

      {/* Personal Data Section */}
      <CardProfile profile={profile} />

      {/* Bank Account Section */}
      <CardRekening
        accountBank={profile?.persona?.accountBank}
        accountNumber={profile?.persona?.accountNumber}
        accountName={profile?.persona?.accountName}
        bankLogo={profile?.persona?.bankLogo}
        onUpdated={refetchProfile}
      />

      {/* Password Section */}
      <CardPassword
        havePassword={profile?.havePassword || false}
        onUpdated={refetchProfile}
      />

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
              <p>{profile?.email}</p>
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

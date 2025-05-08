'use client'

import CardProfile from '@/components/pages/my/4-Profile/Card/1-Profile/CardProfile'
import CardRekening from '@/components/pages/my/4-Profile/Card/2-Rekening/CardRekening'
import CardPassword from '@/components/pages/my/4-Profile/Card/3-Password/CardPassword'
import CardEmail from '@/components/pages/my/4-Profile/Card/4-Email/CardEmail'
import CardPhone from '@/components/pages/my/4-Profile/Card/5-Phone/CardPhone'
import CardProfileLoading from '@/components/pages/my/4-Profile/Card/Loading'
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
      <CardEmail
        email={profile?.email || ''}
        provider={profile?.provider || ''}
        onUpdated={refetchProfile}
        emailVerified={profile?.emailVerified || false}
      />

      {/* Phone Number Section */}
      <CardPhone
        phoneNumber={profile.persona?.phoneNumber || ''}
        onUpdated={refetchProfile}
      />
    </div>
  )
}

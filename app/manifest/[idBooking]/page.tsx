import { BackButton } from '@/components/pages/manifest/1-BackButton/BackButton'
import DaftarJemaah from '@/components/pages/manifest/2-DaftarJemaah/DaftarJemaah'
import DrawerDaftarJemaah from '@/components/pages/manifest/2-DaftarJemaah/mobile/DrawerDaftarJemaah'
import BiodataForm from '@/components/pages/manifest/3-FormManifest/Biodata'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { getManifestDetail } from '@/services/umrah-service'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { Fragment } from 'react'

export default async function FormManifest({ params }: { params: any }) {
  const { idBooking } = await params

  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const dataDetailManifest = await getManifestDetail(
    {
      bookingId: idBooking,
      page: 1,
      size: 100,
    },
    token
  )

  return (
    <Fragment>
      <Topbar type="plain" shadow />

      <main className="my-7.5 bg-gradient-to-l from-white to-white max-lg:fixed max-lg:mt-auto max-lg:mb-0 max-lg:h-[100vh] max-lg:w-full max-lg:overflow-hidden max-lg:bg-transparent">
        <Image
          src={'/images/mosque.png'}
          alt="mosque"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute top-0 z-[1] h-full w-full max-lg:hidden"
        />
        <MobileTopbar variant="title" showBackButton title="Manifest Jemaah" />
        <section className="scrollbar-hide container mx-auto grid grid-cols-12 gap-5 max-lg:absolute max-lg:top-[55px] max-lg:bottom-0 max-lg:z-11 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:gap-3 max-lg:overflow-y-auto max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:py-7.5 max-lg:pb-[130px] max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          <BackButton className="col-span-12 text-left text-neutral-900 max-lg:hidden" />
          <div className="relative z-2 col-span-4 max-lg:col-span-12">
            <DaftarJemaah dataJemaah={dataDetailManifest.results} />

            {/* For Mobile View */}
            <DrawerDaftarJemaah dataJemaah={dataDetailManifest.results} />
          </div>
          <div className="relative z-2 col-span-8 max-lg:col-span-12">
            <BiodataForm idBooking={idBooking} />
          </div>
        </section>
      </main>

      <Footer type="compact" className="max-lg:hidden" />
    </Fragment>
  )
}

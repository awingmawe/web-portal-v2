import { metadata } from '@/app/shared-metadata'
import PembiayaanLanding from '@/components/pages/banking/credit/landing/1-LandingPembiayaan'
import StepByStepPembiayaan from '@/components/pages/banking/credit/landing/2-StepPembiayaan'
import PackagePembiayaan from '@/components/pages/banking/credit/landing/3-PackagePembiayaan'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { getFacilityEnum } from '@/services/general-service'
import { getPackageList } from '@/services/umrah-service'
import { cookies } from 'next/headers'
import { Fragment } from 'react'
export async function generateMetadata() {
  return {
    ...metadata('Muslim101 | Pembiayaan Umroh', `Pembiayaan Umroh`),
  }
}
export default async function SearchGeneral() {
  const cookieStore = cookies()
  const token = (await cookieStore).get(cookieNames.USER_ACCESS_TOKEN)
    ?.value as string

  // const dataProvider = await getProviderPublic({ page: 1, size: 10 })

  // const uniqueSupportedOrgs = [
  //   ...new Set(
  //     dataProvider?.data?.data?.flatMap(
  //       (provider) => provider.supported_organizations
  //     )
  //   ),
  // ]

  const [dataPackageProvider, dataTenor] = await Promise.all([
    getPackageList({
      page: 1,
      size: 12,
      packageType: 'umrah',
      // ['organizationInstanceId:in']: uniqueSupportedOrgs.join(','),
    }),
    getFacilityEnum('credit_tenor'),
  ])

  return (
    <Fragment>
      <Topbar scrolled token={token} />

      {/* Mobile (tanpa wrapper) */}
      <MobileTopbar
        variant="plainBank"
        showBackButton
        title="Pembiayaan Umroh"
      />
      <main className="my-6 max-lg:mt-17.5">
        <PembiayaanLanding />

        <StepByStepPembiayaan />

        <p className="text-xs-regular text-center text-neutral-300 max-md:px-4">
          *Jika berhasil disetujui, kamu harus menyelesaikan administrasi
          tergantung mitra dan travel dipilih.
        </p>

        <PackagePembiayaan
          dataPackageProvider={dataPackageProvider}
          dataTenor={dataTenor.data.results}
          token={token}
        />
      </main>

      <Footer type="compact" className="hidden lg:block" />
    </Fragment>
  )
}

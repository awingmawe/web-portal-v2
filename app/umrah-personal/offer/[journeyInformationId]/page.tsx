import { metadata } from '@/app/shared-metadata'
import TopbarUmrahPersonalOfferHeader from '@/components/pages/umrah-personal/offer/1-Topbar/TopbarUmrahPersonalOffer'
import UmrahPersonalDetailCard from '@/components/pages/umrah-personal/offer/2-DetailJourneyInformation/DetailJourneyInformation'
import ListOffering from '@/components/pages/umrah-personal/offer/3-ListOffering/ListOffering'
import Footer from '@/components/shared/Footer'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { getOfferUmrahPersonal } from '@/services/umrah-service'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata() {
  return {
    ...metadata(
      'Muslim 101 | Umrah Personal',
      'Muslim 101 Umrah Personal Detail Penawaran'
    ),
  }
}

export default async function UmrahPersonalOffer({ params }: { params: any }) {
  const { journeyInformationId } = await params

  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  const getDataOffer = await getOfferUmrahPersonal(
    Number(journeyInformationId),
    token
  )

  return (
    <Fragment>
      <Topbar token={token} shadow scrolled type="normal" />
      <main className="my-7.5 max-lg:fixed max-lg:mt-auto max-lg:mb-0 max-lg:h-[100vh] max-lg:w-full max-lg:overflow-hidden max-lg:bg-transparent">
        <MobileTopbar
          variant="title"
          title="Detail Paket Personal"
          showCallCenter
          showBackButton
        />
        <section className="scrollbar-hide container mx-auto max-lg:absolute max-lg:top-[55px] max-lg:bottom-0 max-lg:z-11 max-lg:mt-0 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:overflow-y-auto max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:px-4 max-lg:pb-[130px] max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          <TopbarUmrahPersonalOfferHeader
            journeyCode={
              getDataOffer.packagePersonalData[0].JourneyInformation.journeyCode
            }
          />
          <UmrahPersonalDetailCard
            dataOffer={getDataOffer.packagePersonalData[0].JourneyInformation}
            totalOffer={getDataOffer.totalOffers}
          />
          <ListOffering offers={getDataOffer.packagePersonalData} />
        </section>
      </main>
      <Footer type="compact" />
    </Fragment>
  )
}

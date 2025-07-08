import { metadata } from '@/app/shared-metadata'
import CardOfferUmrahPersonal from '@/components/pages/umrah-personal/offer/common/CardOfferUmrahPersonal'
import Footer from '@/components/shared/Footer'
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
      <CardOfferUmrahPersonal
        dataOffer={getDataOffer.packagePersonalData[1]}
        index={0}
      />
      <Footer type="compact" />
    </Fragment>
  )
}

import { metadata } from '@/app/shared-metadata'
import Breadcrumb from '@/components/pages/about-us/1-Breadcrumb/Breadcrumb'
import Visi from '@/components/pages/about-us/3-Visi/Visi'
import Moment from '@/components/pages/about-us/4-Moment/Moment'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import { Fragment } from 'react'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any
}) {
  const resolvedSearchParams = await searchParams
  return {
    ...metadata(
      'Muslim 101 | Daftar Paket Muslim101',
      `Daftar pencarian paket ${resolvedSearchParams.query || ''}`
    ),
  }
}

export default async function SearchGeneral() {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <Topbar type="shadow" token={token} />
      {/* BreadCrumb */}
      <Breadcrumb />
      {/* Visi */}
      <Visi />
      {/* Moment */}
      <Moment />
    </Fragment>
  )
}

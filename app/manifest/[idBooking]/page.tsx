import DaftarJemaah from '@/components/pages/manifest/1-DaftarJemaah/DaftarJemaah'
import MobileTopbar from '@/components/shared/mobile/TopbarMobile'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { getManifestDetail } from '@/services/umrah-service'
import { cookies } from 'next/headers'
import { Fragment, Suspense } from 'react'

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

      <main className="my-7.5 max-lg:fixed max-lg:mt-auto max-lg:mb-0 max-lg:h-[100vh] max-lg:w-full max-lg:overflow-hidden max-lg:bg-transparent">
        <MobileTopbar variant="title" showBackButton title="Manifest Jemaah" />
        <section className="scrollbar-hide container mx-auto grid grid-cols-12 gap-5 max-lg:absolute max-lg:top-[55px] max-lg:bottom-0 max-lg:z-11 max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:overflow-y-auto max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:px-4 max-lg:py-7.5 max-lg:pb-[130px] max-lg:shadow-[0px_-6px_24px_0px_rgba(0,0,0,0.25)]">
          <div className="col-span-4 max-lg:col-span-12">
            <Suspense fallback={<DaftarJemaahSkeleton />}>
              <DaftarJemaah />
            </Suspense>
          </div>
        </section>
      </main>
    </Fragment>
  )
}

function DaftarJemaahSkeleton() {
  const skeletonItems = Array(5).fill(0)

  return (
    <div
      className={
        'flex flex-col rounded-[20px] border-1 border-neutral-100 p-2.5'
      }
    >
      {/* Title skeleton */}
      <div className="mb-5 h-6 w-40 animate-pulse rounded-md bg-neutral-200"></div>

      {/* List skeleton */}
      <ol className="space-y-1">
        {skeletonItems.map((_, index) => (
          <li
            key={`skeleton-jemaah-${index}`}
            className="flex items-center justify-between gap-2 border-b border-neutral-100 py-2"
          >
            <div className="flex items-center gap-2">
              <div className="ml-2 h-5 w-60 animate-pulse rounded-md bg-neutral-200"></div>
            </div>

            {/* Random checkmark placeholder (show for some items) */}
            {index % 2 === 0 && (
              <div className="mr-2 h-6 w-6 animate-pulse rounded-full bg-neutral-200"></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

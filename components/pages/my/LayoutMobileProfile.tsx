import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import Image from 'next/image'
import type React from 'react'
import { Fragment } from 'react'

export default async function LayoutMobileProfile({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <Topbar token={token} shadow scrolled type="normal" />
      <main className="max-lg:bg-primary-500 relative mt-7.5 mb-0 max-lg:mt-auto  max-lg:min-h-screen lg:my-0">
        {/* Circle Background for mobile */}
        <Image
          src="/images/circle-3.svg"
          alt="bg-search"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute top-5 right-0 h-auto w-1/4 lg:hidden"
        />
        <Image
          src="/images/circle-2.svg"
          alt="bg-search"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute top-0 left-0 h-auto w-1/2 lg:hidden"
        />

        {/* End of Circle Background for Mobile */}

        <section className="scrollbar-hide top-30 container mx-auto mb-5 max-lg:relative max-lg:bottom-0 max-lg:mb-20 max-lg:h-[90%] max-lg:min-h-screen max-lg:w-full max-lg:max-w-full  max-lg:bg-white">
          <div className="container mx-auto flex gap-5 pt-0 pb-5 lg:pt-8 ">
            {children}
            {/* <div className=" w-full">{children}</div> */}
          </div>
        </section>
      </main>

      <Footer type="compact" />
    </Fragment>
  )
}

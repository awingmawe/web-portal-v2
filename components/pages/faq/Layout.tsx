import WhatsappIcon from '@/components/icons/whatsapp'
import Breadcrumb from '@/components/pages/faq/Breadcumb'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar/Topbar'
import { cookieNames } from '@/services/common/cookie'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import type React from 'react'
import { Fragment } from 'react'

export default async function LayoutFaq({
  variant,
  children,
}: Readonly<{
  children: React.ReactNode
  variant?: string
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get(cookieNames.USER_ACCESS_TOKEN)?.value as string

  return (
    <Fragment>
      <Topbar shadow scrolled token={token} />
      {variant !== 'details' && <Breadcrumb />}

      <main className="max-lg:bg-primary-500 relative mt-7.5 mb-0 max-lg:mt-auto max-lg:min-h-screen lg:my-0">
        {/* Circle Background for mobile */}
        <Image
          src="/images/circle-1.svg"
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

        {/* FOOTER BG */}
        <Image
          src="/images/footer-faq-bg.png"
          alt="bg-footer-faq"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute bottom-0 -z-1 -mb-5 h-auto w-full max-lg:z-1 max-lg:-mb-20 max-lg:h-[280px]"
        />

        <section
          className={`scrollbar-hide container mx-auto mb-5 ${
            variant === 'details' ? 'top-13.5' : 'top-32'
          } max-lg:relative max-lg:bottom-0 max-lg:-mb-15 max-lg:h-[100%] max-lg:min-h-screen max-lg:w-full max-lg:max-w-full max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:shadow-[0px_-20px_24px_-15px_rgba(0,0,0,0.25)]`}
        >
          <div className="container mx-auto flex gap-5 pt-0 pb-5 lg:pt-6">
            <div className="w-full ">{children}</div>
          </div>
        </section>

        <section
          className={`container mx-auto mb-5 min-h-[200px] max-lg:relative max-lg:z-1 max-lg:mb-20 max-lg:min-h-[100px] max-lg:w-full max-lg:max-w-full`}
        >
          <div className="container mx-auto flex flex-col items-center max-md:mt-4">
            <h6 className="text-l-medium">Merasa masih kebingungan?</h6>
            <p className="text-m-regular mt-2 mb-0 text-neutral-400">
              Hubungi kami sekarang!
            </p>
            {/* <Card className="mt-2 max-h-min border-neutral-100 py-2 shadow-none">
              <CardContent>
                
              </CardContent>
            </Card> */}

            <Link
              href={'#'}
              className="mt-5 max-h-min rounded-xl border-1 border-neutral-100 bg-white px-5 py-3"
            >
              <div className="text-s-regular max-lg:text-xs-regular max-sm:text-xs-regular flex items-center gap-2 max-lg:leading-3.5 max-sm:leading-4">
                <WhatsappIcon size={24} />
                Chat langsung dengan customer service
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      {/* <Footer type="compact" className="md:block lg:hidden" /> */}
    </Fragment>
  )
}

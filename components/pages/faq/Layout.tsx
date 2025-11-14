import WhatsappIcon from '@/components/icons/whatsapp'
import Breadcrumb from '@/components/pages/faq/Breadcumb'
import TopbarMobileFaq from '@/components/pages/faq/TopbarMobile'
import Footer from '@/components/shared/Footer'
import Topbar from '@/components/shared/Topbar/Topbar'
import { CALL_CENTER } from '@/constant/env'
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
  const isWebview =
    (cookieStore.get(cookieNames.IS_WEBVIEW)?.value as string) || false

  return (
    <Fragment>
      <main className="max-lg:bg-primary-500 relative mt-7.5 mb-0 max-lg:mt-auto max-lg:min-h-screen lg:my-0">
        <Topbar shadow scrolled token={token} />

        {/* MOBILE TOPBAR */}
        <div className="fixed w-full">
          <TopbarMobileFaq
            title={variant !== 'details' ? 'FAQ' : 'Jawaban Pertanyaan'}
          />
        </div>
        {/* END MOBILE TOPBAR */}

        {variant !== 'details' && <Breadcrumb />}

        {/* FOOTER BG */}
        <Image
          src="/images/footer-faq-bg.png"
          alt="bg-footer-faq"
          width={0}
          height={0}
          sizes="100vw"
          className="absolute bottom-0 -z-1 h-auto w-full max-lg:z-1 max-lg:-mb-20 max-lg:hidden max-lg:h-[280px]"
        />

        <section
          className={`scrollbar-hide container mx-auto mb-5 ${
            variant === 'details' ? 'top-13.5' : 'top-32'
          } max-lg:relative max-lg:bottom-0 max-lg:-mb-15 max-lg:w-full max-lg:max-w-full max-lg:rounded-tl-3xl max-lg:rounded-tr-3xl max-lg:bg-white max-lg:shadow-[0px_-20px_24px_-15px_rgba(0,0,0,0.25)] max-md:fixed max-md:max-h-screen max-md:overflow-y-auto`}
        >
          <div className="container mx-auto flex gap-5 pt-0 md:pb-2 lg:pt-6 lg:pb-5">
            <div className="w-full ">{children}</div>
          </div>

          <div className="absolute container mx-auto mb-10 flex flex-col items-center max-md:mt-4 lg:hidden">
            <h6 className="text-l-medium">Merasa masih kebingungan?</h6>
            <p className="text-m-regular mt-2 mb-0 text-neutral-400">
              Hubungi kami sekarang!
            </p>

            <Link
              href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+maaf+saya+ingin+bertanya`}
              className="mt-5 max-h-min rounded-xl border-1 border-neutral-100 bg-white px-5 py-3"
            >
              <div className="text-s-regular max-lg:text-xs-regular max-sm:text-xs-regular flex items-center gap-2 max-lg:leading-3.5 max-sm:leading-4">
                <WhatsappIcon size={24} />
                Chat langsung dengan customer service
              </div>
            </Link>
          </div>
          <Image
            src="/images/footer-faq-bg.png"
            alt="bg-footer-faq"
            width={0}
            height={0}
            sizes="100vw"
            className="-mt-15 w-full max-lg:h-[280px] lg:hidden"
          />
          <Footer
            className={`max-lg:mb-0 ${isWebview === 'true' ? 'max-lg:hidden' : ''} lg:hidden`}
          />
        </section>

        <section
          className={`container mx-auto min-h-[200px] max-lg:relative max-lg:z-1 max-lg:mb-20 max-lg:hidden max-lg:min-h-[100px] max-lg:w-full max-lg:max-w-full`}
        >
          <div className="container mx-auto flex flex-col items-center max-md:mt-4">
            <h6 className="text-l-medium">Merasa masih kebingungan?</h6>
            <p className="text-m-regular mt-2 mb-0 text-neutral-400">
              Hubungi kami sekarang!
            </p>

            <Link
              href={`https://wa.me/${CALL_CENTER}?text=Assalamualaikum,+maaf+saya+ingin+bertanya`}
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

      <Footer className={`max-lg:mb-0 max-lg:hidden`} />
    </Fragment>
  )
}

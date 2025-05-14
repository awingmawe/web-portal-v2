'use client'

import BankingSection from '@/components/pages/homepage/5-ScrollAnimation/BankingSection'
import PaymentSection from '@/components/pages/homepage/5-ScrollAnimation/PaymentSection'
import PreparationSection from '@/components/pages/homepage/5-ScrollAnimation/PreparationSection'
import TravelImageSection from '@/components/pages/homepage/5-ScrollAnimation/TravelImageSection'
import { GalleryHomepage } from '@/constant/types/GalleryProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'

function AnimationScrollV2({
  children,
  dataGallery,
}: {
  children?: React.ReactNode
  dataGallery?: GalleryHomepage[]
}) {
  const gradientForeground = useRef<HTMLDivElement>(null)
  const experienceContainer = useRef<HTMLDivElement>(null)
  const exp = useRef<HTMLDivElement>(null)
  const tracker = useRef<HTMLDivElement>(null)
  const jemaah = useRef<HTMLDivElement>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const notJustAService = useRef<HTMLDivElement>(null)

  const { lg: isMobile } = useTailwindBreakpoint()
  const [showKabah, setShowKabah] = useState(false)

  useEffect(() => {
    const gf = gradientForeground.current
    const ec = experienceContainer.current
    const tr = tracker.current
    const ex = exp.current
    const je = jemaah.current
    const ov = overlay.current
    const nj = notJustAService.current

    if (!gf || !ec || !tr || !ex || !je || !ov || !nj) return
    nj.style.left = `${Number(exp.current?.getBoundingClientRect().left)}px`
    nj.style.display = 'inline'

    const handleScroll = () => {
      const gfRectY = gf.getBoundingClientRect().top + window.scrollY
      setShowKabah(window.scrollY > gfRectY + gf.clientHeight / 2.8)

      const trRectY = tr.getBoundingClientRect().top
      if (window.scrollY > trRectY + window.scrollY) {
        ec.style.position = 'fixed'
        ec.style.top = '0'
        ec.style.left = '0'
        const val = (trRectY * -1) / (isMobile ? 20 : 100)
        ex.style.transform = `scale(${val > 1 ? val : 1})`
      } else {
        ec.style.position = 'relative'
        ec.style.top = 'unset'
        ec.style.left = 'unset'
        ex.style.transform = `scale(1)`
        console.log('kaluhur')
      }

      const targetJeShow =
        trRectY * (isMobile ? 1.2 : 1) +
        window.innerHeight * (isMobile ? 0.5 : 2) +
        window.scrollY
      if (window.scrollY > targetJeShow) {
        const targetJeY =
          ((targetJeShow + trRectY) / window.innerHeight) *
          (window.innerHeight / (isMobile ? 5 : 7))
        je.style.display = 'inline'
        je.style.transform = `translate(0, ${targetJeY > 0 ? targetJeY : 0}px)`

        const targetOvOpacity =
          (10 - (targetJeShow + trRectY) / window.innerHeight) / 10
        ov.style.display = 'inline'
        ov.style.opacity = String(targetOvOpacity - 0.6)
      } else {
        je.style.display = 'none'
        ov.style.display = 'none'
      }
    }

    // Initial position
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Fragment>
      {children}
      <div
        className="w-100vw relative z-2 h-[800px] bg-white shadow-lg"
        ref={gradientForeground}
        style={{
          background:
            'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 42.13%)',
        }}
      />
      <div ref={tracker} style={{ background: 'white' }} />
      <div className="relative">
        <div
          className="absolute z-40 hidden !pt-[200px] max-xl:top-[5%] max-lg:top-[0%] max-lg:left-[65px] max-lg:!px-[56px] max-lg:!pt-[42vh] max-md:left-[20px] max-md:!px-0"
          ref={notJustAService}
          style={{ paddingTop: 220 }}
        >
          <p className="text-xl-regular z-10 text-center max-lg:text-[16px]">
            Not just a service, It&apos;s an...
          </p>
        </div>
        <div
          ref={experienceContainer}
          className="pointer-events-none relative z-30 flex h-screen w-full items-center justify-center bg-white px-2.5 pb-1.5 text-center text-[220px] font-bold text-black mix-blend-screen max-lg:text-[48px]"
        >
          <div
            className="relative origin-[54.75%_27%] text-black max-xl:text-[175px] max-lg:origin-[54.75%_27.88%] max-lg:text-[120px] max-md:text-[48px]"
            ref={exp}
          >
            Experience
          </div>
        </div>
        {showKabah && (
          <div
            className="z-1 h-dvh items-center bg-center"
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: 0,
              left: 0,
              backgroundColor: 'black',
              backgroundImage:
                'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970-2.jpg)',
            }}
          />
        )}
      </div>
      <div
        className="fixed top-[0] left-[0] h-full w-full bg-[#00000080]"
        id="bg-overlay-1"
        ref={overlay}
        style={{
          zIndex: 1,
          display: 'none',
        }}
      />

      <div
        className="relative flex h-screen items-center justify-center bg-cover bg-no-repeat"
        id="100kjemaah"
        style={{ position: 'fixed', top: 0, zIndex: 1, display: 'none' }}
        ref={jemaah}
      >
        <div className="flex-column z-2 flex h-dvh w-dvw items-center justify-center p-5">
          <h1 className="none block text-center text-white max-lg:text-4xl sm:max-lg:text-5xl lg:text-[92px]">
            <span className="relative font-bold text-white">
              100.000+{' '}
              <Image
                src="/images/yellow-underline.svg"
                width={490}
                height={68}
                alt="line"
                className="absolute top-[80px] left-[-48px] max-lg:!top-[36px] max-lg:left-[-18px] max-lg:h-auto max-lg:w-48 lg:h-[68px] lg:w-[490px]"
              />
            </span>
            Jemaah
            <br />
            telah memilih travel <br />
            pilihan kami
          </h1>
        </div>
      </div>
      <div>
        {/* Travel Image Section */}
        <TravelImageSection
          dataGallery={dataGallery || []}
          className="mt-[800vh] max-lg:mt-[420vh]"
        />
        {/* Payment Section  */}
        <PaymentSection />
        {/* Banking Section */}
        <BankingSection />
        {/* Prepartion Section */}
        <PreparationSection />
      </div>
    </Fragment>
  )
}

export default AnimationScrollV2

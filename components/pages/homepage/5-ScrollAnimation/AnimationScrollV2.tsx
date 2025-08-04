'use client'

import BankingSection from '@/components/pages/homepage/5-ScrollAnimation/BankingSection'
import PaymentSection from '@/components/pages/homepage/5-ScrollAnimation/PaymentSection'
import PreparationSection from '@/components/pages/homepage/5-ScrollAnimation/PreparationSection'
import TravelImageSection from '@/components/pages/homepage/5-ScrollAnimation/TravelImageSection'
import { GalleryHomepage } from '@/constant/types/GalleryProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Lenis from '@studio-freight/lenis'
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
  const lenisRef = useRef<Lenis | null>(null)

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

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      syncTouch: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Set initial position
    nj.style.left = `${Number(exp.current?.getBoundingClientRect().left)}px`
    nj.style.display = 'inline'

    const handleScroll = (lenis: Lenis) => {
      const scrollY = lenis.scroll

      // Kabah visibility
      const gfRectY = gf.getBoundingClientRect().top + scrollY
      setShowKabah(scrollY > gfRectY + gf.clientHeight / 2.8)

      const trRect = tr.getBoundingClientRect()
      const trRectY = trRect.top

      // 1. Experience container scaling - Enhanced for mobile
      if (scrollY > trRectY + scrollY) {
        ec.style.position = 'fixed'
        ec.style.top = '0'
        ec.style.left = '0'

        // Improved scaling calculation for smoother mobile experience
        const scrollProgress = trRectY * -1
        let scaleFactor: number

        if (isMobile) {
          // Faster and smoother scaling for mobile
          scaleFactor = scrollProgress / 5 // Reduced from 60 to 35 for faster scaling
          // Add ease-out effect for smoother animation
          scaleFactor = 1 + Math.pow(Math.max(0, scaleFactor - 1), 0.8)
        } else {
          scaleFactor = scrollProgress / 100 // Slightly adjusted for desktop
        }

        const finalScale = Math.max(1, scaleFactor)
        ex.style.transform = `scale(${finalScale})`
        ex.style.transformOrigin = '54.75% 27%'

        // Add smooth transition
        ex.style.transition = 'transform 0.1s ease-out'
      } else {
        ec.style.position = 'relative'
        ec.style.top = 'unset'
        ec.style.left = 'unset'
        ex.style.transform = 'scale(1)'
        ex.style.transition = 'transform 0.3s ease-out'
      }

      // 2. Jemaah and overlay animations - Enhanced smoothness
      const baseMultiplier = isMobile ? 1.8 : 1
      const heightMultiplier = isMobile ? 1 : 2

      const targetJeShow =
        trRectY * baseMultiplier +
        window.innerHeight * heightMultiplier +
        scrollY

      if (scrollY > targetJeShow) {
        // Smoother translation calculation
        const progress = (targetJeShow + trRectY) / window.innerHeight
        const translateY = progress * (window.innerHeight / (isMobile ? 5 : 7))

        je.style.display = 'inline'
        je.style.transform = `translate3d(0, ${Math.max(0, translateY)}px, 0)`
        je.style.transition = 'transform 0.1s ease-out'

        // Smoother opacity transition
        const opacityProgress = Math.max(0, Math.min(1, (10 - progress) / 10))
        const finalOpacity = Math.max(0, opacityProgress - 0.6)

        ov.style.display = 'inline'
        ov.style.opacity = String(finalOpacity)
        ov.style.transition = 'opacity 0.1s ease-out'
      } else {
        je.style.display = 'none'
        ov.style.display = 'none'
      }
    }

    // Use Lenis scroll event
    lenis.on('scroll', handleScroll)

    // Animation frame loop for Lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Initial call
    handleScroll(lenis)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isMobile])

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

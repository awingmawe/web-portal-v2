'use client'

import BankingSection from '@/components/pages/homepage/5-ScrollAnimation/BankingSection'
import PaymentSection from '@/components/pages/homepage/5-ScrollAnimation/PaymentSection'
import PreparationSection from '@/components/pages/homepage/5-ScrollAnimation/PreparationSection'
import TravelImageSection from '@/components/pages/homepage/5-ScrollAnimation/TravelImageSection'
import { GalleryHomepage } from '@/constant/types/GalleryProps'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  Animator,
  batch,
  FadeIn,
  MoveIn,
  ScrollContainer,
  ScrollPage,
  Sticky,
} from 'react-scroll-motion'

function OverscrollTracker({
  children,
  dataGallery,
}: {
  children?: React.ReactNode
  dataGallery?: GalleryHomepage[]
}) {
  const [endExperience, setEndExperience] = useState(false)
  const sh = useRef<number>(800)
  const { lg: isMobile } = useTailwindBreakpoint()

  useEffect(() => {
    setEndExperience(window.scrollY > 2239)
  }, [])

  return (
    <Fragment>
      {children}
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(FadeIn())} className="h-full w-full">
            <div
              className="h-full w-full bg-white shadow-lg"
              style={{
                transform: 'translate(0%, 50%) !important',
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 42.13%)',
              }}
            ></div>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator
            animation={batch({
              in: {
                style: {},
              },
              out: {
                style: {
                  left: () => `50%`,
                  top: () => `50%`,
                  transform: 'translate(-50%, -50%)',
                  position: 'fixed',
                },
              },
            })}
            className="relative w-full"
          >
            <div
              className="relative h-dvh items-center justify-center bg-cover bg-fixed bg-no-repeat"
              style={{
                backgroundImage:
                  'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970-2.jpg)',
                backgroundPositionY: '35%',
                backgroundPositionX: '50%',
              }}
              id="image-kabah"
            >
              <div className="relative w-full">
                <Animator
                  animation={batch({
                    out: {
                      style: {
                        opacity: 0,
                        transition: 'opacity 0.8s ease-in-out',
                      },
                    },
                  })}
                >
                  <p className="text-xl-regular absolute top-1/4 z-10 w-full -translate-y-1/2 text-center max-lg:top-3/7  max-lg:text-[16px]">
                    Not just a service, It&apos;s an...
                  </p>
                </Animator>
                <div
                  className="absolute top-[0] left-[0] h-full w-full bg-[#00000080]"
                  id="bg-overlay-1"
                />
                <div className="flex h-screen w-full items-center justify-center bg-white px-2.5 pb-1.5 text-center text-[220px] font-bold text-black mix-blend-screen max-lg:text-[48px]">
                  <Animator
                    animation={batch(
                      {
                        out: {
                          style: {
                            transform: (value: number) => {
                              const element =
                                document.getElementById('bg-overlay-1')

                              if (element) {
                                element.style.opacity = String(value)
                              }

                              const val =
                                value > 0.02
                                  ? (value / 0.5) * (isMobile ? 70 : 32)
                                  : 1
                              return `scale(${val})`
                            },
                          },
                        },
                      },
                      {
                        out: {
                          style: {
                            transform: (value: number) => {
                              const offset = value / 0.18
                              // Adjust the transform values based on screen size
                              const tx = isMobile
                                ? -12.65 * (offset > 1 ? 1 : offset)
                                : -58.5 * (offset > 1 ? 1 : offset)
                              const ty = isMobile
                                ? 15 * (offset > 1 ? 1 : offset)
                                : 74 * (offset > 1 ? 1 : offset)
                              return `translate(${tx}px, ${ty}px)`
                            },
                          },
                        },
                      },
                      {
                        out: {
                          style: {
                            position: 'fixed',
                            opacity: 1,
                          },
                        },
                      }
                    )}
                  >
                    <span className="relative text-black">Experience</span>
                  </Animator>
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage className="hiddens">
          <Animator
            animation={batch({
              in: {
                style: {
                  display: () => {
                    setEndExperience(false)
                    return 'unset'
                  },
                },
              },
              out: {
                style: {
                  position: 'fixed',
                  top: 0,
                  backgroundImage:
                    'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970-2.jpg)',
                  backgroundSize: 'cover',
                  backgroundPositionX: '50%',
                  backgroundPositionY: '35%',
                  display: () => {
                    setEndExperience(true)
                    return 'none'
                  },
                },
              },
            })}
            className="h-dvh w-full"
          >
            <div
              className="relative flex h-screen items-center justify-center bg-cover bg-no-repeat"
              id="100kjemaah"
            >
              <Animator
                animation={batch(MoveIn(0, sh.current * 1.2), Sticky())}
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
                        className="max-lg:top:[-0px] absolute top-[800px] left-[-48px] max-lg:left-[-18px] max-lg:h-auto max-lg:w-48 lg:h-[68px] lg:w-[490px]"
                        style={{
                          top: isMobile ? 36 : 80,
                          left: isMobile ? -18 : -48,
                          display: 'none',
                        }}
                      />
                    </span>
                    Jemaah
                    <br />
                    telah memilih travel <br />
                    pilihan kami
                  </h1>
                </div>
              </Animator>
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
      <div className="relative z-2">
        {endExperience && (
          <>
            <div
              className="fixed h-full w-full items-center justify-center bg-cover bg-fixed bg-no-repeat"
              style={{
                top: 0,
                left: 0,
                backgroundImage:
                  'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970-2.jpg)',
                backgroundPositionX: '50%',
                backgroundPositionY: '35%',
              }}
            />
            <div className="fixed top-[0] left-[0] h-full w-full bg-[#00000080]" />
            <div className="flex-column fixed top-[0px] z-2 flex h-dvh w-dvw items-center justify-center p-5">
              <h1 className="none block text-center text-white max-lg:text-4xl sm:max-lg:text-5xl lg:text-[92px]">
                <span className="relative font-bold text-white">
                  100.000+{' '}
                  <Image
                    src="/images/yellow-underline.svg"
                    width={490}
                    height={68}
                    alt="line"
                    className="absolute max-lg:h-auto max-lg:w-48 lg:h-[68px] lg:w-[490px]"
                    style={{
                      top: isMobile ? 36 : 80,
                      left: isMobile ? -18 : -48,
                    }}
                  />
                </span>
                Jemaah
                <br />
                telah memilih travel <br />
                pilihan kami
              </h1>
            </div>
          </>
        )}
        {/* Travel Image Section */}
        <TravelImageSection dataGallery={dataGallery || []} />
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

export default OverscrollTracker

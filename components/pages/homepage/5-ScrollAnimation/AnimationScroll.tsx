'use client'

import BankingSection from '@/components/pages/homepage/5-ScrollAnimation/BankingSection'
import PreparationSection from '@/components/pages/homepage/5-ScrollAnimation/PreparationSection'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'
import { Fragment, useRef, useState } from 'react'
import {
  Animator,
  batch,
  FadeIn,
  MoveIn,
  ScrollContainer,
  ScrollPage,
  Sticky,
} from 'react-scroll-motion'
import PaymentSection from './PaymentSection'
import TravelImageSection from './TravelImageSection'

function OverscrollTracker({ children }: { children?: React.ReactNode }) {
  const [endExperience, setEndExperience] = useState(false)
  const sh = useRef<number>(800)
  const { lg: isMobile } = useTailwindBreakpoint()

  return (
    <Fragment>
      {children}
      <ScrollContainer>
        <ScrollPage>
          <Animator animation={batch(FadeIn())} className="w-full">
            <div
              className="h-screen w-full bg-white shadow-lg"
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
                  'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970.jpg)',
              }}
              id="image-kabah"
            >
              <div className="relative w-full">
                <Animator
                  animation={batch({
                    out: {
                      style: {
                        display: 'none',
                      },
                    },
                  })}
                >
                  <p className="text-xl-regular absolute z-10 inline-block max-lg:top-60 max-lg:left-7 lg:top-40 lg:left-32.5">
                    Not just a service, It&apos;s an...
                  </p>
                </Animator>
                <div
                  className="absolute top-[0] left-[0] h-full w-full bg-[#00000080]"
                  id="bg-overlay-1"
                />
                <div className="flex h-screen w-full items-center justify-center bg-white px-2.5 py-1.5 text-center text-[220px] font-bold text-black mix-blend-screen max-lg:text-[48px]">
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

                              const val = value > 0.02 ? (value / 0.5) * 32 : 1
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
                                ? -12.5 * (offset > 1 ? 1 : offset)
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
                    'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970.jpg)',
                  backgroundSize: 'cover',
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
              <Animator animation={batch(MoveIn(0, sh.current * 2), Sticky())}>
                <div className="relative z-2 w-full p-5" id="">
                  <h1 className="none block text-center text-white max-lg:text-4xl sm:max-lg:text-5xl lg:text-[92px]">
                    <span className="whitespace-nowrap text-white">
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
                    </span>
                    <br />
                    <span className="whitespace-nowrap text-white">
                      telah memilih travel <br />
                      pilihan kami
                    </span>
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
              className="fixed h-dvh w-dvw items-center justify-center bg-cover bg-fixed bg-no-repeat"
              style={{
                top: 0,
                left: 0,
                backgroundImage:
                  'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970.jpg)',
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
        <TravelImageSection />
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

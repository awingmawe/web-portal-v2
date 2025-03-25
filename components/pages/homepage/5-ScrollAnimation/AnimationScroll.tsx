'use client'

import { SimpleInterpolation } from '@/lib/utils'
import { Fragment } from 'react'
import {
  Animator,
  batch,
  FadeIn,
  ScrollContainer,
  ScrollPage,
} from 'react-scroll-motion'

function OverscrollTracker({ children }: { children?: React.ReactNode }) {
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
            className="w-full"
          >
            <div
              className="h-screen items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970.jpg)',
              }}
              id="image-kabbah"
            >
              <div className="relative w-full">
                <Animator
                  animation={batch({
                    out: {
                      style: {
                        display: 'none ',
                      },
                    },
                  })}
                >
                  <p className="text-xl-regular absolute top-60 left-55 z-10 inline-block">
                    Not just a service, It’s an...
                  </p>
                </Animator>
                <div className="flex h-screen w-full items-center justify-center bg-white px-2.5 py-1.5 text-center text-[220px] font-bold text-black mix-blend-screen">
                  <Animator
                    animation={batch(
                      {
                        out: {
                          style: {
                            transform: (value: number) => {
                              const element =
                                document.getElementById('100kjamaah')

                              if (value < 0.5) {
                                if (element) {
                                  element.style.opacity = '0'
                                }
                                return `scale(${SimpleInterpolation(0, 220, value)})`
                              } else {
                                if (element) {
                                  element.style.opacity = '1'
                                }
                                return `scale(${SimpleInterpolation(0, 220, 0.5)}`
                              }
                            },
                          },
                        },
                      },
                      {
                        out: {
                          style: {
                            transform: (value: number) =>
                              `translate(${SimpleInterpolation(-50, -60, value)}px, ${SimpleInterpolation(50, 90, value)}px)`,
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
                    <span className="relative text-black">E</span>
                    <span className="relative text-black">x</span>
                    <span className="relative text-black">p</span>
                    <span className="relative text-black">e</span>
                    <span className="relative text-black">r</span>
                    <span className="relative text-black">i</span>
                    <span className="relative text-black">e</span>
                    <span className="relative text-black">n</span>
                    <span className="relative text-black">c</span>
                    <span className="relative text-black">e</span>
                  </Animator>
                </div>
              </div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator
            animation={batch({
              in: {
                style: {
                  opacity: (value: number) => value,
                },
              },
              out: {
                style: {
                  left: () => `50%`,
                  top: () => `50%`,
                  transform: 'translate(-50%, -50%)',
                  position: 'fixed',
                  transition: 'opacity 0.3s ease-in-out',
                },
              },
            })}
            className="h-screen w-full"
          >
            <div
              className="h-screen items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(https://storage.googleapis.com/m101-prods/about-us/674c820fbd0e8e39b03a4958c7e13970.jpg)',
              }}
              id="100kjamaah"
            >
              <div className="h-full w-full bg-[#00000080] p-5" id="">
                <h1 className="mt-20 block text-center text-[92px] text-white">
                  <span className="font-bold text-white">100.000+</span> Jamaah
                  <br />
                  telah memilih travel pilihan kami
                </h1>
              </div>
              <div className="h-full w-full bg-[#00000080] p-5" id="">
                <h1 className="mt-20 block text-center text-[92px] text-white">
                  <span className="font-bold text-white">100.000+</span> Jamaah
                  <br />
                  telah memilih travel pilihan kami
                </h1>
              </div>
              <div className="h-full w-full bg-[#00000080] p-5" id="">
                <h1 className="mt-20 block text-center text-[92px] text-white">
                  <span className="font-bold text-white">100.000+</span> Jamaah
                  <br />
                  telah memilih travel pilihan kami
                </h1>
              </div>
              <div className="h-full w-full bg-[#00000080] p-5" id="">
                <h1 className="mt-20 block text-center text-[92px] text-white">
                  <span className="font-bold text-white">100.000+</span> Jamaah
                  <br />
                  telah memilih travel pilihan kami
                </h1>
              </div>
              <div className="h-full w-full bg-[#00000080] p-5" id="">
                <h1 className="mt-20 block text-center text-[92px] text-white">
                  <span className="font-bold text-white">100.000+</span> Jamaah
                  <br />
                  telah memilih travel pilihan kami
                </h1>
              </div>
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </Fragment>
  )
}

export default OverscrollTracker

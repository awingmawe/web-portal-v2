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
              className="flex h-screen items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(https://s3-alpha-sig.figma.com/img/31d5/8361/674c820fbd0e8e39b03a4958c7e13970?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=r1IzPLQVQ5lMcBh-xAXgWslX~mlzB9XzujifrbWttvpeii-lMGAazluuoMB22f6bpBkCpZt8sY6GREzUXGDSSfcQHyGoC0hRKgKoFbLgdxw38pFc5gcMenRRaQKygUPOBf8xLD7yvQZJKpYjK5De7Rw2wXyIShjtoKRimOQjkbuz5vUL0ZCd1dZ1pV5zXwbWrbHlvt6S4fLc-2~BcbOZtLip1eqSnY96CtLYo2cMK9aYqqz5VktbsdWENoY1Fu0Xx6i0PbnwobAoA8WoCC~PG7vhUVWtaxX8hq74CSGlasyMOJBezAZwwt1xf0279-xpqulm52LzNthSyKj~~qw1FA__)',
              }}
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
                            transform: (value: number) =>
                              `scale(${SimpleInterpolation(0, 220, value)})`,
                          },
                        },
                      },
                      {
                        out: {
                          style: {
                            transform: (value: number) =>
                              `translate(${SimpleInterpolation(-50, -80, value)}px, ${SimpleInterpolation(50, 100, value)}px)`,
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
        {/* <ScrollPage>
          <Animator
            animation={batch({
              in: {
                style: {
                  opacity: 0,
                },
              },
              out: {
                style: {
                  left: () => `50%`,
                  top: () => `50%`,
                  transform: 'translate(-50%, -50%)',
                  position: 'fixed',
                  opacity: 1,
                },
              },
            })}
            className="w-full"
          >
            <div
              className="flex h-screen items-center justify-center bg-cover bg-fixed bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(https://s3-alpha-sig.figma.com/img/31d5/8361/674c820fbd0e8e39b03a4958c7e13970?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=r1IzPLQVQ5lMcBh-xAXgWslX~mlzB9XzujifrbWttvpeii-lMGAazluuoMB22f6bpBkCpZt8sY6GREzUXGDSSfcQHyGoC0hRKgKoFbLgdxw38pFc5gcMenRRaQKygUPOBf8xLD7yvQZJKpYjK5De7Rw2wXyIShjtoKRimOQjkbuz5vUL0ZCd1dZ1pV5zXwbWrbHlvt6S4fLc-2~BcbOZtLip1eqSnY96CtLYo2cMK9aYqqz5VktbsdWENoY1Fu0Xx6i0PbnwobAoA8WoCC~PG7vhUVWtaxX8hq74CSGlasyMOJBezAZwwt1xf0279-xpqulm52LzNthSyKj~~qw1FA__)',
              }}
            ></div>
          </Animator>
        </ScrollPage> */}
      </ScrollContainer>
    </Fragment>
  )
}

export default OverscrollTracker

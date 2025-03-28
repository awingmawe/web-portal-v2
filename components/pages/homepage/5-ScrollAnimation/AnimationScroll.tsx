/* eslint-disable @next/next/no-img-element */
'use client'

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

function OverscrollTracker({ children }: { children?: React.ReactNode }) {
  const [endExperience, setEndExperience] = useState(false)
  const sh = useRef<number>(800)

  useEffect(() => {
    sh.current = window.screen.height
  }, [])

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
                  <p className="text-xl-regular absolute top-60 left-55 z-10 inline-block">
                    Not just a service, It’s an...
                  </p>
                </Animator>
                <div
                  className="absolute top-[0] left-[0] h-full w-full bg-[#00000080]"
                  id="bg-overlay-1"
                />
                <div className="flex h-screen w-full items-center justify-center bg-white px-2.5 py-1.5 text-center text-[220px] font-bold text-black mix-blend-screen">
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
                              const tx = -58.5 * (offset > 1 ? 1 : offset)
                              const ty = 74 * (offset > 1 ? 1 : offset)
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
              id="100kjamaah"
            >
              <Animator animation={batch(MoveIn(0, sh.current * 2), Sticky())}>
                <div className="relative z-2 w-full p-5" id="">
                  <h1 className="none block text-center text-[92px] text-white">
                    <span className="whitespace-nowrap text-white">
                      <span className="relative font-bold text-white">
                        100.000+{' '}
                        <Image
                          src="/images/yellow-underline.svg"
                          width={490}
                          height={68}
                          alt="line"
                          style={{
                            position: 'absolute',
                            top: 80,
                            left: -48,
                          }}
                        />
                      </span>
                      Jamaah
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
              <h1 className="none block text-center text-[92px] text-white">
                <span className="relative font-bold text-white">
                  100.000+{' '}
                  <Image
                    src="/images/yellow-underline.svg"
                    width={490}
                    height={68}
                    alt="line"
                    style={{
                      position: 'absolute',
                      top: 80,
                      left: -48,
                    }}
                  />
                </span>
                Jamaah
                <br />
                telah memilih travel <br />
                pilihan kami
              </h1>
            </div>
          </>
        )}
        <div className="relative z-2 mb-[560px] flex flex-row justify-center">
          <div
            className="relative flex w-full items-center justify-center"
            style={{
              maxWidth: 1360,
              paddingTop: 240,
            }}
          >
            <Image
              src="/images/experience-dashed.svg"
              width={878}
              height={2250}
              alt="dashed"
            />
            <div className="absolute top-[0] left-[0] flex h-[534px] w-[756px] flex-col rounded-[20px] bg-white p-2">
              <div
                className="h-[415px] w-full rounded-[20px] bg-[black]"
                style={{
                  backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
              <div className="color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball] text-[28px] leading-[32px]">
                Noor Abika Tours & Travel <br />
                Oktober 2024
              </div>
            </div>
            <div className="absolute top-[420px] right-[0] flex h-[675px] w-[432px] flex-col rounded-[20px] bg-white p-2">
              <div
                className="flex h-[572px] w-full rounded-[20px] bg-[black]"
                style={{
                  backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
              <div className="color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball] text-[28px] leading-[32px]">
                Tazkia Tours & Travel <br />
                Juni 2024
              </div>
            </div>
            <div className="absolute top-[800px] left-[48px] flex h-[509px] w-[626px] flex-col rounded-[20px] bg-white p-2">
              <div
                className="flex h-[405px] w-full rounded-[20px] bg-[black]"
                style={{
                  backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
              <div className="color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball] text-[28px] leading-[32px]">
                Amarcy Travel <br />
                Agustus 2024
              </div>
            </div>

            <div className="absolute top-[1400px] right-[120px] flex h-[477px] w-[526px] flex-col rounded-[20px] bg-white p-2">
              <div
                className="flex h-[373px] w-full rounded-[20px] bg-[black]"
                style={{
                  backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
              <div className="color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball] text-[28px] leading-[32px]">
                Berkah Cinta Sholawat <br />
                November 2024
              </div>
            </div>
            <div className="absolute top-[1680px] left-[0] flex h-[761px] w-[513px] flex-col rounded-[20px] bg-white p-2">
              <div
                className="flex h-[657px] w-full rounded-[20px] bg-[black]"
                style={{
                  backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
              <div className="color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball] text-[28px] leading-[32px]">
                Jejak Imani <br />
                Oktober 2024
              </div>
            </div>
            <div className="absolute top-[2160px] right-[0px] flex h-[700px] w-[498px] flex-col rounded-[20px] bg-white p-2">
              <div
                className="flex h-[596px] w-full rounded-[20px] bg-[black]"
                style={{
                  backgroundImage: `url(https://storage.googleapis.com/m101-prods/about-us/9960aefdd2be50e21cbef5da7c8e120b.jpg)`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
              <div className="color-[#30302F] flex flex-auto items-center justify-center text-center font-[Playball] text-[28px] leading-[32px]">
                Madani Travel <br />
                November 2024
              </div>
            </div>
          </div>
        </div>
        {/* Pembayaran */}
        <div className="relative z-[3] bg-[#0000001A] py-2 backdrop-blur-[50px]">
          <div className="relative container m-auto flex">
            <div className="flex-auto pt-32 text-white">
              <div style={{ marginBottom: 32 }}>
                <p className=" spacing-[2%] text-[72px] leading-[72px] font-semibold text-white">
                  Pembayaran Mudah
                  <br />
                  dan Aman
                </p>
              </div>
              <div
                className="[&>*] font-light [&>*]:text-[16px] [&>*]:leading-[120%] [&>*]:text-white"
                style={{
                  maxWidth: 658,
                  marginBottom: 40,
                }}
              >
                <p>
                  Muslim101 percaya bahwa kenyamanan dan transparansi dalam
                  bertransaksi adalah hal yang utama, sehingga kami menghadirkan
                  proses pembayaran yang mudah, aman, dan tepercaya dengan
                  beragam pilihan bank sesuai syariat Islam.
                </p>
                <p className="mt-4 font-semibold">Kemudahan</p>
                <p>Bayar sekarang atau nanti, pilih sesuka hati!</p>

                <p className="mt-4 font-semibold">Keamanan</p>
                <p>
                  Setiap transaksi selalu kami awasi dengan cermat, memastikan
                  perjalananmu pasti terpenuhi.
                </p>

                <p className="mt-4 font-semibold">Kenyamanan</p>
                <p>
                  Pesan di mana saja, kapan saja, notifikasi up-to-date selalu
                  menyapa.
                </p>
              </div>
              <button
                className="bg-primary flex items-center px-8 text-[12px]"
                style={{
                  height: 48,
                  borderRadius: 48,
                  whiteSpace: 'nowrap',
                  marginBottom: 32,
                }}
              >
                Cari Paket Umroh Sekarang
                <Image
                  src="/images/arrow-circle-right.svg"
                  width={14}
                  height={14}
                  alt="arrow"
                  className="ml-2"
                />
              </button>
              <div
                className="relative z-2 flex flex-wrap items-center gap-4"
                style={{
                  maxWidth: 720,
                }}
              >
                {[
                  {
                    img: '/images/bank-mandiri.svg',
                    label: 'mandiri',
                  },
                  {
                    img: '/images/bank-bni.svg',
                    label: 'bni',
                  },
                  {
                    img: '/images/bank-bri.svg',
                    label: 'bri',
                  },
                  {
                    img: '/images/bank-permata.svg',
                    label: 'permata',
                  },
                  {
                    img: '/images/bank-bsi.svg',
                    label: 'bsi',
                  },
                  {
                    img: '/images/bank-cimb.svg',
                    label: 'cimb',
                  },
                  {
                    img: '/images/bank-bca.svg',
                    label: 'bca',
                  },
                  {
                    label: 'other',
                  },
                ].map((each, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-[20px] bg-white"
                    style={{
                      height: 68,
                      width: 138,
                    }}
                  >
                    {each.img ? (
                      <Image
                        src={each.img}
                        alt={each.label}
                        width={104}
                        height={32}
                      />
                    ) : (
                      <p className="text-[14px]">+ Bank Lainnya</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <img src="/images/easy-payment.png" alt="easy-payment" />
          </div>
          <img
            src="/images/pattern-1.svg"
            alt="pattern"
            className="absolute bottom-0 left-0"
          />
        </div>
      </div>
    </Fragment>
  )
}

export default OverscrollTracker

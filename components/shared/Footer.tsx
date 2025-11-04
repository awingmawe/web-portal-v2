import { AppStoreIcon } from '@/components/icons/appstore'
import { CallSolidIcon } from '@/components/icons/call-solid'
import { MailSolidIcon } from '@/components/icons/mail-solid'
import { PlaystoreIcon } from '@/components/icons/playstore'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Fragment } from 'react'

interface FooterProps {
  className?: string
  type?: 'normal' | 'compact'
}

export default function Footer({
  className = '',
  type = 'normal',
}: FooterProps) {
  return (
    <footer
      className={`${cn('w-full border border-t border-neutral-200 bg-white px-4 py-5   max-lg:mb-30 lg:pb-5', className)}`}
    >
      <section className="container mx-auto max-lg:px-4">
        {type == 'normal' && (
          <Fragment>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-7">
              <div className="col-span-2 space-y-4 max-lg:mb-5">
                <h3 className="text-m-semibold text-neutral-800">
                  Kontak Kami
                </h3>
                <ul className="list-none space-y-2">
                  <li>
                    <Link
                      href="https://www.instagram.com/muslim101.id/"
                      className="text-m-regular flex items-center gap-2 text-neutral-900"
                    >
                      <MailSolidIcon /> cs@muslim101.id
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.instagram.com/muslim101.id/"
                      className="text-m-regular flex items-center gap-2 text-neutral-900"
                    >
                      <CallSolidIcon /> +62 888‑8551‑101
                    </Link>
                  </li>
                </ul>
                <h3 className="text-m-semibold text-neutral-800">
                  Jam Operasional
                </h3>
                <ul className="text-m-regular list-none space-y-2">
                  <li>Senin-Sabtu: 09.00-18.00 WIB</li>
                  <li>Minggu & Tanggal Merah: Libur</li>
                </ul>
              </div>

              {/* Column 1 */}
              <div className="space-y-4">
                <h3 className="text-m-semibold text-neutral-800">Muslim101</h3>
                <ul className="list-none space-y-2">
                  <li>
                    <Link
                      href="/about-us"
                      className="text-m-regular text-neutral-900"
                    >
                      Tentang Kami
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      href={`https://wa.me/${CALL_CENTER}`}
                      className="text-m-regular text-neutral-900"
                    >
                      Bantuan
                    </Link>
                  </li> */}
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <h3 className="text-m-semibold text-neutral-800">
                  Produk Kami
                </h3>
                <ul className="list-none space-y-2">
                  <li>
                    <Link
                      href="/travel/list"
                      className="text-m-regular text-neutral-900"
                    >
                      Umroh
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wukala"
                      className="text-m-regular text-neutral-900"
                    >
                      Umroh Personal
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wukala"
                      className="text-m-regular text-neutral-900"
                    >
                      Haji
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <h3 className="text-m-semibold text-neutral-800">
                  Kemitraan 101
                </h3>
                <ul className="list-none space-y-2">
                  <li>
                    <Link
                      href="/travel/list"
                      className="text-m-regular text-neutral-900"
                    >
                      Travel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/wukala"
                      className="text-m-regular text-neutral-900"
                    >
                      Wukala ~ <span className="italic">Affiliate</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 4 */}
              <div className="space-y-4">
                <h3 className="text-m-semibold text-neutral-800">Ikuti Kami</h3>
                <ul className="list-none space-y-2">
                  <li>
                    <Link
                      href="https://www.instagram.com/muslim101.id/"
                      className="text-m-regular text-neutral-900"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/umroh101com"
                      className="text-m-regular text-neutral-900"
                    >
                      Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.youtube.com/@muslim101id"
                      className="text-m-regular text-neutral-900"
                    >
                      Youtube
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/company/muslim101/"
                      className="text-m-regular text-neutral-900"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.tiktok.com/@muslim101.id"
                      className="text-m-regular text-neutral-900"
                    >
                      Tiktok
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-m-semibold text-neutral-800">Lainnya</h3>
                <ul className="list-none space-y-2">
                  <li>
                    <Link
                      href="https://www.instagram.com/growat101"
                      className="text-m-regular text-neutral-900 italic"
                    >
                      Grow at 101
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/article"
                      className="text-m-regular text-neutral-900"
                    >
                      Artikel
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-gray-200"></div>
          </Fragment>
        )}

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex flex-col items-center gap-2 md:mb-0 md:flex-row md:gap-4">
            <span className="text-m-regular text-neutral-800">
              © 2025. PT. Muslim Seratus Satu.
            </span>
            <div className="flex items-center">
              <span className="mx-4 hidden text-xs md:inline">•</span>
              <Link
                href="/legal/syarat-ketentuan"
                className="text-m-regular text-neutral-900"
              >
                Syarat & Ketentuan
              </Link>
              <span className="mx-4 text-xs">•</span>
              <Link
                href="/legal/kebijakan-privasi"
                className="text-m-regular text-neutral-900"
              >
                Kebijakan Privasi
              </Link>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://play.google.com/store/apps/details?id=com.muslim101.muslimapp"
              aria-label="Get it on Google Play"
            >
              <PlaystoreIcon />
            </Link>
            <Link
              href="https://apps.apple.com/id/app/muslim-app/id6742533171"
              aria-label="Download on the App Store"
            >
              <AppStoreIcon />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  )
}

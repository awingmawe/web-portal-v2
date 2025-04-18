import { AppStoreIcon } from '@/components/icons/appstore'
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
      className={`${cn('w-full border border-t border-neutral-200 bg-white py-5 max-lg:mb-30 lg:pb-5', className)}`}
    >
      <section className="container mx-auto max-lg:px-4">
        {type == 'normal' && (
          <Fragment>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
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
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Karir
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Bantuan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal/syarat-ketentuan"
                      className="text-m-regular text-neutral-900"
                    >
                      Syarat & Ketentuan
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/legal/kebijakan-privasi"
                      className="text-m-regular text-neutral-900"
                    >
                      Kebijakan Privasi
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <h3 className="text-m-semibold text-neutral-800">101</h3>
                <ul className="list-none space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-m-regular text-neutral-900 italic"
                    >
                      Life at 101
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Artikel
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Muslimpedia
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Wukala Academy
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
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Perusahaan
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Travel
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Wukala ~ <span className="italic">Affiliate</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Syarat & Ketentuan
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-m-regular text-neutral-900">
                      Kebijakan Privasi
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
            <Link href="#" aria-label="Download on the App Store">
              <AppStoreIcon />
            </Link>
          </div>
        </div>
      </section>
    </footer>
  )
}

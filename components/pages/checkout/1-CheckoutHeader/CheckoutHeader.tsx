import ButtonInfoTrans from '@/components/pages/detail-package/2-PackageVariant/component/ButtonInfoTrans'
import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CheckoutHeader = ({
  currency,
  packageType,
  title,
}: {
  currency: string
  packageType: string
  title: string
}) => {
  const { lg } = useTailwindBreakpoint()
  const router = useRouter()
  return (
    <>
      <div className="mb-7 flex items-center justify-between align-middle">
        {/* Modals for showing notes for kurs in USD and IDR for hajj packages */}

        <div
          className="inline-flex cursor-pointer items-center gap-1 max-lg:hidden"
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
        >
          <Image
            src="/images/arrow-left.svg"
            width={24}
            height={24}
            alt="arrow"
          />

          <p className="heading-3-semibold ml-1">Konfirmasi Pembelian Paket</p>
        </div>

        {!lg && (
          <div>
            <ButtonInfoTrans
              currency={currency}
              packageType={packageType}
              title={title}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default CheckoutHeader

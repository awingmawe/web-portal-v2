import Image from 'next/image'
import { useRouter } from 'next/navigation'

const CheckoutHeader = () => {
  const router = useRouter()

  return (
    <div
      className="mb-7 inline-flex cursor-pointer items-center gap-1 max-lg:hidden"
      onClick={(e) => {
        e.preventDefault()
        router.back()
      }}
    >
      <Image src="/images/arrow-left.svg" width={24} height={24} alt="arrow" />

      <p className="heading-3-semibold ml-1">Konfirmasi Pembelian Paket</p>
    </div>
  )
}

export default CheckoutHeader

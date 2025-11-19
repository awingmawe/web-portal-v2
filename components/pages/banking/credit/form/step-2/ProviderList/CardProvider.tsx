import ListCoverageContent from '@/components/pages/banking/credit/form/step-2/ContentDialog/ListCoverageContent'
import LayoutDrawerDialog from '@/components/shared/LayoutDrawerDialog'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import renderHTML from 'react-render-html'

type SupportType = 'supported' | 'not-supported-location' | 'not-supported-org'

const CardProvider = ({
  providerId,
  logo,
  providerName,
  checked,
  onCheckedChange,
  supportType,
  description,
}: {
  providerId?: number
  logo: string
  providerName: string
  checked?: boolean
  onCheckedChange?: (isChecked: boolean) => void
  supportType: SupportType
  description: string
}) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const isSupported = supportType === 'supported'

  const textNotSupported = () => {
    if (supportType === 'not-supported-org') {
      return `Travel penyelenggara tidak terdaftar pada program Pembiayaan ${providerName}. `
    }
    if (supportType === 'not-supported-location') {
      return `Wilayah kamu belum terjangkau oleh ${providerName}. `
    }
  }
  const triggerNotSupported = () => {
    if (supportType === 'not-supported-org') {
      return `Cari Paket Lain`
    }
    if (supportType === 'not-supported-location') {
      return `Lihat Area Jangkauan ${providerName}`
    }
  }
  return (
    <div
      className={`h-[300px] ${checked && isSupported ? 'border-primary-500' : ''} col-span-1 rounded-[20px] border border-[#E8E8E880] bg-[#F7F7F780]`}
    >
      {/* Header Card and Provider Description */}
      <div
        className={`${!isSupported && 'opacity-50'} ${checked && isSupported ? 'border-primary-500' : ''} rounded-bottom-2xl flex items-center justify-between rounded-[20px] border border-x-0 border-t-0 border-[#E8E8E880] bg-white px-3 py-4`}
      >
        <div className="flex items-center gap-1">
          <Image
            src={logo || '/images/logo-koper.svg'}
            alt={providerName}
            width={24}
            height={24}
          />
          <p className="text-m-semibold">{providerName}</p>
        </div>
        <Checkbox
          checked={checked || false}
          onCheckedChange={onCheckedChange}
          disabled={!isSupported}
          classNameParent="!p-0"
          className={`${!isSupported ? 'hidden' : ''}`}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 overflow-hidden p-4">
        {/* Tampilkan pesan hanya jika tidak didukung */}
        {!isSupported && (
          <p className="text-error-500 text-m-medium">
            {textNotSupported()}
            {supportType === 'not-supported-org' ? (
              <Link
                href="/search?package=pembiayaan"
                className="text-info-500 cursor-pointer underline"
              >
                {triggerNotSupported()}
              </Link>
            ) : (
              <LayoutDrawerDialog
                isOpen={isLocationOpen}
                setIsOpen={setIsLocationOpen}
                trigger={
                  <span className="text-info-500 cursor-pointer underline">
                    {triggerNotSupported()}
                  </span>
                }
                content={
                  <ListCoverageContent
                    providerName={providerName}
                    providerId={providerId || 0}
                  />
                }
                title={
                  <p className="text-l-medium max-lg:p-4">
                    Area Jangkauan {providerName}
                  </p>
                }
              />
            )}
          </p>
        )}
        <p className="text-m-semibold">Ketentuan</p>
        <div className="text-m-regular max-h-[130px] overflow-y-auto text-neutral-500">
          {renderHTML(description)}
        </div>
      </div>
    </div>
  )
}

export default CardProvider

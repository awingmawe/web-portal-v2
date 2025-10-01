'use client'

import Image from 'next/image'

interface ReferralSectionProps {
  isHaveRefferalCode: boolean
  referralCode: string
  setReferralCode: (code: string) => void
  wukalaSetting: boolean
  handleCheckReferral: () => void
  handleRemoveReferralCode: () => void
  isReferralCodeChecked: boolean
  isReferralValid: boolean
}

const ReferralSection = ({
  isHaveRefferalCode,
  referralCode,
  setReferralCode,
  wukalaSetting,
  handleCheckReferral,
  handleRemoveReferralCode,
  isReferralCodeChecked,
  isReferralValid,
}: ReferralSectionProps) => {
  if (isHaveRefferalCode) {
    return null
  }

  return (
    <div className="rounded-[20px] border border-neutral-100 max-lg:mx-4 max-lg:p-3">
      <div className="flex items-center max-lg:mb-2.5 max-lg:gap-1 lg:gap-3 lg:p-4">
        <Image
          src="/images/discount-shape.svg"
          width={24}
          height={24}
          alt="discount"
        />
        <p className="text-l-semibold max-lg:text-sm max-lg:font-medium">
          Kode Referral
        </p>
      </div>

      {/* Divider */}
      <div className="h-[1px] w-full bg-[#c9c9c9] max-lg:hidden" />
      <div className="lg:p-4">
        <p className="text-m-regular mb-5 max-lg:text-xs max-lg:leading-4">
          Apakah kamu punya kode referal? pakai kode tersebut untuk dapetin
          potongan harga!
        </p>

        <div className="mt-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Masukkan kode referal"
            className={`flex-1 rounded-full border px-4 py-2 text-sm text-gray-700 placeholder:text-neutral-400 ${
              isReferralCodeChecked
                ? isReferralValid
                  ? 'border-success-500'
                  : 'border-error-500'
                : 'border-neutral-100'
            }`}
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            disabled={wukalaSetting}
          />
          <button
            className="cursor-pointer rounded-full bg-[#ffc14b] px-6 py-2 text-sm font-semibold text-[#131313] transition hover:opacity-90"
            onClick={
              wukalaSetting ? handleRemoveReferralCode : handleCheckReferral
            }
          >
            {wukalaSetting ? 'Hapus' : 'Cek'}
          </button>
        </div>

        {referralCode && isReferralCodeChecked && (
          <p
            className={`text-s-regular mt-2.5 font-medium ${
              isReferralValid ? 'text-success-500' : 'text-error-500'
            }`}
          >
            {isReferralValid
              ? `Kode referral berhasil digunakan.`
              : `Kode referral tidak terdaftar`}
          </p>
        )}
      </div>
    </div>
  )
}

export default ReferralSection

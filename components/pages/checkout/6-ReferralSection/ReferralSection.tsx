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
    <div className="rounded-[20px] border border-neutral-100 p-6">
      <div>
        <div className="mb-4 flex items-center gap-[12px]">
          <Image
            src="/images/discount-shape.svg"
            width={24}
            height={24}
            alt="discount"
          />
          <span className="font-bold text-gray-800">Kode Referral</span>
        </div>

        <div className="mb-4 h-[1px] w-full bg-[#D2D2D1]" />

        <p className="mb-5 font-medium text-gray-600">
          Apakah kamu punya kode referal? pakai kode tersebut untuk dapetin
          potongan harga!
        </p>

        <div className="mt-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Masukkan kode referal"
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700 placeholder:text-gray-400"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            disabled={wukalaSetting}
          />
          <button
            className="cursor-pointer rounded-full bg-[#FFC100] px-6 py-2 text-sm font-semibold text-[#30302F] transition hover:opacity-90"
            onClick={
              wukalaSetting ? handleRemoveReferralCode : handleCheckReferral
            }
          >
            {wukalaSetting ? 'Hapus' : 'Cek'}
          </button>
        </div>

        {referralCode && isReferralCodeChecked && (
          <p
            className={`mt-5 font-medium ${
              isReferralValid ? 'text-[#00B97D]' : 'text-red-500'
            }`}
          >
            {isReferralValid
              ? `Kode referral berhasil digunakan`
              : `Kode referral tidak valid!`}
          </p>
        )}
      </div>
    </div>
  )
}

export default ReferralSection

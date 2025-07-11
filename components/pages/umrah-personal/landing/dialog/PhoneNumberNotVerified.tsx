import { Warning2Icon } from '@/components/icons/warning'
import { Input } from '@/components/ui/input'

const PhoneNumberNotVerified = ({ name }: { name: string }) => {
  return (
    <div className="flex flex-col gap-5 max-lg:gap-3">
      {/* Warning Icon */}
      <div className="flex items-center gap-6 max-lg:gap-3">
        <div className="bg-warning-100 flex rounded-lg p-2.5">
          <Warning2Icon className="text-primary-500" />
        </div>
        <p className="heading-3-semibold max-lg:text-xl max-lg:leading-[26px] max-lg:font-medium">
          Tunggu, {name}. Isi dulu nomor telepon ya!
        </p>
      </div>

      {/* Content */}
      <p className="text-m-regular text-neutral-500">
        Sebelum membuat paket umroh personal, harap mengisi nomor telepon anda.
        Setelah mengisi nomor telepon, anda dapat kembali untuk membuat paket
        umroh personal!
      </p>
      <Input
        placeholder="Masukkan nomor telepon"
        type="tel"
        inputMode="numeric"
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '')
          e.target.value = value
        }}
      />
    </div>
  )
}

export default PhoneNumberNotVerified

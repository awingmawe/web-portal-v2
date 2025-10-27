// TODO-REFACTOR: move to common directory

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CircleChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Fragment } from 'react'

const TitleKurs = ({ currency }: { currency: string }) => {
  const title = [
    { key: 'personal', title: 'Pahami Alur Transaksi Umroh Personal Kamu!' },
    { key: 'umrah', title: 'Pahami Alur Transaksi Umroh Kamu!' },
  ] as const

  const matched = title.find(
    (t) => t.key.toLowerCase() === currency.toLowerCase()
  )

  const displayTitle =
    matched?.title ??
    `Pahami Alur Transaksi Haji Harga ${
      currency === 'IDR' ? 'Rupiah' : 'Dollar'
    } Sebelum Kamu Checkout!`

  return (
    <p className="heading-3-bold text-center max-lg:text-sm max-lg:leading-5 max-lg:font-semibold">
      {displayTitle}
    </p>
  )
}

interface Step {
  id?: number
  arrow?: boolean
  image: string
  description?: string
  subDescription?: string
}

const steps: Step[] = [
  {
    id: 1,
    image: '/illustration/step-1-kurs.svg',
    description:
      'Setelah melakukan checkout, tunggu 1x24 jam hingga travel menerbitkan invoice pembayaran',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 2,
    image: '/illustration/step-2-kurs.svg',
    description:
      'Lakukan pembayaran DP sesuai dengan nominal pada invoice yang diberikan',
    subDescription: '*Lakukan pembayaran DP sesuai masa berlaku kurs',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 3,
    image: '/illustration/step-3-kurs.svg',
    description:
      'Lengkapi data jemaah sesuai identitas resmi untuk proses keberangkatan',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 4,
    image: '/illustration/step-4-kurs.svg',
    description:
      'Kamu siap untuk berangkat haji sesuai jadwal yang ditentukan!',
    subDescription:
      '*Kamu akan dihubungi langsung oleh travel untuk detail lainnya',
  },
]

const stepsPersonal: Step[] = [
  {
    id: 1,
    image: '/illustration/step-2-kurs.svg',
    description:
      'Tunggu maks. 2x24 jam untuk penawaran travel sesuai permintaan kamu',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 2,
    image: '/illustration/step-personal-2.svg',
    description:
      'Pilih penawaran dari travel yang sesuai dengan permintaan kamu',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 3,
    image: '/illustration/step-1-kurs.svg',
    description: 'Lakukan pembayaran DP sesuai dengan nominal yang diminta',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 4,
    image: '/illustration/step-3-kurs.svg',
    description: 'Lakukan pengisian data jemaah dan lunasi sisa pembayaran',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 5,
    image: '/illustration/step-4-kurs.svg',
    description: 'Kamu siap untuk berangkat umroh!',
    subDescription:
      '*Kamu akan dihubungi langsung oleh travel untuk detail lainnya',
  },
]

const stepsUmrah: Step[] = [
  {
    id: 1,
    image: '/illustration/step-1-kurs.svg',
    description: 'Lakukan pembayaran DP sesuai dengan ketentuan minimum',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 2,
    image: '/illustration/step-2-kurs.svg',
    description:
      'Tunggu konfirmasi travel selama 1x24 Jam terkait ketersediaan kuota',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 3,
    image: '/illustration/step-3-kurs.svg',
    description: 'Lakukan pengisian data jemaah dan lunasi sisa pembayaran ',
    subDescription: '*Lengkapi satu bulan sebelum keberangkatan',
  },
  {
    arrow: true,
    image: '/illustration/arrow-line.svg',
  },
  {
    id: 4,
    image: '/illustration/step-4-kurs.svg',
    description: 'Kamu siap untuk berangkat umroh!',
  },
]

const ContentKurs = ({ currency }: { currency: string }) => {
  let filteredSteps
  if (currency === 'umrah') {
    filteredSteps = stepsUmrah
  } else if (currency === 'personal') {
    filteredSteps = stepsPersonal
  } else if (currency === 'IDR') {
    filteredSteps = steps.slice(2)
  } else {
    filteredSteps = steps
  }

  return (
    <Fragment>
      <div className="relative my-3 flex items-center justify-between overflow-hidden max-lg:flex-col max-lg:gap-4 max-lg:overflow-y-auto">
        {filteredSteps.map((step, index) =>
          step.id ? (
            <div
              key={`kurs-step-${index + 1}`}
              className={`${index % 2 === 0 ? 'flex-1' : 'flex-2'} flex h-full flex-col items-center gap-2 lg:justify-between`}
            >
              <p className="text-l-semibold border-primary-500 h-12 w-12 place-content-center rounded-full border-5 text-center">
                {currency === 'IDR' ? step.id - 1 : step.id}
              </p>
              <div className="relative max-lg:h-[130px] max-lg:w-[130px] lg:h-[10vw] lg:w-[10vw]">
                <Image src={step.image} fill alt={step.description || ''} />
              </div>
              <p className="text-m-medium flex-2 text-center">
                {step.description}
                {step.subDescription && (
                  <span className="text-s-regular text-neutral-500">
                    <br />
                    {step.subDescription}
                  </span>
                )}
              </p>
            </div>
          ) : (
            <div
              key={`kurs-arrow-${index + 1}`}
              className="relative h-[80px] w-[80px] max-lg:hidden"
            >
              <Image src={step.image} fill alt={step.description || ''} />
            </div>
          )
        )}
      </div>
    </Fragment>
  )
}

const FooterKurs = ({
  onCheckout,
  checked,
  onCheckedChange,
  disabledCheck,
  disableCheckout,
}: {
  onCheckout: () => void
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabledCheck?: boolean
  disableCheckout?: boolean
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      {!disabledCheck && (
        <Checkbox
          label="Jangan tampilkan informasi ini lagi"
          classNameParent="[&_label]:text-xs [&_label]:font-regular !p-0 [&_label]:text-neutral-500"
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      )}
      {!disableCheckout && (
        <Button
          className="w-full rounded-full py-3"
          variant="default"
          size="lg"
          id="btn-checkout-desktop-kurs"
          onClick={onCheckout}
        >
          Lanjut Checkout
          <CircleChevronRight className="w-[14px]" />
        </Button>
      )}
    </div>
  )
}

export { ContentKurs, FooterKurs, TitleKurs }

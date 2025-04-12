import { ArrowIcon } from '@/components/icons/arrow'
import { Calendar, Calendar2 } from '@/components/icons/calendar'
import { UsersIcon } from '@/components/icons/user'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { formatCurrency } from '@/lib/utils'
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'

export interface TransactionCardProps {
  status: string
  id: string
  packageName: string
  startDate: string
  endDate: string
  createdDate: string
  participants: number
  balance: number
}

export default function TransactionCard({
  status,
  id,
  packageName,
  startDate,
  endDate,
  createdDate,
  participants,
  balance,
}: TransactionCardProps) {
  const renderStatusColor = (status: string) => {
    if (status === 'waiting-approval') {
      return 'bg-warning-100 text-warning-700'
    } else if (status === 'Success') {
      return 'bg-success-100 text-success-700'
    } else if (
      status == 'waiting-cancellation' ||
      status == 'canceled-by-travel' ||
      status == 'canceled-by-user'
    ) {
      return 'bg-error-100 text-error-700'
    } else {
      return 'bg-info-100/50 text-info-700/90'
    }
  }

  const renderStatusText = (status: string) => {
    if (status === 'waiting-approval') {
      return 'Menunggu konfirmasi'
    } else if (status === 'is-paid') {
      return 'Siap Berangkat!'
    } else if (
      status == 'waiting-cancellation' ||
      status == 'canceled-by-travel' ||
      status == 'canceled-by-user'
    ) {
      return 'Dalam Proses Pembatalan'
    } else {
      return 'Menunggu kelengkapan data jamaah dan pelunasan pembayaran'
    }
  }

  return (
    <div className="mt-6 rounded-3xl border border-neutral-200">
      <div
        className={`rounded-t-3xl px-4 pt-4 pb-8  ${renderStatusColor(status)}`}
      >
        <h3 className="text-l-medium text-inherit">
          {renderStatusText(status)}
        </h3>
      </div>
      <div className="-mt-5 overflow-hidden rounded-3xl bg-white shadow-[0px_-5px_4px_0px_#ACACAC1A]">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4">
          <div className="flex items-center gap-2">
            <p className="font-medium">Umroh /</p>
            <p className="text-neutral-500">ID : {id}</p>
          </div>
          <p className="text-m-medium bg-info-100 text-info-700 rounded-full px-6 py-2">
            Akan Datang
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          <div className="flex gap-4 md:col-span-2">
            <div className="h-32 w-32 flex-shrink-0">
              <Image
                src="https://s3-alpha-sig.figma.com/img/feee/b274/22eb8956f0d8154ae410af99ccd96506?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=BNJXpIr2wi2nLXK7DuVCBORx6ncIO~EogGeFCb3gg128XTspQLH9SnTR2V4qyST5WjEc4T98N-YDJQ9YPPnFU6M0ZE25YQzywyA8QuhIxjJ9aleeu2uq8TBRWrj6jY-6tL6c~jKyi~A0xRUGymPj8oNqglNC4UOptfZkFyYrD~I1u7g4Nr7PEadjoRL6-TxQ0BkW4hOIRagSI~22PflOhfx2I7ECq4jiw~a7yDFdtWRasoR26b2nBHloIWe~gLAxW3Ut5N8A4LA8u9a-y5MCjb5nds6K4pR7bhB8ljue1gymYeFRP82N9e4UksvjPzH7yNKkR65fjuPKC53SqH8Yhg__"
                alt="Umroh Package"
                width={128}
                height={128}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-l-semibold">{packageName}</h2>
                <div className="mt-4 flex items-center gap-2">
                  <Calendar2 className="h-5 w-5 text-neutral-500" />
                  <p className="text-m-regular flex items-center text-neutral-500">
                    {dayjs(startDate).locale('id').format('DD MMMM YYYY')}{' '}
                    <ArrowIcon size={20} className="mx-2 text-neutral-500" />{' '}
                    {dayjs(endDate).locale('id').format('DD MMMM YYYY')}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-neutral-500" />
                  <p className="text-m-regular text-neutral-500">
                    {participants} Jamaah
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t border-neutral-100 pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-4">
            <p className="text-m-medium text-neutral-500">Sisa Pembayaran</p>
            <p className="text-l-semibold">{formatCurrency(balance)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-neutral-200 p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <p className="text-s-regular text-neutral-500">Dibuat pada</p>
            <Calendar className="h-4 w-4 text-neutral-500" />
            <p className="text-m-regular text-neutral-500">
              {dayjs(createdDate).locale('id').format('DD MMMM YYYY')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-s-regular mr-4 font-medium text-nowrap text-gray-900">
              Lihat Detail Pesanan
            </p>
            {/* <Button
              variant="outline"
              className="w-full rounded-full border-2 px-8 py-3 text-nowrap"
              disabled
            >
              <ChecklistCircle />
              Pelunasan
            </Button> */}
            <Button
              variant="outline"
              className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
            >
              Bayar Pelunasan
            </Button>
            <Button className="w-full px-4 py-3 text-nowrap">
              Lengkapi Data Jamaah
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="cursor-pointer !rounded-md border border-neutral-900 p-1"
                  variant={'outline'}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="rounded-2xl p-0 px-1">
                <div className="flex flex-col divide-y">
                  <div className="cursor-pointer p-3 hover:bg-gray-50">
                    <p className="text-m-regular text-error-500">
                      Batalkan Pesanan
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

import { ChecklistCircle } from '@/components/icons/checkbox'
import { Button } from '@/components/ui/button'
import { Fragment } from 'react'

export interface TransactionCardFooter {
  detailOnly?: boolean
  isCompletedManifest?: boolean
  isPaidOff: boolean
}

// function renderCancelAction() {
//   return (
//     <div className="flex gap-3">
//       <Button
//         variant="outline"
//         className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
//       >
//         Proses Refund
//       </Button>
//       <Link href={'/search'}>
//         <Button className="w-full px-7 py-3 text-nowrap">
//           Cari Paket Lain
//         </Button>
//       </Link>
//     </div>
//   )
// }

export default function TransactionCardFooter({
  detailOnly,
  isCompletedManifest,
  isPaidOff,
}: TransactionCardFooter) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-s-regular mr-4 font-medium text-nowrap text-gray-900">
        Lihat Detail Pesanan
      </p>
      {!detailOnly && (
        <Fragment>
          {isPaidOff ? (
            <Button
              variant="outline"
              className="w-full rounded-full border-2 px-8 py-3 text-nowrap"
              disabled
            >
              <ChecklistCircle />
              Pelunasan
            </Button>
          ) : (
            status !== 'waiting-approval' && (
              <Button
                variant="outline"
                className="border-primary-500 w-full rounded-full border-2 px-8 py-3 text-nowrap"
              >
                Bayar Pelunasan
              </Button>
            )
          )}
          {!isCompletedManifest && (
            <Button className="w-full px-4 py-3 text-nowrap">
              Lengkapi Data Jemaah
            </Button>
          )}
          {/* <Popover>
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
        </Popover> */}
        </Fragment>
      )}

      {/* {renderCancelAction()} */}
    </div>
  )
}

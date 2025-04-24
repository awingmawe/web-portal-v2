import { useTailwindBreakpoint } from '@/hooks/common/useMediaQuery'

export function TransactionDetailHeader() {
  const { lg } = useTailwindBreakpoint()

  const renderStatusTahapanColor = (status: string) => {
    if (status == 'Akan Datang') {
      return 'bg-info-100 text-info-700'
    } else if (status === 'Selesai') {
      return 'bg-success-100 text-success-700'
    } else if (
      status == 'Dibatalkan Jemaah' ||
      status == 'Dibatalkan Travel' ||
      status == 'Dalam Proses Pembatalan'
    ) {
      return 'bg-error-100 text-error-700'
    } else if (status == 'Waiting') {
      return lg ? '' : 'bg-warning-100 text-warning-700'
    } else {
      return 'bg-neutral-100 text-neutral-700'
    }
  }

  return (
    <div className="mb-4 flex items-center space-x-2 px-4">
      <p
        className={`text-m-medium ${renderStatusTahapanColor('Akan Datang')} relative z-20 rounded-full px-6 py-2 shadow-[2px_0px_4.8px_0px_#202B3324] max-lg:py-1 max-lg:text-xs`}
      >
        Akan Datang
      </p>
      <p
        className={`text-s-medium bg-warning-100 text-warning-700 relative z-10 -ml-10 rounded-full px-6 py-2 py-2.5 pl-10 max-lg:text-xs`}
      >
        Menunggu konfirmasi
      </p>
    </div>
  )
}

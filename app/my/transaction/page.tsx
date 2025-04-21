import { metadata } from '@/app/shared-metadata'
import TransactionCancelled from '@/components/pages/my/1-Transaction/Cancelled/Index'
import TransactionCompleted from '@/components/pages/my/1-Transaction/Completed/Index'
import TransactionUpcoming from '@/components/pages/my/1-Transaction/Upcoming/Index'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Daftar List Transaksi', `Daftar List Transaksi`),
  }
}

export default async function TransactionPage({
  searchParams,
}: {
  searchParams: any
}) {
  const awaitedParams = await searchParams
  const defaultTab = awaitedParams.type || 'upcoming'

  return (
    <div className="mx-auto max-w-7xl lg:px-4">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="scrollbar-hide grid h-auto w-full rounded-none rounded-t-3xl bg-transparent p-0 max-lg:flex max-lg:overflow-x-scroll lg:grid-cols-3">
          <TabsTrigger
            value="upcoming"
            className="cursor-pointer rounded-none border-b-2 p-0 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400 max-lg:w-full"
          >
            <Link
              href={'/my/transaction?type=upcoming'}
              className="h-full w-full px-1 text-inherit max-[360px]:pl-10"
            >
              Akan Datang
            </Link>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="cursor-pointer rounded-none border-b-2 p-0 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400 max-lg:w-full"
          >
            <Link
              href={'/my/transaction?type=completed'}
              className="h-full w-full px-1 text-inherit max-lg:px-3"
            >
              Perjalanan Selesai
            </Link>
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="cursor-pointer rounded-none border-b-2 p-0 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400 max-lg:w-full "
          >
            <Link
              href={'/my/transaction?type=cancelled'}
              className="h-full w-full px-1 text-inherit max-lg:px-3"
            >
              Dibatalkan
            </Link>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6 max-lg:mt-4">
          <TransactionUpcoming />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <TransactionCompleted />
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <TransactionCancelled />
        </TabsContent>
      </Tabs>
    </div>
  )
}

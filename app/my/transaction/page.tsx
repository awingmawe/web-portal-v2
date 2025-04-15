import { metadata } from '@/app/shared-metadata'
import TransactionCompleted from '@/components/pages/my/Transaction/TransactionCompleted'
import TransactionUpcoming from '@/components/pages/my/Transaction/TransactionUpcoming'
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
    <div className="mx-auto max-w-7xl px-4">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-none  bg-transparent p-0">
          <TabsTrigger
            value="upcoming"
            className="cursor-pointer rounded-none border-b-2 p-0 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400"
          >
            <Link
              href={'/my/transaction?type=upcoming'}
              className="h-full w-full px-1"
            >
              Akan Datang
            </Link>
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="cursor-pointer rounded-none border-b-2 p-0 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400"
          >
            <Link
              href={'/my/transaction?type=completed'}
              className="h-full w-full px-1"
            >
              Perjalanan Selesai
            </Link>
          </TabsTrigger>
          {/* <TabsTrigger
            value="cancelled"
            className="cursor-pointer rounded-none border-b-2 p-0 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400"
          >
            <Link
              href={'/my/transaction?type=cancelled'}
              className="h-full w-full px-1"
            >
              Dibatalkan
            </Link>
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <TransactionUpcoming />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <TransactionCompleted />
        </TabsContent>

        {/* <TabsContent value="cancelled" className="mt-6">
          <TransactionCancelled />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

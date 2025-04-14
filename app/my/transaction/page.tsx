import { metadata } from '@/app/shared-metadata'
import EmptyState from '@/components/pages/my/Transaction/EmptyState'
import TransactionUpcoming from '@/components/pages/my/Transaction/TransactionUpcoming'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export async function generateMetadata() {
  return {
    ...metadata('Muslim 101 | Daftar List Transaksi', `Daftar List Transaksi`),
  }
}

export default function TransactionPage() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-3 rounded-none  bg-transparent p-0">
          <TabsTrigger
            value="upcoming"
            className="cursor-pointer rounded-none border-b-2 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400"
          >
            Akan Datang
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="cursor-pointer rounded-none border-b-2 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400"
          >
            Perjalanan Selesai
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="cursor-pointer rounded-none border-b-2 py-4 data-[state=active]:border-neutral-400 data-[state=active]:border-neutral-900 data-[state=active]:text-neutral-900 data-[state=active]:shadow-none data-[state=inactive]:text-neutral-400"
          >
            Dibatalkan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <TransactionUpcoming />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <EmptyState />
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <EmptyState />
        </TabsContent>
      </Tabs>
    </div>
  )
}

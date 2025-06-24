import EmptyState from '@/components/pages/my/1-Transaction/Components/EmptyState'
import TransactionSkeletonLoading from '@/components/pages/my/1-Transaction/Components/TransactionSkeletonLoading'
import TransactionCard from '@/components/pages/my/6-CheckAvailability/Components/Card/TransactionCard'
import InfiniteScroll from '@/components/ui/infinite-scroll'

import { CanceledProvider } from '@/contexts/canceled-package-context'
import { Fragment } from 'react'

interface ListProps {
  isLoading: boolean
  isLoadingMobile: boolean
  lg: boolean
  currentPage: number
  totalPages: number
  setCurrentPage: (value: number) => void
  transactions: any
}

export default function List({
  lg,
  isLoading,
  isLoadingMobile,
  currentPage,
  totalPages,
  setCurrentPage,
  transactions,
}: ListProps) {
  return (
    <Fragment>
      {lg ? (
        <div>
          {isLoadingMobile ? (
            <div className="mt-5">
              <TransactionSkeletonLoading noTabs noFilter noPagination />
            </div>
          ) : (
            <div>
              <InfiniteScroll
                isLoading={isLoading}
                hasMore={currentPage < totalPages}
                next={() => setCurrentPage(currentPage + 1)}
                threshold={0.8}
              >
                {transactions.length > 0 ? (
                  transactions.map((transaction: any) => (
                    <div
                      key={`${transaction.id}-${new Date().getTime()}-${Math.random()}`}
                      className="max-lg:px-3"
                    >
                      <CanceledProvider>
                        <TransactionCard
                          status={
                            transaction.responseTravel === null
                              ? 'Permintaan Diproses'
                              : Number(transaction.responseTravel) <
                                  Number(transaction.valuePeople)
                                ? 'Kursi Tidak Tersedia'
                                : 'Kursi Tersedia'
                          }
                          id={transaction.idPengajuan}
                          packageName={
                            transaction?.packageVariants?.package?.title
                          }
                          thumbnail={
                            transaction?.packageVariants?.package?.thumbnail
                          }
                          startDate={
                            transaction?.packageVariants?.departureDate
                          }
                          travelName={transaction?.travelName}
                          slug={transaction?.packageVariants?.package?.slug}
                          endDate={transaction?.packageVariants?.arrivalDate}
                          updateDate={transaction.modifiedAt}
                          jumlahJamaah={transaction.valuePeople}
                          responTravel={transaction.responseTravel}
                          noHeader
                          detailOnly
                          noLabelNotif
                        />
                      </CanceledProvider>
                    </div>
                  ))
                ) : (
                  <EmptyState />
                )}
              </InfiniteScroll>
              {isLoading && (
                <div className="mt-5">
                  <TransactionSkeletonLoading noTabs noFilter noPagination />
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {isLoading ? (
            <div className="mt-5">
              <TransactionSkeletonLoading noTabs noFilter noPagination />
            </div>
          ) : transactions.length > 0 ? (
            <Fragment>
              {transactions.map((transaction: any) => (
                <div
                  key={transaction.id + '-' + new Date()}
                  className="max-lg:px-5"
                >
                  <CanceledProvider>
                    <TransactionCard
                      status={
                        transaction.responseTravel === null
                          ? 'Permintaan Diproses'
                          : Number(transaction.responseTravel) <
                              Number(transaction.valuePeople)
                            ? 'Kursi Tidak Tersedia'
                            : 'Kursi Tersedia'
                      }
                      id={transaction.idPengajuan}
                      packageName={transaction?.packageVariants?.package?.title}
                      thumbnail={
                        transaction?.packageVariants?.package?.thumbnail
                      }
                      startDate={transaction?.packageVariants?.departureDate}
                      endDate={transaction?.packageVariants?.arrivalDate}
                      updateDate={transaction.modifiedAt}
                      jumlahJamaah={transaction.valuePeople}
                      responTravel={transaction.responseTravel}
                      travelName={transaction?.travelName}
                      slug={transaction?.packageVariants?.package?.slug}
                      noHeader
                      detailOnly
                      noLabelNotif
                    />
                  </CanceledProvider>
                </div>
              ))}
            </Fragment>
          ) : (
            <EmptyState />
          )}
        </div>
      )}
    </Fragment>
  )
}

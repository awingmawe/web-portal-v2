import TransactionCard from '@/components/pages/my/1-Transaction/Components/Card/TransactionCard'
import EmptyState from '@/components/pages/my/1-Transaction/Components/EmptyState'
import TransactionSkeletonLoading from '@/components/pages/my/1-Transaction/Components/TransactionSkeletonLoading'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Transaction } from '@/constant/types/Transaction'
import { CanceledProvider } from '@/contexts/canceled-package-context'
import { Fragment } from 'react'

interface ListProps {
  isLoading: boolean
  isLoadingMobile: boolean
  lg: boolean
  currentPage: number
  totalPages: number
  setCurrentPage: (value: number) => void
  transactions: Transaction[]
  fetchTransactions?: any
}

export default function List({
  lg,
  isLoading,
  isLoadingMobile,
  currentPage,
  totalPages,
  setCurrentPage,
  transactions,
  fetchTransactions,
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
                  transactions.map((transaction) => (
                    <div
                      key={`${transaction.id}-${new Date().getTime()}-${Math.random()}`}
                      className="max-lg:px-5"
                    >
                      <CanceledProvider>
                        <TransactionCard
                          status={transaction.status.slug}
                          id={transaction.bookingCode}
                          packageName={
                            transaction?.packageSnapshot?.snapshot?.name
                          }
                          thumbnail={
                            transaction?.packageSnapshot?.snapshot?.package
                              .thumbnail
                          }
                          startDate={
                            transaction?.packageSnapshot?.snapshot
                              ?.departureDate
                          }
                          endDate={
                            transaction?.packageSnapshot?.snapshot?.arrivalDate
                          }
                          organizationInstanceId={
                            transaction?.packageSnapshot?.snapshot?.package
                              .organizationInstanceId
                          }
                          createdDate={transaction.createdAt}
                          jemaah={Number.parseInt(transaction.quantity, 10)}
                          bookingId={String(transaction.id)}
                          isCompletedManifest={transaction.isCompletedManifest}
                          isManifestCommitted={transaction.isManifestCommitted}
                          isPaidOff={transaction.isPaidOff}
                          packagePersonalId={transaction.packagePersonalId}
                          statusTahapan="Akan Datang"
                          statusTahapanDetail={'Akan Datang'}
                          noFooter={
                            transaction.status.slug == 'waiting-approval' ||
                            (transaction.isPaidOff &&
                              transaction.isCompletedManifest)
                          }
                          transaction={transaction}
                          fetchTransactions={fetchTransactions}
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
              {transactions.map((transaction) => (
                <div
                  key={transaction.id + '-' + new Date()}
                  className="max-lg:px-5"
                >
                  <CanceledProvider>
                    <TransactionCard
                      status={transaction.status.slug}
                      id={transaction.bookingCode}
                      packageName={
                        transaction?.packageSnapshot?.snapshot?.package?.title
                      }
                      thumbnail={
                        transaction?.packageSnapshot?.snapshot.package
                          ?.thumbnail
                      }
                      startDate={
                        transaction?.packageSnapshot?.snapshot?.departureDate
                      }
                      endDate={
                        transaction?.packageSnapshot?.snapshot?.arrivalDate
                      }
                      createdDate={transaction.createdAt}
                      jemaah={Number.parseInt(transaction.quantity, 10)}
                      bookingId={String(transaction.id)}
                      isCompletedManifest={transaction.isCompletedManifest}
                      isManifestCommitted={transaction.isManifestCommitted}
                      isPaidOff={transaction.isPaidOff}
                      packagePersonalId={transaction.packagePersonalId}
                      statusTahapan="Akan Datang"
                      statusTahapanDetail={'Akan Datang'}
                      organizationInstanceId={
                        transaction?.packageSnapshot?.snapshot?.package
                          .organizationInstanceId
                      }
                      transaction={transaction}
                      fetchTransactions={fetchTransactions}
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

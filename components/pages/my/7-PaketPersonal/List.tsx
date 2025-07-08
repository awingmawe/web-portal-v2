import TransactionCard from '@/components/pages/my/7-PaketPersonal/Components/Card/TransactionCard'
import EmptyState from '@/components/pages/my/7-PaketPersonal/Components/EmptyState'
import TransactionSkeletonLoading from '@/components/pages/my/7-PaketPersonal/Components/TransactionSkeletonLoading'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { Fragment } from 'react'

interface ListProps {
  isLoading: boolean
  isLoadingMobile: boolean
  lg: boolean
  currentPage: number
  totalPages: number
  setCurrentPage: (value: number) => void
  transactions: any
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
                  transactions.map((transaction: any) => (
                    <div
                      key={`${transaction.id}-${new Date().getTime()}-${Math.random()}`}
                      className="max-lg:px-5"
                    >
                      <TransactionCard
                        status={transaction.status}
                        idJourney={transaction.id}
                        id={transaction.journeyCode}
                        packageName={transaction?.name}
                        startDate={transaction?.departureDate}
                        endDate={transaction?.arrivalDate}
                        arival={transaction?.arrival}
                        departure={transaction?.departure}
                        createdDate={transaction?.createdAt}
                        meccaHotel={transaction?.meccaHotel}
                        medinaHotel={transaction?.medinaHotel}
                        approvedAt={transaction.approvedAt}
                        modifiedAt={transaction.modifiedAt}
                        totalOffers={transaction?.totalOffers}
                        jemaah={Number.parseInt(transaction.totalManifest, 10)}
                        noFooter={false}
                        noHeader={
                          (transaction.status === 'waiting-offers' &&
                            transaction.approvedAt !== null) ||
                          transaction.status === 'offers-available'
                            ? false
                            : true
                        }
                        transaction={transaction}
                        fetchTransactions={fetchTransactions}
                      />
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
                  <TransactionCard
                    status={transaction.status}
                    idJourney={transaction.id}
                    id={transaction.journeyCode}
                    packageName={transaction?.name}
                    startDate={transaction?.departureDate}
                    endDate={transaction?.arrivalDate}
                    arival={transaction?.arrival}
                    departure={transaction?.departure}
                    createdDate={transaction.createdAt}
                    approvedAt={transaction.approvedAt}
                    modifiedAt={transaction.modifiedAt}
                    meccaHotel={transaction?.meccaHotel}
                    medinaHotel={transaction?.medinaHotel}
                    totalOffers={transaction?.totalOffers}
                    noHeader={
                      (transaction.status === 'waiting-offers' &&
                        transaction.approvedAt !== null) ||
                      transaction.status === 'offers-available'
                        ? false
                        : true
                    }
                    jemaah={Number.parseInt(transaction.totalManifest, 10)}
                    transaction={transaction}
                    fetchTransactions={fetchTransactions}
                  />
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

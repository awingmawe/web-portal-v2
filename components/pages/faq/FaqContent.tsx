import { EmptyFaqIcon } from '@/components/icons/empty-faq'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { getFaq } from '@/services/article-service'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function FaqContent({
  highlight = false,
  page = 1,
  limit = 5,
  order = 'asc',
  orderBy = 'level',
  type = 'accordion',
  pagination = false,
  slug,
  likeLower,
}: {
  highlight?: boolean
  page?: number
  limit?: number
  order?: string
  orderBy?: string
  type?: string
  pagination?: boolean
  slug?: string
  likeLower?: string
}) {
  const faqLists = await getFaq({
    highlight,
    page,
    limit,
    order,
    orderBy,
    slug,
    likeLower,
  })

  const contentFaq = (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4 max-lg:space-y-2"
    >
      {faqLists.results.map((faq) => (
        <AccordionItem key={faq.slug} value={faq.slug}>
          <AccordionTrigger
            noSeparator
            className="transition-all data-[state=closed]:rounded-b-none data-[state=closed]:border-b-1 data-[state=closed]:border-neutral-100 data-[state=open]:border-none"
          >
            <h4 className="heading-4-medium max-lg:text-xl max-lg:leading-6.5 max-sm:text-sm max-sm:leading-5">
              {faq.title}
            </h4>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-2 text-balance">
            <div
              className="prose text-m-regular max-sm:text-m-regular max-lg:text-l-regular max-lg:leading-6.5 max-sm:leading-6"
              dangerouslySetInnerHTML={{ __html: faq.body }}
            />
            <hr className="border-neutral-100" />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )

  const contentFaqList = (
    <div className="flex flex-col gap-4 max-lg:gap-2">
      {faqLists.results.map((faq) => (
        <Link
          key={faq.slug}
          href={`/faq/${faq.slug}`}
          className="flex justify-between gap-2 border-b-1 border-neutral-100 pt-2 pb-7 max-lg:pb-3"
        >
          <h4 className="heading-4-medium max-lg:text-xl max-lg:leading-6.5 max-sm:text-sm max-sm:leading-5">
            {faq.title}
          </h4>
          <ChevronRight className="min-w-[24px]" />
        </Link>
      ))}
    </div>
  )

  if (faqLists.results.length == 0) {
    return (
      <div className="mt-20 flex flex-col items-center gap-2 max-lg:gap-2">
        <EmptyFaqIcon />
        <h6 className="text-l-medium">
          Tidak Ada Pertanyaan Umum Untuk Saat Ini
        </h6>
        <p className="text-m-regular mt-2 mb-0 text-neutral-400">
          Jika kamu butuh bantuan, harap menghubungi CS Muslim101!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {type == 'accordion' ? contentFaq : contentFaqList}

      {/* Pagination */}
      {pagination && (
        <Pagination className="pt-6">
          <PaginationContent>
            {/* Prev button */}
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${page - 1}`} />
              </PaginationItem>
            )}

            {/* Page numbers */}
            {(() => {
              const totalPages = Math.ceil(faqLists.total / limit)
              const pages: number[] = []

              // Show current and next page if available
              for (let i = page; i <= Math.min(totalPages, page + 1); i++) {
                pages.push(i)
              }

              // Show previous page when not on first
              if (page > 1 && !pages.includes(page - 1)) {
                pages.unshift(page - 1)
              }

              return pages.map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink href={`?page=${p}`} isActive={p === page}>
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))
            })()}

            {/* Next button */}
            {page < Math.ceil(faqLists.total / limit) && (
              <PaginationItem>
                <PaginationNext href={`?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

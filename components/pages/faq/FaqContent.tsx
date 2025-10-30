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

export default async function FaqContent({
  highlight = false,
  page = 1,
  limit = 5,
  order = 'asc',
  orderBy = 'level',
  type = 'accordion',
  pagination = false,
}: {
  highlight?: boolean
  page?: number
  limit?: number
  order?: string
  orderBy?: string
  type?: string
  pagination?: boolean
}) {
  const faqLists = await getFaq({ highlight, page, limit, order, orderBy })
  const contentFaq = (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqLists.results.map((faq) => (
        <AccordionItem key={faq.slug} value={faq.slug}>
          <AccordionTrigger>
            <h4 className="heading-4-medium">{faq.title}</h4>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 pt-2 text-balance">
            <div
              className="prose text-m-regular"
              dangerouslySetInnerHTML={{ __html: faq.body }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )

  const contentFaqList = (
    <Accordion type="single" className="w-full space-y-4">
      {faqLists.results.map((faq) => (
        <AccordionItem key={faq.slug} value={faq.slug}>
          <AccordionTrigger>
            <h4 className="heading-4-medium">{faq.title}</h4>
          </AccordionTrigger>
        </AccordionItem>
      ))}
    </Accordion>
  )

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

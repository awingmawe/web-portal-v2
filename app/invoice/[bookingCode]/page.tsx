'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/sonner'
import { getInvoiceTranasction } from '@/services/umrah-service'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { DownloadIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import renderHTML from 'react-render-html'

export default function InvoicePage() {
  const { bookingCode } = useParams()
  const router = useRouter()
  const [printData, setPrintData] = useState<string>()
  const [isDownloading, setIsDownloading] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  async function fetchData() {
    try {
      const response = await getInvoiceTranasction(String(bookingCode))
      const updatedHtml = response.replace(
        /<img[^>]+src="(https:\/\/[^"]+)"[^>]*>/g,
        (match, src) => {
          const proxiedSrc = `/api/proxy-image?url=${encodeURIComponent(src)}`
          return match.replace(src, proxiedSrc)
        }
      )
      setPrintData(updatedHtml)
    } catch (error: any) {
      toast.error(error.message || 'Gagal memuat data')
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDownload = async () => {
    if (!contentRef.current) return

    try {
      setIsDownloading(true)

      const element = contentRef.current
      const scrollWidth = element.scrollWidth
      const scrollHeight = element.scrollHeight
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: scrollWidth,
        height: scrollHeight,
      })

      const imgData = canvas.toDataURL('image/png')

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [scrollWidth, scrollHeight],
      })

      pdf.addImage(imgData, 'PNG', 0, 0, scrollWidth, scrollHeight)

      // Download the PDF
      pdf.save(`Invoice-${bookingCode}.pdf`)

      toast.success('Invoice berhasil diunduh')
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Gagal mengunduh invoice')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex h-full flex-col overflow-auto p-4">
      {printData ? (
        <div className="flex flex-col items-center">
          <div className="!my-5 flex justify-center gap-3">
            <Button
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back()
                } else {
                  router.push('/my/transaction')
                }
              }}
              className="!px-5 !py-3"
              variant={'ghost'}
            >
              Close
            </Button>
            <Button
              onClick={handleDownload}
              className="!px-5 !py-3"
              disabled={isDownloading}
            >
              <DownloadIcon className="mr-2 h-4 w-4" />
              {isDownloading ? 'Mengunduh...' : 'Unduh PDF'}
            </Button>
          </div>

          <div className="w-full max-w-2xl">
            <div id="print-section" ref={contentRef} className="p-4">
              <div dangerouslySetInnerHTML={{ __html: printData }}>
                {renderHTML(printData)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-full items-center justify-center">
          <svg
            className="h-8 w-8 animate-spin text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  )
}

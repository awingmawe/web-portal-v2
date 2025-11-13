import { ReferenceDisableDate } from '@/constant/types/GeneralProps'
import { getDisabledDate } from '@/services/general-service'
import { useEffect, useState } from 'react'

export default function DisableDate({ year }: { year: string }) {
  const [referenceData, setReferenceData] = useState<ReferenceDisableDate[]>([])

  async function fetchDisabledDates() {
    try {
      const res = await getDisabledDate(year)
      const disabledDates = res.data.results || []
      setReferenceData((prev) => {
        // check if year already exists
        const existingIndex = prev.findIndex((r) => r.year === year)

        if (existingIndex !== -1) {
          // update existing year data
          const updated = [...prev]
          updated[existingIndex] = {
            ...updated[existingIndex],
            date: [...updated[existingIndex].date, ...disabledDates],
          }
          return updated
        } else {
          // add new year entry
          return [...prev, { year: year, date: disabledDates }]
        }
      })
    } catch (error) {
      console.error('Error fetching disabled dates:', error)
    }
  }

  useEffect(() => {
    const yearExists = referenceData.some((item) => item.year === year)
    if (!yearExists) {
      fetchDisabledDates()
    }
  }, [year])

  const disabledRanges =
    referenceData
      .find((item) => item?.year === year)
      ?.date.map((d) => ({
        from: new Date(d.startDate),
        to: new Date(d.endDate),
      })) || []

  return disabledRanges
}

'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'
import { useCallback } from 'react'

export const useUpdateQueryParams = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentParams = useSearchParams()

  return useCallback(
    (keys: string[], values: (string | number)[], redirectPath?: string) => {
      const currentQuery = Object.fromEntries(currentParams.entries())

      if (values && values.length > 0) {
        keys.forEach((key, index) => {
          const valueStr = values[index]?.toString() || ''
          if (valueStr) {
            currentQuery[key] = valueStr
          } else {
            delete currentQuery[key]
          }
        })
      } else {
        keys.forEach((key) => {
          delete currentQuery[key]
        })
      }

      const query = queryString.stringify(currentQuery)
      const newPath = `${redirectPath || pathname}?${query}`

      router.push(newPath)
    },
    [router, pathname, currentParams]
  )
}

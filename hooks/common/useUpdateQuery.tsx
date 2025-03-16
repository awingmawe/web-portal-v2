import { isEmpty } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import queryString from 'query-string'
import { useCallback } from 'react'

// Create a custom hook to use in components
export function useUpdateQueryParams() {
  const pathname = usePathname()

  // Return the function wrapped in useCallback
  return useCallback(
    (key: string[], value: string[] | number[], to?: string) => {
      const parsedUrl = queryString.parseUrl(window.location.href)
      const query: any = parsedUrl.query
      if (value) {
        key.map((res, index) => {
          query[res] = value[index].toString()
        })
      } else {
        key.map((res) => {
          delete query[res]
        })
      }

      window.location.href = `${!isEmpty(to) && to !== pathname ? to + '/' : ''}${pathname}?${queryString.stringify(query)}`
    },
    [pathname]
  )
}

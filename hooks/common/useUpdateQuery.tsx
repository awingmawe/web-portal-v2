import { usePathname } from 'next/navigation'
import queryString from 'query-string'
import { useCallback } from 'react'

// Create a custom hook to use in components
export const useUpdateQueryParams = () => {
  const pathname = usePathname()

  return useCallback(
    (keys: string[], values: (string | number)[], redirectPath?: string) => {
      const parsedUrl = queryString.parseUrl(window.location.href)
      const query = parsedUrl.query

      if (values && values.length > 0) {
        keys.forEach((key, index) => {
          // Convert the value to string if it's not already
          const valueStr = values[index]?.toString() || ''

          // Don't encode the value here - queryString library will handle it properly
          if (valueStr) {
            query[key] = valueStr
          } else {
            delete query[key]
          }
        })
      } else {
        keys.forEach((key) => {
          delete query[key]
        })
      }

      // Use the redirectPath if provided, otherwise use the current pathname
      const path = redirectPath || pathname

      // The queryString.stringify will properly encode values for URL
      window.location.href = `${path}?${queryString.stringify(query)}`
    },
    [pathname]
  )
}

import { usePathname } from 'next/navigation'
import queryString from 'query-string'
import { useCallback } from 'react'

// Create a custom hook to use in components
export const useUpdateQueryParams = () => {
  const pathname = usePathname()

  return useCallback(
    (keys: string[], values: (string | number)[], redirectPath?: string) => {
      // Get current URL and parse it
      const parsedUrl = queryString.parseUrl(window.location.href)
      const query = parsedUrl.query

      // Update query parameters
      if (values && values.length > 0) {
        keys.forEach((key, index) => {
          // Convert the value to string if it's not already
          const valueStr = values[index]?.toString() || ''

          // If value exists, add/update the key, otherwise remove it
          if (valueStr) {
            query[key] = valueStr
          } else {
            delete query[key]
          }
        })
      } else {
        // If no values provided, remove all specified keys
        keys.forEach((key) => {
          delete query[key]
        })
      }

      // Use the redirectPath if provided, otherwise use the current pathname
      const path = redirectPath || pathname

      // Create the new URL with updated query parameters
      const newUrl = `${path}?${queryString.stringify(query)}`

      // Update the browser history without reloading the page
      window.history.pushState({ path: newUrl }, '', newUrl)

      // Dispatch a custom event so components can react to the URL change if needed
      window.dispatchEvent(new Event('popstate'))
    },
    [pathname]
  )
}

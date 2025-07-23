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
      keys.forEach((key, index) => {
        const valueStr = values[index]?.toString() || ''

        // If value exists and is not empty, add/update the key, otherwise remove it
        if (valueStr && valueStr !== '0' && valueStr.trim() !== '') {
          query[key] = valueStr
        } else {
          delete query[key]
        }
      })

      // Use the redirectPath if provided, otherwise use the current pathname
      const targetPath = redirectPath || pathname

      // Create the new URL with updated query parameters
      const queryStr = queryString.stringify(query)
      const newUrl = queryStr ? `${targetPath}?${queryStr}` : targetPath

      // Check if we're navigating to a different page or updating the current page
      if (redirectPath && redirectPath !== pathname) {
        // Navigate to a different page (full page navigation)
        window.location.href = newUrl
      } else {
        // Update current page URL without reloading (for in-page filter updates)
        window.history.pushState({ path: newUrl }, '', newUrl)

        // If you're using Next.js App Router and want to trigger a re-render
        // you might want to use router.push instead:
        // router.push(newUrl, { scroll: false })

        // Dispatch a custom event so components can react to the URL change if needed
        window.dispatchEvent(new Event('popstate'))
      }
    },
    [pathname]
  )
}

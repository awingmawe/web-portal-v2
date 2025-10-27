// hooks/common/useLocalStorageListener.ts
import { useEffect, useState } from 'react'

/**
 * Custom hook untuk listen localStorage changes
 * @example
 * const [user, refreshUser] = useLocalStorageListener<User>('user')
 */
export function useLocalStorageListener<T>(
  key: string,
  initialValue?: T
): [T | null, () => void] {
  const [data, setData] = useState<T | null>(initialValue ?? null)

  // Function untuk manual refresh
  const refreshData = () => {
    if (typeof window === 'undefined') return

    try {
      const item = localStorage.getItem(key)
      if (item) {
        setData(JSON.parse(item) as T)
      } else {
        setData(null)
      }
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      setData(null)
    }
  }

  // Initial load
  useEffect(() => {
    refreshData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Listen untuk custom event
  useEffect(() => {
    const handleStorageChange = (e: CustomEvent) => {
      // Update jika key yang berubah sama dengan key yang di-listen
      // atau jika clear() dipanggil (key = '*')
      if (e.detail.key === key || e.detail.key === '*') {
        refreshData()
      }
    }

    window.addEventListener(
      'localStorageUpdate' as any,
      handleStorageChange as any
    )

    // ✅ Juga listen native storage event untuk cross-tab sync
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === key || e.key === null) {
        refreshData()
      }
    })

    return () => {
      window.removeEventListener(
        'localStorageUpdate' as any,
        handleStorageChange as any
      )
      window.removeEventListener('storage', refreshData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [data, refreshData]
}

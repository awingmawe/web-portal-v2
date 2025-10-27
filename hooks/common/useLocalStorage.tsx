/**
 * LocalStorage utility functions with JSON support
 *
 * @example
 * const user = localStorageUtils.getJSON('user', { name: '', email: '' })
 * localStorageUtils.setJSON('user', { name: 'John', email: 'john@example.com' })
 * localStorageUtils.updateJSON('user', (prev) => ({ ...prev, name: 'Jane' }))
 * localStorageUtils.mergeJSON('user', { email: 'new@example.com' })
 * localStorageUtils.remove('user')
 */

// ✅ Helper function untuk dispatch event
const dispatchStorageEvent = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('localStorageUpdate', {
        detail: { key, value },
      })
    )
  }
}

export const localStorageUtils = {
  /**
   * Get JSON from localStorage
   * @example localStorageUtils.getJSON('user', { name: '', email: '' })
   */
  getJSON: <T,>(key: string): T | null => {
    if (typeof window === 'undefined') return null

    try {
      const item = localStorage.getItem(key)
      if (!item) return null

      return JSON.parse(item)
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error)
      return null
    }
  },

  /**
   * Set JSON to localStorage
   * @example localStorageUtils.setJSON('user', { name: 'John', email: 'john@example.com' })
   * @example localStorageUtils.setJSON('counter', 5)
   * @example localStorageUtils.setJSON('isActive', true)
   */
  setJSON: <T,>(key: string, value: T): boolean => {
    if (typeof window === 'undefined') return false

    try {
      // Check if value is an object (including arrays) or primitive
      const isObject = typeof value === 'object' && value !== null
      const valueToStore = isObject ? JSON.stringify(value) : String(value)

      localStorage.setItem(key, valueToStore)

      dispatchStorageEvent(key, value)

      return true
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Update JSON using callback function
   * Works with objects, arrays, and primitive values
   * @example localStorageUtils.updateJSON('cart', (prev) => ({ ...prev, total: prev.total + 100 }), { total: 0 })
   * @example localStorageUtils.updateJSON('counter', (prev) => prev + 1, 0)
   */
  updateJSON: <T,>(key: string, updater: (currentValue: T) => T): boolean => {
    if (typeof window === 'undefined') return false

    try {
      const currentValue = localStorageUtils.getJSON<T>(key)
      if (currentValue === null) {
        // Handle the case where currentValue is null
        return false
      }
      const newValue = updater(currentValue)

      return localStorageUtils.setJSON(key, newValue)
    } catch (error) {
      console.error(`Error updating localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Merge partial object into existing data
   * Only works with objects, not primitive values
   * @example localStorageUtils.mergeJSON('user', { email: 'new@example.com' }, { name: '', email: '' })
   */
  mergeJSON: <T extends Record<string, any>>(
    key: string,
    partialValue: Partial<T>
  ): boolean => {
    if (typeof window === 'undefined') return false

    try {
      const currentValue = localStorageUtils.getJSON<T>(key)

      // Check if current value is an object
      if (typeof currentValue !== 'object' || currentValue === null) {
        console.warn(`Cannot merge into non-object value for key "${key}"`)
        return false
      }

      const mergedValue = { ...currentValue, ...partialValue }

      return localStorageUtils.setJSON(key, mergedValue)
    } catch (error) {
      console.error(`Error merging localStorage key "${key}":`, error)
      return false
    }
  },

  /**
   * Update nested property using dot notation
   * Only works with objects
   * @example localStorageUtils.updateNestedJSON('app', 'user.profile.name', 'John', {})
   */
  updateNestedJSON: (key: string, path: string, value: any): boolean => {
    if (typeof window === 'undefined') return false

    try {
      const currentValue = localStorageUtils.getJSON<any>(key)

      // Check if current value is an object
      if (typeof currentValue !== 'object' || currentValue === null) {
        console.warn(
          `Cannot update nested property in non-object value for key "${key}"`
        )
        return false
      }

      const pathArray = path.split('.')
      const newValue = JSON.parse(JSON.stringify(currentValue))

      let current = newValue
      for (let i = 0; i < pathArray.length - 1; i++) {
        const prop = pathArray[i]
        if (!current[prop]) current[prop] = {}
        current = current[prop]
      }

      current[pathArray[pathArray.length - 1]] = value

      return localStorageUtils.setJSON(key, newValue)
    } catch (error) {
      console.error(
        `Error updating nested property "${path}" in localStorage key "${key}":`,
        error
      )
      return false
    }
  },

  /**
   * Remove key from localStorage
   * @example localStorageUtils.remove('user')
   */
  remove: (key: string): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)

    dispatchStorageEvent(key, null)
  },

  /**
   * Clear all localStorage
   * @example localStorageUtils.clear()
   */
  clear: (): void => {
    if (typeof window === 'undefined') return
    localStorage.clear()

    dispatchStorageEvent('*', null)
  },

  /**
   * Check if key exists
   * @example if (localStorageUtils.has('user')) { ... }
   */
  has: (key: string): boolean => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(key) !== null
  },
}

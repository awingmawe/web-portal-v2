import axios from 'axios'
import { mockAdapter } from './mock-adapter'

export { mockAdapter }

/**
 * Initializes the global mock adapter on Axios.
 * This intercepts all outgoing axios requests and serves local mock data.
 */
export function initMockAdapter() {
  if (typeof window !== 'undefined') {
    console.info('🚀 [Mock API] Client-side Mock Adapter Active')
  } else {
    console.info('🚀 [Mock API] Server-side Mock Adapter Active')
  }
  axios.defaults.adapter = mockAdapter
}

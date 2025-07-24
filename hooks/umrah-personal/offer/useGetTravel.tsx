'use client'

import { Organization } from '@/constant/types/TravelProps'
import { getTravelById } from '@/services/identity-service'
import { useCallback, useEffect, useRef, useState } from 'react'

export const useGetTravel = (organizationId: number) => {
  const [data, setData] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const ref = useRef(false)

  const fetchTravel = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getTravelById(organizationId)
      setData(response)
    } catch (error) {
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }, [organizationId])

  useEffect(() => {
    if (ref.current) return
    fetchTravel()
    ref.current = true
  }, [fetchTravel])

  return {
    data,
    loading,
    error,
    fetchTravel,
  }
}

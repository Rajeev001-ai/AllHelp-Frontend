import { useCallback, useEffect, useState } from 'react'
import { getUserRequests } from '../services/requestService'
import { getErrorMessage } from '../utils/authRedirect'

export function useUserRequests() {
  const [requests, setRequests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadRequests = useCallback(async () => {
    setIsLoading(true)
    setError('')

    try {
      const data = await getUserRequests()
      setRequests(data)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadRequests()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadRequests])

  return {
    requests,
    setRequests,
    isLoading,
    error,
    refresh: loadRequests,
  }
}

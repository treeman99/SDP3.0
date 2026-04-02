import { useState, useEffect, useCallback } from 'react'
import type { ComplianceRow, ComplianceListResponse } from '@/types/compliance'
import { fetchComplianceList } from '@/data/complianceData'

interface UseComplianceListReturn {
  data: ComplianceRow[]
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
  loading: boolean
  error: string | null
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  refresh: () => void
}

export function useComplianceList(initialPageSize = 30): UseComplianceListReturn {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSizeState] = useState(initialPageSize)
  const [response, setResponse] = useState<ComplianceListResponse>({
    data: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    pageSize: initialPageSize,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchComplianceList({ page: currentPage, pageSize })
      setResponse(result)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize])

  useEffect(() => {
    load()
  }, [load])

  const setPage = (page: number) => setCurrentPage(page)

  const setPageSize = (size: number) => {
    setPageSizeState(size)
    setCurrentPage(1)
  }

  return {
    data: response.data,
    totalCount: response.totalCount,
    totalPages: response.totalPages,
    currentPage,
    pageSize,
    loading,
    error,
    setPage,
    setPageSize,
    refresh: load,
  }
}

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

export function TablePagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  return (
    <div className="flex items-center justify-center py-[6px] gap-[8px]">
      <div className="flex items-center">
        <PaginationButton disabled={currentPage === 1} onClick={() => onPageChange(1)}>
          <ChevronsLeft className="w-[14px] h-[14px]" />
        </PaginationButton>
        <PaginationButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft className="w-[14px] h-[14px]" />
        </PaginationButton>
      </div>
      <div className="flex items-center gap-[2px]">
        {getVisiblePages(currentPage, totalPages).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-[24px] h-[24px] flex items-center justify-center rounded-[2px] text-[14px] font-bold leading-[20px] tracking-[0.8px] ${
              page === currentPage
                ? 'bg-[#E4E9ED] text-[#3392D3]'
                : 'bg-transparent text-[#565E66] hover:bg-[#EDF2F4]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="flex items-center">
        <PaginationButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight className="w-[14px] h-[14px]" />
        </PaginationButton>
        <PaginationButton disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
          <ChevronsRight className="w-[14px] h-[14px]" />
        </PaginationButton>
      </div>
    </div>
  )
}

export function PaginationButton({ children, disabled, onClick }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-[24px] h-[24px] flex items-center justify-center rounded-[2px] ${
        disabled ? 'text-[#CCD1D6] cursor-not-allowed' : 'text-[#565E66] hover:bg-[#EDF2F4]'
      }`}
    >
      {children}
    </button>
  )
}

export function getVisiblePages(currentPage: number, totalPages: number): number[] {
  const maxVisible = 10
  if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1)
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

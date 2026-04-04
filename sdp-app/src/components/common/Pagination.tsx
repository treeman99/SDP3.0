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

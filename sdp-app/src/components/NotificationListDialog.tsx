import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react'

interface NotificationListDialogProps {
  open: boolean
  onClose: () => void
}

interface NotificationRow {
  id: number
  title: string
  content: string
  link?: { label: string; href: string }
  date: string
}

const notificationData: NotificationRow[] = [
  { id: 1, title: 'ERS 업데이트', content: 'Index 1.1.1외 5건이 업데이트 되었습니다.', link: { label: 'ERS 바로가기', href: '/ers-management' }, date: '2025-06-17' },
  { id: 2, title: '시스템 정기 점검', content: '2025-05-25 00:00 ~ 05-25 04:00 정기 점검으로 접속이 불가합니다.', date: '2025-06-17' },
  { id: 3, title: '시스템 업데이트', content: '2025-05-25 00:00 ~ 05-25 04:00 정기 점검으로 접속이 불가합니다.', date: '2025-06-17' },
  { id: 4, title: 'ERS 업데이트', content: 'Index 1.1.1외 5건이 업데이트 되었습니다.', link: { label: 'ERS 바로가기', href: '/ers-management' }, date: '2025-06-17' },
  { id: 5, title: 'ERS 업데이트', content: 'Index 1.1.1외 5건이 업데이트 되었습니다.', link: { label: 'ERS 바로가기', href: '/ers-management' }, date: '2025-06-17' },
  { id: 6, title: 'ERS 업데이트', content: 'Index 1.1.1외 5건이 업데이트 되었습니다.', link: { label: 'ERS 바로가기', href: '/ers-management' }, date: '2025-06-17' },
  { id: 7, title: '시스템 업데이트', content: '2025-05-25 00:00 ~ 05-25 04:00 정기 점검으로 접속이 불가합니다.', date: '2025-06-17' },
  { id: 8, title: 'ERS 업데이트', content: 'Index 1.1.1외 5건이 업데이트 되었습니다.', link: { label: 'ERS 바로가기', href: '/ers-management' }, date: '2025-06-17' },
  { id: 9, title: '시스템 업데이트', content: '2025-05-25 00:00 ~ 05-25 04:00 정기 점검 예정으로 접속이 불가합니다.', date: '2025-06-17' },
  { id: 10, title: '시스템 정기 점검', content: '2025-05-25 00:00 ~ 05-25 04:00 정기 점검 예정으로 접속이 불가합니다.', date: '2025-06-17' },
]

const columns = [
  { key: 'no' as const, label: 'No', width: 70 },
  { key: 'title' as const, label: '제목', width: 160 },
  { key: 'content' as const, label: '제목', width: 420 },
  { key: 'date' as const, label: '작성일', width: 107 },
]

const PAGE_SIZE = 10

export function NotificationListDialog({ open, onClose }: NotificationListDialogProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')

  if (!open) return null

  const totalCount = notificationData.length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const startIdx = (currentPage - 1) * PAGE_SIZE
  const pageData = notificationData.slice(startIdx, startIdx + PAGE_SIZE)

  const allChecked = pageData.length > 0 && pageData.every(r => selectedIds.has(r.id))

  const toggleAll = () => {
    if (allChecked) {
      const next = new Set(selectedIds)
      pageData.forEach(r => next.delete(r.id))
      setSelectedIds(next)
    } else {
      const next = new Set(selectedIds)
      pageData.forEach(r => next.add(r.id))
      setSelectedIds(next)
    }
  }

  const toggleRow = (id: number) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleClose = () => {
    setSelectedIds(new Set())
    setCurrentPage(1)
    setSearchText('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#283037] opacity-[0.52]" onClick={handleClose} />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[6px] w-[800px] h-[538px] flex flex-col"
        style={{ boxShadow: '0px 0px 2px 0px rgba(34,38,44,0.32), 0px 6px 12px 0px rgba(34,38,44,0.16)' }}
      >
        {/* Header */}
        <div className="relative h-[53px] shrink-0">
          <div className="flex items-center justify-between pl-[20px] pr-[16px] pt-[16px] pb-[36px]">
            <p className="text-[16px] font-normal leading-[20px] text-[#283037] truncate">전체 알림 목록</p>
            <button onClick={handleClose} className="rounded-[2px] hover:bg-[#EDF2F4] p-[2px]">
              <X className="w-[14px] h-[14px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col px-[20px] overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-0 py-[8px]">
            <div className="flex items-center gap-[4px]">
              <button className="bg-[#3392D3] rounded-[2px] px-[6px] text-[12px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]">
                추가
              </button>
              <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                수정
              </button>
              <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                삭제
              </button>
            </div>
            <div className="px-[10px] flex items-center">
              <div className="w-px h-[12px] bg-[#283037] opacity-20" />
            </div>
            <div className="flex items-center border border-[#CCD1D6] rounded-[2px] bg-white px-[6px] py-[2px] w-[108px]">
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="검색어를 입력..."
                className="flex-1 text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] placeholder:text-[#90969D] outline-none bg-transparent min-w-0"
              />
              <Search className="w-[14px] h-[14px] text-[#90969D] shrink-0 ml-[2px]" strokeWidth={1.5} />
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 border border-[#DADFE4] rounded-[2px] overflow-auto">
            <table className="w-full border-collapse" style={{ minWidth: columns.reduce((s, c) => s + c.width, 0) }}>
              <thead className="sticky top-0 z-10">
                <tr>
                  {columns.map((col, colIdx) => (
                    <th
                      key={col.key}
                      className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] text-left px-[8px] py-0 h-[33px] text-[12px] font-normal leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap"
                      style={{ width: col.width, minWidth: col.width }}
                    >
                      <div className="flex items-center gap-[8px]">
                        {colIdx === 0 && (
                          <button onClick={toggleAll} className="shrink-0">
                            {allChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
                          </button>
                        )}
                        {col.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageData.map(row => {
                  const isSelected = selectedIds.has(row.id)
                  return (
                    <tr
                      key={row.id}
                      className={`border-b border-[#E4E9ED] ${isSelected ? 'bg-[#EBF5FB]' : 'hover:bg-[#F7F9FB]'}`}
                    >
                      {/* No */}
                      <td
                        className="px-[8px] h-[29px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]"
                        style={{ width: 70, minWidth: 70 }}
                      >
                        <div className="flex items-center gap-[8px]">
                          <button onClick={() => toggleRow(row.id)} className="shrink-0">
                            {isSelected ? <CheckboxChecked /> : <CheckboxUnchecked />}
                          </button>
                          {row.id}
                        </div>
                      </td>
                      {/* 제목 */}
                      <td
                        className="px-[8px] h-[29px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate"
                        style={{ width: 160, minWidth: 160, maxWidth: 160 }}
                      >
                        {row.title}
                      </td>
                      {/* 내용 */}
                      <td
                        className="px-[8px] h-[29px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate"
                        style={{ width: 420, minWidth: 420, maxWidth: 420 }}
                      >
                        {row.content}
                        {row.link && (
                          <>
                            {' '}
                            <a href={row.link.href} className="text-[#515E94] underline">{row.link.label}</a>
                          </>
                        )}
                      </td>
                      {/* 작성일 */}
                      <td
                        className="px-[8px] h-[29px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]"
                        style={{ width: 107, minWidth: 107 }}
                      >
                        {row.date}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center py-[8px] gap-[8px]">
          <div className="flex items-center">
            <PaginationButton disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>
              <ChevronsLeft className="w-[14px] h-[14px]" />
            </PaginationButton>
            <PaginationButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              <ChevronLeft className="w-[14px] h-[14px]" />
            </PaginationButton>
          </div>
          <div className="flex items-center gap-[2px]">
            {getVisiblePages(currentPage, totalPages).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
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
            <PaginationButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              <ChevronRight className="w-[14px] h-[14px]" />
            </PaginationButton>
            <PaginationButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
              <ChevronsRight className="w-[14px] h-[14px]" />
            </PaginationButton>
          </div>
        </div>

        {/* Footer */}
        <div className="relative h-[60px] shrink-0 flex items-center justify-end px-[20px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#EDF2F4]" />
          <button
            onClick={handleClose}
            className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[4px] w-[48px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8] text-center"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}

function PaginationButton({ children, disabled, onClick }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void }) {
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

function getVisiblePages(currentPage: number, totalPages: number): number[] {
  const maxVisible = 10
  if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1)
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
  const end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function CheckboxChecked() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="#3392D3" stroke="#3392D3" />
      <path d="M3.5 7L6 9.5L10.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckboxUnchecked() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="white" stroke="#DADFE4" />
    </svg>
  )
}

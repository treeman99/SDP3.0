import { useState } from 'react'
import { X, Search, ChevronDown } from 'lucide-react'
import { CheckboxChecked, CheckboxUnchecked } from '@/components/common/Checkbox'

interface AddInterestErsDialogProps {
  open: boolean
  onClose: () => void
}

interface ErsItem {
  index: string
  ersTitle: string
  lastUpdated: string
}

const searchResultData: ErsItem[] = [
  { index: '1.1.2', ersTitle: 'Project Overview', lastUpdated: '2025-05-23' },
  { index: '1.1.3', ersTitle: 'Purpose Overview', lastUpdated: '2025-05-23' },
  { index: '1.3.1', ersTitle: 'Scope 51', lastUpdated: '2025-05-25' },
  { index: '1.3.2', ersTitle: 'Scope 51', lastUpdated: '2025-05-25' },
  { index: '1.3.2', ersTitle: 'Expectation ABCD', lastUpdated: '2025-05-25' },
]

const initialAddedData: ErsItem[] = [
  { index: '1.1.2', ersTitle: 'Project Overview', lastUpdated: '2025-05-23' },
  { index: '1.1.3', ersTitle: 'Purpose Overview', lastUpdated: '2025-05-23' },
  { index: '1.3.1', ersTitle: 'Scope 51', lastUpdated: '2025-05-23' },
  { index: '1.3.2', ersTitle: 'Scope 51', lastUpdated: '2025-05-23' },
]

export function AddInterestErsDialog({ open, onClose }: AddInterestErsDialogProps) {
  const [searchText, setSearchText] = useState('')
  const [selectedSearchIds, setSelectedSearchIds] = useState<Set<string>>(new Set())
  const [addedList, setAddedList] = useState<ErsItem[]>(initialAddedData)

  if (!open) return null

  const allSearchChecked = searchResultData.length > 0 && searchResultData.every((_, i) => selectedSearchIds.has(String(i)))

  const toggleSearchAll = () => {
    if (allSearchChecked) {
      setSelectedSearchIds(new Set())
    } else {
      setSelectedSearchIds(new Set(searchResultData.map((_, i) => String(i))))
    }
  }

  const toggleSearchRow = (idx: number) => {
    const next = new Set(selectedSearchIds)
    const key = String(idx)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    setSelectedSearchIds(next)
  }

  const handleDelete = (idx: number) => {
    setAddedList(prev => prev.filter((_, i) => i !== idx))
  }

  const handleClose = () => {
    setSearchText('')
    setSelectedSearchIds(new Set())
    setAddedList(initialAddedData)
    onClose()
  }

  const handleSave = () => {
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#283037] opacity-[0.52]" onClick={handleClose} />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[6px] w-[520px] max-h-[520px] min-h-[324px] flex flex-col"
        style={{ boxShadow: '0px 0px 2px 0px rgba(34,38,44,0.32), 0px 6px 12px 0px rgba(34,38,44,0.16)' }}
      >
        {/* Header */}
        <div className="relative h-[53px] shrink-0">
          <div className="flex items-center justify-between pl-[20px] pr-[18px] pt-[16px] pb-[36px]">
            <span className="text-[16px] font-normal leading-[20px] text-[#283037]">관심 ERS 추가</span>
            <button onClick={handleClose} className="rounded-[2px] hover:bg-[#EDF2F4] p-[2px]">
              <X className="w-[14px] h-[14px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-[6px] px-[20px] pt-[12px] pb-[8px] overflow-y-auto">
          {/* Search Input */}
          <div className="w-[230px]">
            <div className="flex items-center gap-[4px] border border-[#CCD1D6] rounded-[2px] h-[28px] px-[8px]">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="ERS 제목을 검색하세요."
                className="flex-1 text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] placeholder:text-[#90969D] outline-none bg-transparent"
              />
              <Search className="w-[14px] h-[14px] text-[#90969D] shrink-0" strokeWidth={1.5} />
            </div>
          </div>

          {/* Search Result Table */}
          <div className="border border-[#DADFE4] rounded-[2px] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] w-[32px]">
                    <div className="flex items-center justify-center h-full">
                      <button onClick={toggleSearchAll} className="inline-flex items-center justify-center">
                        {allSearchChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
                      </button>
                    </div>
                  </th>
                  <th className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] text-left px-[6px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] w-[70px]">
                    Index
                  </th>
                  <th className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] text-left px-[6px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037]">
                    ERS Title
                  </th>
                  <th className="bg-[#FAFBFC] border-b border-[#DADFE4] h-[28px] text-left px-[6px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] w-[100px]">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResultData.map((row, i) => (
                  <tr key={i} className="border-b border-[#E4E9ED] hover:bg-[#F7F9FB]">
                    <td className="h-[23px] border-r border-[#E4E9ED]">
                      <div className="flex items-center justify-center h-full">
                        <button onClick={() => toggleSearchRow(i)} className="inline-flex items-center justify-center">
                          {selectedSearchIds.has(String(i)) ? <CheckboxChecked /> : <CheckboxUnchecked />}
                        </button>
                      </div>
                    </td>
                    <td className="h-[23px] px-[6px] text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] border-r border-[#E4E9ED]">
                      {row.index}
                    </td>
                    <td className="h-[23px] px-[6px] text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] border-r border-[#E4E9ED] truncate">
                      {row.ersTitle}
                    </td>
                    <td className="h-[23px] px-[6px] text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">
                      {row.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Load More Button */}
          <div className="flex justify-center">
            <button className="border border-[#DADFE4] bg-white rounded-[2px] p-[4px] hover:bg-[#F3F6F8]">
              <ChevronDown className="w-[12px] h-[12px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Added List Section */}
          <div className="flex flex-col gap-[4px]">
            <span className="text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66]">
              추가된 List
            </span>
            <div className="border border-[#DADFE4] rounded-[2px] overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] text-left px-[6px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] w-[70px]">
                      Index
                    </th>
                    <th className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] text-left px-[6px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037]">
                      ERS Title
                    </th>
                    <th className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] text-left px-[6px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] w-[100px]">
                      Last Updated
                    </th>
                    <th className="bg-[#FAFBFC] border-b border-[#DADFE4] h-[28px] text-center text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] w-[50px]">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {addedList.map((row, i) => (
                    <tr key={i} className="border-b border-[#E4E9ED] hover:bg-[#F7F9FB]">
                      <td className="h-[23px] px-[6px] text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] border-r border-[#E4E9ED]">
                        {row.index}
                      </td>
                      <td className="h-[23px] px-[6px] text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] border-r border-[#E4E9ED] truncate">
                        {row.ersTitle}
                      </td>
                      <td className="h-[23px] px-[6px] text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] border-r border-[#E4E9ED]">
                        {row.lastUpdated}
                      </td>
                      <td className="h-[23px] px-[6px] flex items-center justify-end">
                        <button
                          onClick={() => handleDelete(i)}
                          className="border border-[#DADFE4] bg-white rounded-[2px] px-[4px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8] w-[36px] text-center"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative h-[60px] shrink-0 rounded-b-[6px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#EDF2F4]" />
          <div className="flex items-center justify-end gap-[6px] pr-[20px] pt-[16px]">
            <button
              onClick={handleSave}
              className="bg-[#3392D3] rounded-[2px] px-[6px] py-[4px] text-[12px] font-bold leading-[14px] tracking-[0.8px] text-white hover:bg-[#2B7DB5] min-w-[48px] text-center"
            >
              저장
            </button>
            <button
              onClick={handleClose}
              className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[4px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8] min-w-[48px] text-center"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

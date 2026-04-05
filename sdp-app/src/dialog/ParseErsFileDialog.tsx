import { useState } from 'react'
import { X } from 'lucide-react'
import { SortIcon } from '@/components/common/SortIcon'

interface ParseErsFileDialogProps {
  open: boolean
  onClose: () => void
}

interface ParsedErsItem {
  index: string
  title: string
  content: string
  depth: number
}

const parsedData: ParsedErsItem[] = [
  { index: '1', title: 'Overview', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 0 },
  { index: '1.1', title: 'Project Overview', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 1 },
  { index: '1.1.1', title: 'Purpose Overview', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '1.1.2', title: '', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 2 },
  { index: '1.2', title: 'Expectation ABCD', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 1 },
  { index: '1.2.2.1', title: 'Expectation ABCD', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '1.2.2.2', title: 'Expectation BCDEF', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '1.3', title: 'Expectation ABCEFG', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 1 },
  { index: '1.4', title: 'Production W123', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 1 },
  { index: '1.1.2', title: 'Expectation ABCD', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 2 },
  { index: '1.1.2', title: 'Project Overview', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '2', title: 'Scope 51', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 0 },
  { index: '2.1', title: 'Expectation ABCD', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 1 },
  { index: '2.1.1', title: 'Expectation ABCD', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '2.1.1', title: 'Expectation ABCD', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '2.1.1', title: 'Expectation BCDEF', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 2 },
  { index: '2.1.2', title: 'Expectation BCDEF', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '2.1.3', title: 'Expectation BCDF', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '2.2.1', title: 'Expectation ABCEFG', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 2 },
  { index: '2.2.2', title: 'Function Overview', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '2.3', title: 'Production W123', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 1 },
  { index: '2.3.1', title: 'Expectation ABCD', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 2 },
  { index: '2.3.2', title: 'Expectation BCDEF', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '3', title: 'Scope 51', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 0 },
  { index: '3.1', title: 'Expectation ABCD', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 1 },
  { index: '3.1.1', title: 'Purpose Overview', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '3.1.2', title: 'Expectation BCDF', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '3.2', title: 'Function Overview', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 1 },
  { index: '3.2.1', title: 'Production W123', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '3.2.2', title: 'Expectation ABCEFG', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '4', title: 'Project Overview', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 0 },
  { index: '4.1', title: 'Expectation ABCD', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 1 },
  { index: '4.1.1', title: 'Expectation BCDEF', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
  { index: '4.1.2', title: 'Expectation BCDF', content: 'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat null', depth: 2 },
  { index: '4.2', title: 'Scope 51', content: 'voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 1 },
  { index: '4.2.1', title: 'Production W123', content: 'ecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?', depth: 2 },
]

export function ParseErsFileDialog({ open, onClose }: ParseErsFileDialogProps) {
  const [removeImages, setRemoveImages] = useState(false)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#283037] opacity-[0.52]" onClick={onClose} />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[6px] w-[1000px] h-[620px] min-h-[400px] max-h-[640px] flex flex-col"
        style={{ boxShadow: '0px 0px 2px 0px rgba(34,38,44,0.32), 0px 6px 12px 4px rgba(34,38,44,0.16)' }}
      >
        {/* Header */}
        <div className="relative h-[53px] shrink-0">
          <div className="flex items-center justify-between pl-[20px] pr-[18px] pt-[16px] pb-[36px] rounded-t-[6px]">
            <span className="text-[16px] leading-[20px] tracking-[0.8px] text-[#283037] truncate">
              Parse ERS File
            </span>
            <button onClick={onClose} className="rounded-[2px] hover:bg-[#EDF2F4] p-[2px]">
              <X className="w-[14px] h-[14px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col overflow-hidden px-[20px] pt-[16px]">
          {/* Toolbar */}
          <div className="shrink-0 flex items-center justify-between pb-[12px]">
            {/* Left: Upload Process + Checkbox */}
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center gap-[4px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047]">
                <span>Upload Process:</span>
                <span className="font-bold">100 of 100</span>
                <span className="ml-[4px]">Success:</span>
                <span className="font-bold">91</span>
                <span className="ml-[4px]">Fail:</span>
                <span className="font-bold">09</span>
              </div>
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
              <label className="flex items-center gap-[4px] cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeImages}
                  onChange={(e) => setRemoveImages(e.target.checked)}
                  className="w-[12px] h-[12px] accent-[#3392D3]"
                />
                <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047]">
                  Remove Images and Tables
                </span>
              </label>
            </div>

            {/* Right: Buttons */}
            <div className="flex items-center gap-[8px]">
              <button className="bg-[#3392D3] rounded-[2px] px-[8px] py-[4px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]">
                Select ERS File
              </button>
              <button className="bg-white border border-[#DADFE4] rounded-[2px] px-[8px] py-[4px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                Download ERS Template
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="w-[101px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                        Index
                      </span>
                    </div>
                  </th>
                  <th className="w-[250px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                        Title
                      </span>
                      <SortIcon />
                    </div>
                  </th>
                  <th className="h-[28px] text-left bg-[#FAFBFC] border-t border-l border-r border-b border-[#DADFE4]">
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                        Content
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsedData.map((row, idx) => (
                  <tr key={idx} className="bg-white hover:bg-[#F7F9FA]">
                    <td className="h-[23px] border-l border-b border-[#E4E9ED]">
                      <div className="flex items-center px-[6px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#202020] whitespace-nowrap">
                          {row.depth > 0 ? `└${row.index}` : row.index}
                        </span>
                      </div>
                    </td>
                    <td className="h-[23px] border-l border-b border-[#E4E9ED]">
                      <div className="px-[6px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis block">
                          {row.title}
                        </span>
                      </div>
                    </td>
                    <td className="h-[23px] border-l border-r border-b border-[#E4E9ED]">
                      <div className="px-[6px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis block">
                          {row.content}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="relative h-[60px] shrink-0 rounded-b-[6px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#EDF2F4]" />
          <div className="flex items-center justify-end gap-[6px] pr-[20px] pt-[16px]">
            <button
              onClick={onClose}
              className="border border-[#DADFE4] bg-white rounded-[2px] w-[48px] py-[4px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8] text-center"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

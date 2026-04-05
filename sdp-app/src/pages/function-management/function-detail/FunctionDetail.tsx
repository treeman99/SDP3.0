import { useSearchParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { InfoIcon } from '@/components/common/InfoIcon'
import { Sidebar } from './Sidebar'
import { detailContent } from './MockData'

type TabKey = 'features' | 'sor' | 'uarch'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'features', label: 'Features' },
  { key: 'sor', label: 'SOR' },
  { key: 'uarch', label: 'uArch' },
]

export function FunctionDetail() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const activeTab = (searchParams.get('tab') as TabKey) || 'sor'

  const handleTabChange = (tab: TabKey) => {
    setSearchParams({ tab })
  }

  const listTitle = activeTab === 'sor' ? 'SOR List' : activeTab === 'uarch' ? 'μARCH List' : 'Features'

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Header with Tabs */}
      <div className="shrink-0 bg-white">
        <div className="flex items-center gap-[16px] h-[49px] px-[16px]">
          {/* Back button + Title */}
          <div className="flex items-center gap-[12px] shrink-0">
            <button
              onClick={() => navigate('/function-management')}
              className="flex items-center justify-center p-[4px] border border-[#DADFE4] rounded-[2px] bg-white hover:bg-[#F3F6F8]"
            >
              <ChevronLeft className="w-[16px] h-[16px] text-[#565E66]" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-[4px]">
              <h1 className="text-[20px] font-bold leading-[24px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                Function Detail Title
              </h1>
              <InfoIcon size={16} />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center h-full">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`px-[12px] py-[6px] text-[14px] font-bold leading-[20px] tracking-[0.8px] border-b-[3px] ${
                  activeTab === tab.key
                    ? 'text-[#3392D3] border-[#3392D3]'
                    : 'text-[#767D84] border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-px bg-[#DADFE4]" />
      </div>

      {/* Sub-header: SOR List title (left) + Toolbar (right) — full width */}
      <div className="shrink-0 flex items-center px-[16px] py-[8px]">
        <span className="w-[184px] shrink-0 text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
          {listTitle}
        </span>
        <div className="flex-1 flex items-center justify-end">
          {/* Edit button */}
          <button className="bg-[#3392D3] rounded-[2px] px-[6px] hover:bg-[#2B7DB5]">
            <span className="text-[12px] font-bold leading-[20px] tracking-[0.8px] text-white">
              Edit
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center w-[13px]">
            <div className="w-px h-[10px] bg-[#CCD1D6]" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-[6px]">
            {['Export PDF', 'Load Template', 'Version History'].map((label) => (
              <button
                key={label}
                className="border border-[#DADFE4] rounded-[2px] px-[6px] bg-white hover:bg-[#F3F6F8]"
              >
                <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] py-[3px] whitespace-nowrap">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width divider */}
      <div className="h-px bg-[#DADFE4]" />

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Content */}
        <div className="flex-1 flex flex-col overflow-hidden border-l border-[#DADFE4]">
          {/* Content Title */}
          <div className="shrink-0 px-[16px] pt-[12px]">
            <h2 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] pb-[12px]">
              {detailContent.title}
            </h2>
            <div className="h-px bg-[#E4E9ED]" />
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-auto px-[16px] pt-[12px] pb-[16px]">
            <div className="border border-[#CCD1D6] rounded-[2px] px-[8px] py-[6px]">
              <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] whitespace-pre-wrap">
                {detailContent.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

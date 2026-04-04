import { useState } from 'react'
import { MatrixCheck } from './srs-management/MatrixCheck'

const tabs = [
  { id: 'matrix-check', label: 'Matrix Check' },
  { id: 'srs-list', label: 'SRS List' },
] as const

type TabId = (typeof tabs)[number]['id']

export function SRSManagement() {
  const [activeTab, setActiveTab] = useState<TabId>('matrix-check')

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Title + Tabs */}
      <div className="flex items-center gap-[8px] px-[12px] pt-[8px] pb-[4px] bg-[#EDF2F4]">
        {/* Page Title */}
        <div className="flex items-center gap-[4px] pr-[8px]">
          <span className="text-[16px] font-bold leading-[22px] tracking-[0.8px] text-[#283037]">
            SRS Management
          </span>
          <IconInfo />
        </div>

        {/* Tabs */}
        <div className="flex items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-[12px] py-[6px] text-[14px] font-bold leading-[20px] tracking-[0.8px] border-b-[2px] ${
                activeTab === tab.id
                  ? 'text-[#3392D3] border-[#3392D3]'
                  : 'text-[#90969D] border-transparent hover:text-[#565E66]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'matrix-check' && <MatrixCheck />}
        {activeTab === 'srs-list' && (
          <div className="flex items-center justify-center h-full text-[#90969D] text-[14px]">
            SRS List (준비 중)
          </div>
        )}
      </div>
    </div>
  )
}

function IconInfo() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="#90969D" strokeWidth="1" fill="none" />
      <path d="M8 5V4" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12V7" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

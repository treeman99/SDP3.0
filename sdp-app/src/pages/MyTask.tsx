import { useState } from 'react'
import { MyErs } from './my-task/my-ers/MyErs'
import { InterestErs } from './my-task/interest-ers/InterestErs'
import { AddInterestErsDialog } from '@/dialog/AddInterestErsDialog'

const tabs = [
  { id: 'my-ers', label: '나의 ERS' },
  { id: 'interest-ers', label: '관심 ERS' },
] as const

type TabId = (typeof tabs)[number]['id']

export function MyTask() {
  const [activeTab, setActiveTab] = useState<TabId>('my-ers')
  const [addErsOpen, setAddErsOpen] = useState(false)

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Title + Tabs */}
      <div className="flex items-center justify-between px-[12px] pt-[8px] pb-[4px] bg-[#EDF2F4]">
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px] pr-[8px]">
            <span className="text-[16px] font-bold leading-[22px] tracking-[0.8px] text-[#283037]">
              My Task
            </span>
            <IconInfo />
          </div>
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
        {activeTab === 'interest-ers' && (
          <button
            onClick={() => setAddErsOpen(true)}
            className="border border-[#DADFE4] bg-white rounded-[2px] px-[8px] py-[4px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
          >
            관심 ERS 추가
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'my-ers' && <MyErs />}
        {activeTab === 'interest-ers' && <InterestErs />}
      </div>

      {/* 관심 ERS 추가 Dialog */}
      <AddInterestErsDialog open={addErsOpen} onClose={() => setAddErsOpen(false)} />
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

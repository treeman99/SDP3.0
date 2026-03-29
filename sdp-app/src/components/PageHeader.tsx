import { StarIcon, ChevronDownIcon, BellIcon } from './icons'
import { cn } from '../lib/utils'

const TABS = [
  { label: 'Matrix Check', active: true },
  { label: 'SRS List', active: false },
]

const NAV_ITEMS = ['My Task', 'Management', 'Test Design']
const RIGHT_LINKS = ['Notification', 'User Guide', 'VOC', 'Confluence', 'Jira', 'Admin 관리']

export function PageHeader() {
  return (
    <div className="flex flex-col w-full border-b border-[#E0E4E8]">
      {/* Global Nav Bar */}
      <div className="flex items-center justify-between h-8 px-4 bg-[#1E2832] text-white text-[11px]">
        <div className="flex items-center gap-4">
          <span className="font-bold text-[13px] text-white tracking-wide">SDP</span>
          <span className="text-[#B0B8C1] cursor-pointer">SENSDES-RND</span>
          {NAV_ITEMS.map((item) => (
            <button key={item} className="flex items-center gap-0.5 text-[#B0B8C1] hover:text-white transition-colors">
              {item}
              <ChevronDownIcon className="opacity-60" />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-[#B0B8C1]">
          <BellIcon />
          {RIGHT_LINKS.map((link) => (
            <span key={link} className="cursor-pointer hover:text-white transition-colors">{link}</span>
          ))}
          <button className="px-2 py-0.5 bg-[#2D6BE4] text-white rounded text-[10px]">
            대화하기
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div
        className="flex items-center justify-between px-4 h-10 bg-[#F3F6F8]"
        style={{ borderBottom: '1px solid #E0E4E8' }}
      >
        {/* Left: title + tabs */}
        <div className="flex items-center h-full">
          {/* Title + star */}
          <div className="flex items-center gap-2 pr-4 mr-4 border-r border-[#CCD1D6] h-6">
            <span className="text-[#384047] font-semibold text-sm">SRS Management</span>
            <StarIcon />
          </div>

          {/* Tabs */}
          <div className="flex items-end h-full gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.label}
                className={cn(
                  'relative flex items-center justify-center px-3 h-full text-xs font-medium transition-colors',
                  tab.active
                    ? 'text-[#2D6BE4]'
                    : 'text-[#767D84] hover:text-[#384047]'
                )}
              >
                {tab.label}
                {tab.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#2D6BE4] rounded-t-sm" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 px-2 py-1 text-xs text-[#56595F] border border-[#CCD1D6] rounded bg-white hover:bg-[#F3F6F8] transition-colors">
            Export
          </button>
          <div className="w-px h-4 bg-[#CCD1D6]" />
          <button className="flex items-center gap-1 px-2 py-1 text-xs text-[#56595F] border border-[#CCD1D6] rounded bg-white hover:bg-[#F3F6F8] transition-colors">
            Button
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-xs text-[#56595F] border border-[#CCD1D6] rounded bg-white hover:bg-[#F3F6F8] transition-colors">
            Button
          </button>
        </div>
      </div>
    </div>
  )
}

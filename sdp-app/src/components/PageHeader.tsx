import { ChevronDownIcon, InfoIcon } from './icons'
import { cn } from '../lib/utils'

const TABS = [
  { label: 'Matrix Check', active: true },
  { label: 'SRS List', active: false },
]

const NAV_ITEMS = ['My Task', 'Management', 'Test Design']
const UTIL_LINKS = ['User Guide', 'VOC', 'Confluence', 'Jira']


function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <line x1="6.5" y1="1"   x2="6.5" y2="4"   stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="6.5" y1="9"   x2="6.5" y2="12"  stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="1"   y1="6.5" x2="4"   y2="6.5" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="9"   y1="6.5" x2="12"  y2="6.5" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="2.7" y1="2.7" x2="4.8" y2="4.8" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="8.2" y1="8.2" x2="10.3" y2="10.3" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="10.3" y1="2.7" x2="8.2" y2="4.8" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="4.8"  y1="8.2" x2="2.7" y2="10.3" stroke="rgba(255,255,255,0.65)" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

export function PageHeader() {
  return (
    <div className="flex flex-col w-full">
      {/* Global Nav Bar */}
      <div
        className="flex items-center justify-between h-10 px-4 text-white text-[11px]"
        style={{ backgroundColor: '#515E94' }}
      >
        {/* Left: logo + tenant + GNB */}
        <div className="flex items-center gap-0">
          {/* SDP Logo */}
          <span className="font-bold text-[14px] text-white tracking-wide mr-3">SDP</span>
          {/* Tenant */}
          <button className="flex items-center gap-0.5 text-white/60 hover:text-white transition-colors mr-3">
            SENSDES-RND
            <ChevronDownIcon className="opacity-50" />
          </button>
          {/* Divider */}
          <div className="w-px h-3 bg-white/20 mr-3" />
          {/* GNB items */}
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              className="flex items-center gap-0.5 px-3 h-10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-[12px]"
            >
              {item}
              <ChevronDownIcon className="opacity-60" />
            </button>
          ))}
        </div>

        {/* Right: utility */}
        <div className="flex items-center gap-0 text-white/70">
          {/* Notification */}
          <button className="relative flex items-center pl-2 pr-4 h-10 text-[11px] text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap">
            Notification
            <span
              className="absolute top-2 right-1 flex items-center justify-center rounded-full text-white leading-none"
              style={{ width: 12, height: 12, fontSize: 7.5, backgroundColor: '#E82C1F' }}
            >
              1
            </span>
          </button>

          {/* Utility links */}
          {UTIL_LINKS.map((link) => (
            <button
              key={link}
              className="flex items-center px-2 h-10 text-[11px] text-white/70 hover:text-white hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              {link}
            </button>
          ))}

          {/* Divider */}
          <div className="w-px h-5 bg-white/20 mx-1" />

          {/* Admin */}
          <button className="flex items-center px-2 h-10 text-[11px] text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            Admin
          </button>

          {/* User name + sparkle */}
          <button className="flex items-center gap-1 px-2 h-10 text-[11px] text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            이삼성
            <SparkleIcon />
          </button>

          {/* CONFIDENTIAL badge */}
          <div
            className="flex items-center justify-center ml-2 px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: '#000', height: 16 }}
          >
            <span className="text-white font-bold leading-none" style={{ fontSize: 9, letterSpacing: '0.6px' }}>
              CONFIDENTIAL
            </span>
          </div>
        </div>
      </div>

      {/* Page Sub-Header (title + tabs) */}
      <div
        className="flex items-center justify-between px-4 h-10 bg-white"
        style={{ borderBottom: '1px solid #E0E4E8' }}
      >
        {/* Left: title + tabs */}
        <div className="flex items-center h-full">
          {/* Title */}
          <div className="flex items-center gap-1.5 pr-4 mr-2 border-r border-[#CCD1D6] h-6">
            <span className="text-[#384047] font-semibold text-[13px]">SRS Management</span>
            <InfoIcon className="opacity-50" />
          </div>

          {/* Tabs */}
          <div className="flex items-end h-full gap-0">
            {TABS.map((tab) => (
              <button
                key={tab.label}
                className={cn(
                  'relative flex items-center justify-center px-3 h-full text-[12px] font-medium transition-colors',
                  tab.active ? 'text-[#2D6BE4]' : 'text-[#767D84] hover:text-[#384047]'
                )}
              >
                {tab.label}
                {tab.active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2D6BE4] rounded-t-sm" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-1.5">
          <button className="flex items-center gap-1 px-2 py-1 text-[11px] text-[#56595F] border border-[#CCD1D6] rounded-sm bg-white hover:bg-[#F3F6F8] transition-colors">
            Export
          </button>
          <div className="w-px h-4 bg-[#CCD1D6]" />
          <button className="flex items-center gap-1 px-2 py-1 text-[11px] text-[#56595F] border border-[#CCD1D6] rounded-sm bg-white hover:bg-[#F3F6F8] transition-colors">
            Button
          </button>
          <button className="flex items-center gap-1 px-2 py-1 text-[11px] text-[#56595F] border border-[#CCD1D6] rounded-sm bg-white hover:bg-[#F3F6F8] transition-colors">
            Button
          </button>
        </div>
      </div>
    </div>
  )
}

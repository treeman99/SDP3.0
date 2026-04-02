import { ChevronDown } from 'lucide-react'

const gnbItems = [
  { label: 'My Task', hasDropdown: false },
  { label: 'Management', hasDropdown: true },
  { label: 'Test Design', hasDropdown: true },
]

const utilityItems = ['User Guide', 'VOC', 'Confluence', 'Jira']

export function Header() {
  return (
    <header className="flex items-center justify-between h-[40px] bg-[#515E94] px-[12px] shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_1px_2px_0px_rgba(40,48,55,0.12)]">
      {/* Left: Logo, Tenant, GNB */}
      <div className="flex items-center">
        {/* Logo */}
        <div className="pr-[8px]">
          <span className="text-[19px] font-bold leading-[24px] tracking-[0.8px] text-white" style={{ fontFamily: "'Samsung Sharp Sans', sans-serif" }}>
            SDP
          </span>
        </div>

        {/* Tenant */}
        <div className="flex items-center h-[40px] px-[8px] gap-[4px] rounded-[2px]">
          <span className="text-[13px] font-bold leading-[16px] tracking-[0.8px] text-white pt-[2px]" style={{ fontFamily: "'Samsung Sharp Sans', sans-serif" }}>
            SENSDES-RND
          </span>
          <ChevronDown className="w-[14px] h-[14px] text-[#F3F6F8]" />
        </div>

        {/* Divider */}
        <div className="px-[4px]">
          <div className="w-px h-[10px] bg-white opacity-20" />
        </div>

        {/* GNB */}
        <nav className="flex items-center pl-[4px]">
          {gnbItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center h-[40px] px-[8px] gap-[4px] rounded-[2px] hover:bg-white/10"
            >
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white pb-[2px]">
                {item.label}
              </span>
              {item.hasDropdown && (
                <ChevronDown className="w-[14px] h-[14px] text-[#F3F6F8]" />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Right: Utility */}
      <div className="flex items-center">
        {/* Notification with badge */}
        <div className="relative">
          <button className="flex items-center px-[6px] py-[3px] rounded-[2px] hover:bg-white/10">
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-white">
              Notification
            </span>
          </button>
          <div className="absolute -top-[2px] -right-[2px] flex items-center justify-center min-w-[12px] h-[12px] px-[2px] bg-[#E82C1F] border-[0.5px] border-[#F73529] rounded-full">
            <span className="text-[11px] leading-[12px] tracking-[0.8px] text-white text-center">
              1
            </span>
          </div>
        </div>

        {/* Utility links */}
        {utilityItems.map((item) => (
          <button
            key={item}
            className="flex items-center px-[6px] py-[3px] rounded-[2px] hover:bg-white/10"
          >
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#F3F6F8]">
              {item}
            </span>
          </button>
        ))}

        {/* Divider */}
        <div className="px-[4px]">
          <div className="w-px h-[10px] bg-white opacity-20" />
        </div>

        {/* Profile */}
        <button className="flex items-center px-[6px] py-[3px] rounded-[2px] hover:bg-white/10">
          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#F3F6F8]">
            Admin
          </span>
        </button>
        <button className="flex items-center px-[6px] py-[3px] gap-[4px] rounded-[2px] hover:bg-white/10">
          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#F3F6F8]">
            이삼성
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#F3F6F8]">
            <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
            <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.76 2.76l1.41 1.41M9.83 9.83l1.41 1.41M2.76 11.24l1.41-1.41M9.83 4.17l1.41-1.41" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </button>

        {/* CONFIDENTIAL badge */}
        <div className="h-[14px] w-[72px] rounded-[2px] overflow-hidden relative ml-[2px]">
          <div className="absolute inset-0 bg-black opacity-30 rounded-[2px]" />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold tracking-[0.5px] text-white opacity-80">
            CONFIDENTIAL
          </span>
        </div>
      </div>
    </header>
  )
}

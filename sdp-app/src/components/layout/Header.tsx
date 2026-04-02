import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { NotificationListDialog } from '@/components/NotificationListDialog'

interface NotificationItem {
  id: string
  title: string
  body: string
  link?: { label: string; href: string }
  date: string
  isNew?: boolean
}

const tenantOptions = ['SENSDES-RND', 'Project Name', 'SENSER Test Chip', 'Megabox', 'CGV']

const managementItems = [
  { key: 'menu.srsManagement', path: '/srs-management' },
  { key: 'menu.ersManagement', path: '/ers-management' },
  { key: 'menu.functionManagement', path: '/function-management' },
  { key: 'menu.complianceMatrix', path: '/compliance-matrix' },
]

const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'ERS 업데이트',
    body: 'Index 1.1.1외 5건이 업데이트 되었습니다. ',
    link: { label: 'ERS 바로가기', href: '/ers-management' },
    date: '2025-05-20',
    isNew: true,
  },
  {
    id: '2',
    title: '시스템 정기 점검',
    body: '2025-05-25 00:00 ~ 05-25 04:00 정기 점검으로 인해 해당 기간 동안 시스템 점검 예정입니다. 시스템 점검 예정입니다.',
    date: '2025-05-19',
  },
  {
    id: '3',
    title: '시스템 정기 점검',
    body: '2025-05-25 00:00 ~ 05-25 04:00 정기 점검으로 인해 해당 기간 동안 시스템 점검 예정입니다. 시스템 점검 예정입니다.',
    date: '2025-05-19',
  },
]

const utilityItems = [
  { key: 'header.userGuide' },
  { key: 'header.voc' },
  { key: 'header.confluence' },
  { key: 'header.jira' },
]

type OpenMenu = 'tenant' | 'management' | 'testDesign' | 'notification' | 'settings' | null

export function Header() {
  const { setLanguage, t } = useLanguage()
  const navigate = useNavigate()
  const [selectedTenant, setSelectedTenant] = useState('SENSDES-RND')
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const [showLangSubmenu, setShowLangSubmenu] = useState(false)
  const [notifListOpen, setNotifListOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
        setShowLangSubmenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = (menu: OpenMenu) => {
    if (openMenu === menu) {
      setOpenMenu(null)
      setShowLangSubmenu(false)
    } else {
      setOpenMenu(menu)
      setShowLangSubmenu(false)
    }
  }

  return (
    <>
    <NotificationListDialog open={notifListOpen} onClose={() => setNotifListOpen(false)} />
    <header ref={headerRef} className="relative flex items-center justify-between h-[40px] bg-[#515E94] px-[12px] shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_1px_2px_0px_rgba(40,48,55,0.12)] z-50">
      {/* Left: Logo, Tenant, GNB */}
      <div className="flex items-center">
        {/* Logo */}
        <div className="pr-[8px]">
          <span className="text-[19px] font-bold leading-[24px] tracking-[0.8px] text-white" style={{ fontFamily: "'Samsung Sharp Sans', sans-serif" }}>
            SDP
          </span>
        </div>

        {/* Tenant */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('tenant')}
            className="flex items-center h-[40px] px-[8px] gap-[4px] rounded-[2px] hover:bg-white/10"
          >
            <span className="text-[13px] font-bold leading-[16px] tracking-[0.8px] text-white pt-[2px]" style={{ fontFamily: "'Samsung Sharp Sans', sans-serif" }}>
              {selectedTenant}
            </span>
            <ChevronDown className="w-[14px] h-[14px] text-[#F3F6F8]" />
          </button>
          {openMenu === 'tenant' && (
            <DropdownMenu width={160}>
              {tenantOptions.map((item) => (
                <DropdownItem
                  key={item}
                  label={item}
                  isHovered={item === 'Project Name'}
                  onClick={() => {
                    setSelectedTenant(item)
                    setOpenMenu(null)
                  }}
                />
              ))}
            </DropdownMenu>
          )}
        </div>

        {/* Divider */}
        <div className="px-[4px]">
          <div className="w-px h-[10px] bg-white opacity-20" />
        </div>

        {/* GNB */}
        <nav className="flex items-center pl-[4px]">
          {/* My Task - no dropdown */}
          <button className="flex items-center h-[40px] px-[8px] gap-[4px] rounded-[2px] hover:bg-white/10">
            <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white pb-[2px]">
              {t('gnb.myTask')}
            </span>
          </button>

          {/* Management - dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('management')}
              className="flex items-center h-[40px] px-[8px] gap-[4px] rounded-[2px] hover:bg-white/10"
            >
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white pb-[2px]">
                {t('gnb.management')}
              </span>
              <ChevronDown className="w-[14px] h-[14px] text-[#F3F6F8]" />
            </button>
            {openMenu === 'management' && (
              <DropdownMenu width={180}>
                {managementItems.map((item) => (
                  <DropdownItem
                    key={item.key}
                    label={t(item.key)}
                    onClick={() => {
                      navigate(item.path)
                      setOpenMenu(null)
                    }}
                  />
                ))}
              </DropdownMenu>
            )}
          </div>

          {/* Test Design - dropdown (placeholder) */}
          <div className="relative">
            <button
              onClick={() => toggleMenu('testDesign')}
              className="flex items-center h-[40px] px-[8px] gap-[4px] rounded-[2px] hover:bg-white/10"
            >
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white pb-[2px]">
                {t('gnb.testDesign')}
              </span>
              <ChevronDown className="w-[14px] h-[14px] text-[#F3F6F8]" />
            </button>
          </div>
        </nav>
      </div>

      {/* Right: Utility */}
      <div className="flex items-center">
        {/* Notification with badge */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('notification')}
            className="flex items-center px-[6px] py-[3px] rounded-[2px] hover:bg-white/10"
          >
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-white">
              {t('header.notification')}
            </span>
          </button>
          <div className="absolute -top-[2px] -right-[2px] flex items-center justify-center min-w-[12px] h-[12px] px-[2px] bg-[#E82C1F] border-[0.5px] border-[#F73529] rounded-full pointer-events-none">
            <span className="text-[11px] leading-[12px] tracking-[0.8px] text-white text-center">
              {notifications.filter(n => n.isNew).length || 1}
            </span>
          </div>
          {openMenu === 'notification' && (
            <NotificationPanel
              items={notifications}
              viewPreviousLabel={t('notification.viewPrevious')}
              onViewAll={() => {
                setOpenMenu(null)
                setNotifListOpen(true)
              }}
            />
          )}
        </div>

        {/* Utility links */}
        {utilityItems.map((item) => (
          <button
            key={item.key}
            className="flex items-center px-[6px] py-[3px] rounded-[2px] hover:bg-white/10"
          >
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#F3F6F8]">
              {t(item.key)}
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
            {t('header.admin')}
          </span>
        </button>

        {/* Settings (이삼성 + gear icon) */}
        <div className="relative">
          <button
            onClick={() => toggleMenu('settings')}
            className="flex items-center px-[6px] py-[3px] gap-[4px] rounded-[2px] hover:bg-white/10"
          >
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#F3F6F8]">
              이삼성
            </span>
            <GearIcon />
          </button>
          {openMenu === 'settings' && (
            <div className="absolute right-0 top-full mt-[2px] z-50">
              <DropdownMenu width={150} absolute={false} className="relative">
                <DropdownItem label={t('settings.userInfo')} onClick={() => setOpenMenu(null)} />
                <DropdownItem
                  label={t('settings.language')}
                  hasSubmenu
                  onClick={() => setShowLangSubmenu(!showLangSubmenu)}
                  onMouseEnter={() => setShowLangSubmenu(true)}
                />
              </DropdownMenu>
              {showLangSubmenu && (
                <div className="absolute left-full top-[26px]" style={{ marginLeft: 0 }}>
                  <DropdownMenu width={150} absolute={false}>
                    <DropdownItem
                      label={t('settings.korean')}
                      onClick={() => {
                        setLanguage('ko')
                        setOpenMenu(null)
                        setShowLangSubmenu(false)
                      }}
                    />
                    <DropdownItem
                      label={t('settings.english')}
                      onClick={() => {
                        setLanguage('en')
                        setOpenMenu(null)
                        setShowLangSubmenu(false)
                      }}
                    />
                  </DropdownMenu>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CONFIDENTIAL badge */}
        <div className="h-[14px] w-[72px] rounded-[2px] overflow-hidden relative ml-[2px]">
          <div className="absolute inset-0 bg-black opacity-30 rounded-[2px]" />
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold tracking-[0.5px] text-white opacity-80">
            CONFIDENTIAL
          </span>
        </div>
      </div>
    </header>
    </>
  )
}

/* ─── Dropdown Components ─── */

function DropdownMenu({ children, width, className, absolute = true }: { children: React.ReactNode; width: number; className?: string; absolute?: boolean }) {
  return (
    <div
      className={`bg-white rounded-[2px] py-[6px] px-px flex flex-col items-stretch ${absolute ? 'absolute left-0 top-full mt-[2px] z-50' : ''} ${className ?? ''}`}
      style={{
        width,
        boxShadow: '0px 0px 2px 0px rgba(40,48,55,0.12), 0px 8px 14px 0px rgba(40,48,55,0.14)',
      }}
    >
      {children}
    </div>
  )
}

function DropdownItem({
  label,
  onClick,
  isHovered,
  hasSubmenu,
  onMouseEnter,
}: {
  label: string
  onClick?: () => void
  isHovered?: boolean
  hasSubmenu?: boolean
  onMouseEnter?: () => void
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`flex items-center w-full h-[26px] pl-[10px] pr-[8px] text-left text-[14px] leading-[20px] tracking-[0.8px] text-[#283037] hover:bg-[#EDF2F4] ${isHovered ? 'bg-[#EDF2F4]' : ''}`}
    >
      <span className="flex-1 truncate">{label}</span>
      {hasSubmenu && <ChevronRightIcon />}
    </button>
  )
}

/* ─── Notification Panel ─── */

function NotificationPanel({ items, viewPreviousLabel, onViewAll }: { items: NotificationItem[]; viewPreviousLabel: string; onViewAll?: () => void }) {
  return (
    <div
      className="absolute right-0 top-full mt-[2px] bg-white rounded-[4px] overflow-hidden flex flex-col z-50"
      style={{
        width: 340,
        height: 377,
        boxShadow: '0px 0px 2px 0px rgba(40,48,55,0.12), 0px 4px 8px 1px rgba(40,48,55,0.12)',
      }}
    >
      {/* Cards */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`px-[16px] pt-[11px] pb-[10px] ${index === 0 ? 'bg-[#EDF2F4]' : 'bg-white'}`}
          >
            <div className="flex flex-col gap-[4px]">
              <div className="px-[4px]">
                <p className="text-[16px] leading-[22px] tracking-[0.8px] text-[#565E66]">
                  {item.title}
                </p>
              </div>
              <div className="pl-[4px]">
                <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66] line-clamp-2">
                  {item.body}
                  {item.link && (
                    <>
                      <br />
                      <a href={item.link.href} className="text-[#515E94] underline">
                        {item.link.label}
                      </a>
                    </>
                  )}
                </p>
              </div>
              <div className="pl-[4px]">
                <p className="text-[14px] leading-[20px] text-[#90969D]">
                  {item.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="shrink-0">
        <div className="h-px bg-[#E4E9ED]" />
        <button onClick={onViewAll} className="w-full bg-[#F3F6F8] p-[10px] rounded-b-[4px] flex items-center justify-center gap-[2px] hover:bg-[#E4E9ED]">
          <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66]">
            {viewPreviousLabel}
          </span>
          <OpenTabIcon />
        </button>
      </div>
    </div>
  )
}

/* ─── Icons ─── */

function GearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#F3F6F8]">
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M7 1v2M7 11v2M1 7h2M11 7h2M2.76 2.76l1.41 1.41M9.83 9.83l1.41 1.41M2.76 11.24l1.41-1.41M9.83 4.17l1.41-1.41" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3.5L8.5 7L5 10.5" stroke="#565E66" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OpenTabIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 2H3C2.44772 2 2 2.44772 2 3V11C2 11.5523 2.44772 12 3 12H11C11.5523 12 12 11.5523 12 11V9" stroke="#565E66" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 2H12V6" stroke="#565E66" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2L7 7" stroke="#565E66" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

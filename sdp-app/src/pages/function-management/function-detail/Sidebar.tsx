import { useState } from 'react'
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react'
import { sidebarSections, type SidebarSection } from './MockData'

function AccordionItem({ section }: { section: SidebarSection }) {
  const [expanded, setExpanded] = useState(section.expanded ?? false)

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-[8px] w-full bg-white pb-[5px] pl-[16px] pr-[7px] pt-[6px] hover:bg-[#F7F9FA]"
      >
        <span className="flex-1 text-left text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-nowrap overflow-hidden text-ellipsis">
          {section.title}
        </span>
        {expanded ? (
          <ChevronUp className="w-[14px] h-[14px] text-[#565E66] shrink-0" strokeWidth={1.5} />
        ) : (
          <ChevronDown className="w-[14px] h-[14px] text-[#565E66] shrink-0" strokeWidth={1.5} />
        )}
      </button>
      <div className="h-px bg-[#E4E9ED]" />
      {expanded && section.children && (
        <div className="flex flex-col">
          <div className="h-[3px] bg-white" />
          {section.children.map((child, idx) => (
            <div key={child.id}>
              {child.type === 'tree' ? (
                <TreeItem section={child} />
              ) : (
                <LeafItem section={child} />
              )}
              {idx < section.children!.length - 1 && child.type === 'tree' && !child.expanded && (
                <div className="px-[12px]">
                  <div className="h-px bg-[#E4E9ED]" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TreeItem({ section }: { section: SidebarSection }) {
  const [expanded, setExpanded] = useState(section.expanded ?? false)

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-[3px] h-[32px] pl-[10px] pr-[20px] bg-white hover:bg-[#F7F9FA] w-full"
      >
        {expanded ? (
          <ChevronDown className="w-[14px] h-[14px] text-[#565E66] shrink-0" strokeWidth={1.5} />
        ) : (
          <ChevronRight className="w-[14px] h-[14px] text-[#565E66] shrink-0" strokeWidth={1.5} />
        )}
        <span className="flex-1 text-left text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-nowrap overflow-hidden text-ellipsis">
          {section.title}
        </span>
      </button>
      {expanded && section.children && (
        <div className="flex flex-col">
          {section.children.map((child) => (
            <LeafItem key={child.id} section={child} />
          ))}
          <div className="px-[12px]">
            <div className="h-px bg-[#E4E9ED]" />
          </div>
        </div>
      )}
    </div>
  )
}

function LeafItem({ section }: { section: SidebarSection }) {
  if (section.selected) {
    return (
      <div className="flex items-center h-[26px] bg-[#FAFBFC] w-full">
        <div className="w-[3px] h-full bg-[#3392D3]" />
        <span className="flex-1 text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#0077C8] pl-[24px] pr-[6px] whitespace-nowrap overflow-hidden text-ellipsis">
          {section.title}
        </span>
      </div>
    )
  }

  return (
    <button className="flex items-center h-[26px] pl-[27px] pr-[20px] bg-white hover:bg-[#F7F9FA] w-full">
      <span className="flex-1 text-left text-[12px] leading-[14px] tracking-[0.8px] text-[#565E66] whitespace-nowrap overflow-hidden text-ellipsis">
        {section.title}
      </span>
    </button>
  )
}

export function Sidebar() {
  return (
    <div className="w-[200px] shrink-0 flex flex-col overflow-y-auto bg-white">
      {sidebarSections.map((section) => {
        if (section.type === 'accordion') {
          return <AccordionItem key={section.id} section={section} />
        }
        return null
      })}
    </div>
  )
}

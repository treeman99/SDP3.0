import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react'
import { InfoTooltip } from '@/components/common/InfoTooltip'
import {
  ersDescription, srsTreeData, srsDetailData,
  assigneeOptions, coworkerOptions, statusOptions, functionOptions,
} from './MockData'
import type { SrsTreeGroup } from './MockData'
import { ErsVersionHistoryDialog } from '@/dialog/ErsVersionHistoryDialog'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'

interface SelectBoxProps {
  value: string
  options: string[]
  onChange: (value: string) => void
}

function SelectBox({ value, options, onChange }: SelectBoxProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full border border-[#CCD1D6] rounded-[2px] bg-white pl-[6px] pr-[4px] hover:border-[#90969D]"
      >
        <span className="flex-1 text-left text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] py-[3px] truncate">
          {value}
        </span>
        <ChevronDown className="w-[14px] h-[14px] text-[#565E66] shrink-0 ml-[2px]" strokeWidth={1.5} />
      </button>
      {open && (
        <div className="absolute z-10 top-full left-0 right-0 mt-[1px] bg-white border border-[#CCD1D6] rounded-[2px] shadow-sm max-h-[160px] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`flex items-center w-full px-[6px] py-[4px] text-[12px] leading-[14px] tracking-[0.8px] hover:bg-[#F3F6F8] ${
                opt === value ? 'bg-[#EBF5FB] text-[#3392D3] font-bold' : 'text-[#384047]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface MultiSelectBoxProps {
  values: string[]
  options: string[]
  onChange: (values: string[]) => void
}

function MultiSelectBox({ values, options, onChange }: MultiSelectBoxProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const toggleOption = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter(v => v !== opt))
    } else {
      onChange([...values, opt])
    }
  }

  const removeValue = (opt: string) => {
    onChange(values.filter(v => v !== opt))
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center w-full border border-[#CCD1D6] rounded-[2px] bg-white pl-[6px] pr-[4px] py-[3px] hover:border-[#90969D]"
      >
        <div className="flex-1 flex items-center gap-[4px] flex-wrap">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-[2px] px-[4px] py-[2px] border border-[#DADFE4] bg-[#E4E9ED] text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]"
            >
              {v}
              <X
                className="w-[10px] h-[10px] text-[#90969D] cursor-pointer hover:text-[#565E66]"
                strokeWidth={2}
                onClick={(e) => { e.stopPropagation(); removeValue(v) }}
              />
            </span>
          ))}
        </div>
        <ChevronDown className="w-[14px] h-[14px] text-[#565E66] shrink-0 ml-[2px]" strokeWidth={1.5} />
      </button>
      {open && (
        <div className="absolute z-10 top-full left-0 right-0 mt-[1px] bg-white border border-[#CCD1D6] rounded-[2px] shadow-sm max-h-[160px] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`flex items-center w-full px-[6px] py-[4px] text-[12px] leading-[14px] tracking-[0.8px] hover:bg-[#F3F6F8] ${
                values.includes(opt) ? 'bg-[#EBF5FB] text-[#3392D3] font-bold' : 'text-[#384047]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface EditFormState {
  summary: string
  assignee: string
  coworkers: string[]
  expectedValues: string[]
  supportStatus: string
  description: string
  supportExpectedValue: string
}

export function SrsDetail() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState('a2-2')
  const [treeState, setTreeState] = useState<SrsTreeGroup[]>(srsTreeData)
  const [isEditing, setIsEditing] = useState(false)
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState<EditFormState>({
    summary: srsDetailData.summary,
    assignee: srsDetailData.assignee,
    coworkers: [srsDetailData.coworker],
    expectedValues: [...srsDetailData.expectedValues],
    supportStatus: srsDetailData.supportStatus,
    description: srsDetailData.description,
    supportExpectedValue: srsDetailData.supportExpectedValue,
  })

  const toggleGroup = (idx: number) => {
    setTreeState(prev => prev.map((g, i) => i === idx ? { ...g, expanded: !g.expanded } : g))
  }

  const totalItems = treeState.reduce((sum, g) => sum + g.items.length, 0)

  const handleEdit = () => {
    setEditForm({
      summary: srsDetailData.summary,
      assignee: srsDetailData.assignee,
      coworkers: [srsDetailData.coworker],
      expectedValues: [...srsDetailData.expectedValues],
      supportStatus: srsDetailData.supportStatus,
      description: srsDetailData.description,
      supportExpectedValue: srsDetailData.supportExpectedValue,
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Header */}
      <div className="flex items-center justify-between px-[16px] h-[49px] border-b border-[#DADFE4] shrink-0">
        <div className="flex items-center gap-[12px]">
          <button
            onClick={() => navigate('/srs-management')}
            className="border border-[#DADFE4] bg-white rounded-[2px] p-[4px] hover:bg-[#F3F6F8]"
          >
            <ChevronLeft className="w-[16px] h-[16px] text-[#565E66]" strokeWidth={1.5} />
          </button>
          <div className="flex items-center gap-[4px]">
            <span className="text-[20px] font-bold leading-[24px] tracking-[0.8px] text-[#384047]">
              1.9.2 ERS Title Detail
            </span>
            <InfoTooltip title="ERS Title Detail" description="ERS 상세 정보" />
          </div>
          <button className="bg-[#3392D3] rounded-[2px] px-[8px] py-[2px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]">
            Create SRS
          </button>
        </div>
      </div>

      {/* 3-Panel Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - ERS Description */}
        <div className="w-[460px] shrink-0 border-r border-[#DADFE4] flex flex-col">
          <div className="flex items-center justify-between px-[16px] py-[8px] shrink-0">
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047]">
              Last Updated: 2025-02-21
            </span>
            <button
              onClick={() => setVersionHistoryOpen(true)}
              className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
            >
              Version History
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-[16px] pb-[16px]">
            <p className="text-[12px] leading-[18px] tracking-[0.8px] text-[#384047] whitespace-pre-line">
              {ersDescription}
            </p>
          </div>
        </div>

        {/* Middle Panel - SRS List Tree */}
        <div className="w-[200px] shrink-0 border-r border-[#DADFE4] flex flex-col bg-white">
          {/* Tree Header */}
          <div className="flex items-center gap-[2px] px-[12px] h-[49px] border-b border-[#E4E9ED] shrink-0">
            <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66]">
              SRS List
            </span>
            <div className="flex items-center justify-center w-[13px]">
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
            </div>
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#90969D]">
              Total {totalItems}
            </span>
          </div>
          {/* Tree Content */}
          <div className="flex-1 overflow-y-auto">
            {treeState.map((group, gIdx) => (
              <div key={gIdx}>
                <button
                  onClick={() => toggleGroup(gIdx)}
                  className="flex items-center gap-[3px] w-full h-[32px] pl-[8px] pr-[20px] hover:bg-[#F7F9FB]"
                >
                  {group.expanded ? (
                    <ChevronDown className="w-[14px] h-[14px] text-[#565E66] shrink-0" strokeWidth={1.5} />
                  ) : (
                    <ChevronRight className="w-[14px] h-[14px] text-[#565E66] shrink-0" strokeWidth={1.5} />
                  )}
                  <span className="text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66] truncate">
                    {group.label}
                  </span>
                </button>
                {!group.expanded && (
                  <div className="h-px bg-[#E4E9ED]" />
                )}
                {group.expanded && (
                  <>
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => !item.disabled && setSelectedId(item.id)}
                        className={`flex items-center w-full h-[26px] pr-[6px] ${
                          selectedId === item.id ? 'bg-[#F7F9FB]' : ''
                        } ${item.disabled ? 'cursor-default' : 'hover:bg-[#F7F9FB]'}`}
                      >
                        <div className={`w-[3px] h-full shrink-0 ${selectedId === item.id ? 'bg-[#3392D3]' : ''}`} />
                        <span className={`flex-1 text-left pl-[22px] text-[12px] tracking-[0.8px] truncate ${
                          selectedId === item.id
                            ? 'font-bold leading-[20px] text-[#0077C8]'
                            : item.disabled
                              ? 'leading-[14px] text-[#B2B6BB]'
                              : 'leading-[14px] text-[#565E66]'
                        }`}>
                          {item.label}
                        </span>
                      </button>
                    ))}
                    <div className="h-px bg-[#E4E9ED]" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - SRS Detail */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Detail Header - 고정 */}
          <div className="flex items-center justify-between px-[16px] h-[49px] border-b border-[#DADFE4] shrink-0">
            <span className="text-[16px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
              {srsDetailData.title}
            </span>
            {isEditing ? (
              <div className="flex items-center gap-[6px]">
                <button className="bg-[#3392D3] rounded-[2px] px-[6px] text-[12px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]">
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-[2px]">
                <div className="flex items-center gap-[6px]">
                  <button
                    onClick={handleEdit}
                    className="bg-[#3392D3] rounded-[2px] px-[6px] text-[12px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteDialogOpen(true)}
                    className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center justify-center w-[13px]">
                  <div className="w-px h-[10px] bg-[#CCD1D6]" />
                </div>
                <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                  Approve
                </button>
                <div className="flex items-center justify-center w-[13px]">
                  <div className="w-px h-[10px] bg-[#CCD1D6]" />
                </div>
                <button
                  onClick={() => setVersionHistoryOpen(true)}
                  className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
                >
                  Version History
                </button>
              </div>
            )}
          </div>

          {/* Detail Content - 스크롤 영역 */}
          <div className="flex-1 overflow-y-auto px-[16px] pt-[12px] pb-[16px] flex flex-col gap-[16px]">
            {/* Information Section */}
            <div>
              <h3 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] mb-[8px]">
                Information
              </h3>
              <div className="border border-[#DADFE4]">
                {/* Row 1: Summary */}
                <div className="flex border-b border-[#E4E9ED]">
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Summary</span>
                  </div>
                  <div className="flex-1 px-[10px] py-[5px]">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.summary}
                        onChange={(e) => setEditForm(prev => ({ ...prev, summary: e.target.value }))}
                        className="w-full border border-[#CCD1D6] rounded-[2px] pl-[6px] pr-[4px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] outline-none focus:border-[#3392D3]"
                      />
                    ) : (
                      <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">{srsDetailData.summary}</span>
                    )}
                  </div>
                </div>
                {/* Row 2: Progress */}
                <div className="flex border-b border-[#E4E9ED]">
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Progress</span>
                  </div>
                  <div className="w-[140px] shrink-0 px-[10px] py-[6px] border-r border-[#E4E9ED]">
                    <span className="inline-flex items-center justify-center px-[6px] py-[3px] rounded-[2px] border border-[#B3E8F6] text-[12px] leading-[14px] tracking-[0.8px] bg-[#CCF0F9] text-[#007492]">
                      {srsDetailData.progress}
                    </span>
                  </div>
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Last Updated</span>
                  </div>
                  <div className="w-[140px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">{srsDetailData.lastUpdated}</span>
                  </div>
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Updated User</span>
                  </div>
                  <div className="flex-1 px-[10px] py-[8px]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">{srsDetailData.updatedUser}</span>
                  </div>
                </div>
                {/* Row 3: Expected Value */}
                <div className="flex border-b border-[#E4E9ED]">
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Expected Value</span>
                  </div>
                  <div className="flex-1 px-[10px] py-[4px]">
                    {isEditing ? (
                      <MultiSelectBox
                        values={editForm.expectedValues}
                        options={functionOptions}
                        onChange={(values) => setEditForm(prev => ({ ...prev, expectedValues: values }))}
                      />
                    ) : (
                      <div className="flex items-center gap-[4px] flex-wrap py-[3px]">
                        {srsDetailData.expectedValues.map((v, i) => (
                          <span key={i} className="inline-flex items-center justify-center px-[4px] py-[2px] border border-[#DADFE4] bg-[#E4E9ED] text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">
                            {v}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Row 4: Assignee */}
                <div className="flex">
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Assignee</span>
                  </div>
                  <div className="w-[140px] shrink-0 px-[10px] py-[5px] border-r border-[#E4E9ED]">
                    {isEditing ? (
                      <SelectBox
                        value={editForm.assignee}
                        options={assigneeOptions}
                        onChange={(v) => setEditForm(prev => ({ ...prev, assignee: v }))}
                      />
                    ) : (
                      <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">{srsDetailData.assignee}</span>
                    )}
                  </div>
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Coworker</span>
                  </div>
                  <div className="flex-1 px-[10px] py-[5px]">
                    {isEditing ? (
                      <MultiSelectBox
                        values={editForm.coworkers}
                        options={coworkerOptions}
                        onChange={(values) => setEditForm(prev => ({ ...prev, coworkers: values }))}
                      />
                    ) : (
                      <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">{srsDetailData.coworker}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div>
              <h3 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] mb-[8px]">
                Description
              </h3>
              <div className="border border-[#CCD1D6] rounded-[2px] px-[8px] py-[6px]">
                {isEditing ? (
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full min-h-[200px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] outline-none resize-y"
                  />
                ) : (
                  <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] whitespace-pre-line">
                    {srsDetailData.description}
                  </p>
                )}
              </div>
            </div>

            {/* Support Comment Section */}
            <div>
              <div className="flex items-center justify-between mb-[8px]">
                <div className="flex items-center gap-[4px]">
                  <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                    Support Comment
                  </span>
                  <InfoTooltip title="Support Comment" description="Support Comment 설명" />
                </div>
                <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                  작성 가이드
                </button>
              </div>
              <div className="border border-[#DADFE4]">
                {/* Status Row */}
                <div className="flex border-b border-[#E4E9ED]">
                  <div className="w-[120px] shrink-0 px-[10px] py-[8px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Status</span>
                  </div>
                  <div className="flex-1 px-[10px] py-[5px]">
                    {isEditing ? (
                      <SelectBox
                        value={editForm.supportStatus}
                        options={statusOptions}
                        onChange={(v) => setEditForm(prev => ({ ...prev, supportStatus: v }))}
                      />
                    ) : (
                      <div className="flex items-center gap-[4px] py-[3px]">
                        <div className="w-[4px] h-[4px] rounded-full bg-[#D2362C]" />
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#D2362C]">
                          {srsDetailData.supportStatus}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Expected Value Row */}
                <div className="flex">
                  <div className="w-[120px] shrink-0 px-[10px] py-[10px] border-r border-[#E4E9ED] bg-[#FAFBFC]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">Expected Value</span>
                  </div>
                  <div className="flex-1 px-[10px] py-[10px]">
                    <div className="border border-[#CCD1D6] rounded-[2px] px-[8px] py-[6px]">
                      {isEditing ? (
                        <textarea
                          value={editForm.supportExpectedValue}
                          onChange={(e) => setEditForm(prev => ({ ...prev, supportExpectedValue: e.target.value }))}
                          className="w-full min-h-[100px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] outline-none resize-y"
                        />
                      ) : (
                        <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047]">
                          {srsDetailData.supportExpectedValue}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ErsVersionHistoryDialog
        open={versionHistoryOpen}
        onClose={() => setVersionHistoryOpen(false)}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => { /* TODO: 삭제 처리 */ }}
        title="SRS 삭제"
        message="현재 페이지의 SRS를 삭제하시겠습니까?"
        confirmLabel="삭제"
      />
    </div>
  )
}

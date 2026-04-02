import { useState } from 'react'

/**
 * 컬럼 그룹 데이터 구조
 * - 새 그룹/항목 추가 시 이 배열만 수정하면 됩니다.
 * - checked: 초기 체크 상태
 */
interface ColumnItem {
  key: string
  label: string
  checked: boolean
}

interface ColumnGroup {
  key: string
  label: string
  items: ColumnItem[]
}

const initialColumnGroups: ColumnGroup[] = [
  {
    key: 'requirement',
    label: 'Requirement',
    items: [
      { key: 'complianceTrackerId', label: 'Compliance Tracker ID', checked: true },
      { key: 'sortOrder', label: 'SortOrder', checked: true },
      { key: 'ersRequirementId', label: 'ERS Requirement ID', checked: true },
      { key: 'ersRequirementId2', label: 'ERS Requirement ID', checked: true },
      { key: 'category', label: 'Category', checked: true },
      { key: 'siliconRevision', label: 'Silicon Revision', checked: true },
      { key: 'description', label: 'Description', checked: true },
    ],
  },
  {
    key: 'complianceDetail',
    label: 'Compliance Detail',
    items: [
      { key: 'vendorAcceptance', label: 'Vendor Acceptance', checked: true },
      { key: 'complianceDetails', label: 'Compliance Details', checked: true },
      { key: 'srsIndex', label: 'SRS Index', checked: true },
      { key: 'customerComments', label: 'Compliance Details(Customer Comments)', checked: true },
    ],
  },
  {
    key: 'design',
    label: 'Design',
    items: [
      { key: 'designSpecRadar', label: 'Design Spec Radar', checked: true },
      { key: 'designSpecDocument', label: 'Design Spec Document', checked: false },
      { key: 'dataSheetSection', label: 'Data Sheet Section', checked: true },
      { key: 'uArchReviewVerdict', label: 'µArchitecture Review Verdict', checked: true },
      { key: 'uArchReviewComments', label: 'µArchitecture Review Comments', checked: false },
      { key: 'uArchReviewComments2', label: 'µArchitecture Review Comments', checked: false },
      { key: 'uArchReviewVerdict2', label: 'µArchitecture Review Verdict', checked: true },
    ],
  },
  {
    key: 'verification',
    label: 'Verification',
    items: [
      { key: 'verificationPlan', label: 'Verification Plan', checked: false },
      { key: 'testResult', label: 'Test Result', checked: false },
      { key: 'coverageReport', label: 'Coverage Report', checked: true },
      { key: 'regressionStatus', label: 'Regression Status', checked: false },
      { key: 'bugReport', label: 'Bug Report', checked: true },
    ],
  },
]

export function Step2SelectColumn() {
  const [groups, setGroups] = useState<ColumnGroup[]>(initialColumnGroups)

  const toggleItem = (groupKey: string, itemKey: string) => {
    setGroups(prev =>
      prev.map(g =>
        g.key === groupKey
          ? { ...g, items: g.items.map(item => item.key === itemKey ? { ...item, checked: !item.checked } : item) }
          : g
      )
    )
  }

  const toggleGroup = (groupKey: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.key !== groupKey) return g
        const allChecked = g.items.length > 0 && g.items.every(item => item.checked)
        return { ...g, items: g.items.map(item => ({ ...item, checked: !allChecked })) }
      })
    )
  }

  const isGroupChecked = (group: ColumnGroup) =>
    group.items.length > 0 && group.items.every(item => item.checked)

  const isGroupIndeterminate = (group: ColumnGroup) =>
    group.items.some(item => item.checked) && !group.items.every(item => item.checked)

  return (
    <div className="h-full border border-[#DADFE4] rounded-[4px] overflow-y-auto" style={{ width: 959 }}>
      <div className="p-[11px] flex flex-col gap-[8px]">
        {groups.map(group => (
          <ColumnGroupSection
            key={group.key}
            group={group}
            isChecked={isGroupChecked(group)}
            isIndeterminate={isGroupIndeterminate(group)}
            onToggleGroup={() => toggleGroup(group.key)}
            onToggleItem={(itemKey) => toggleItem(group.key, itemKey)}
          />
        ))}
      </div>
    </div>
  )
}

interface ColumnGroupSectionProps {
  group: ColumnGroup
  isChecked: boolean
  isIndeterminate: boolean
  onToggleGroup: () => void
  onToggleItem: (itemKey: string) => void
}

function ColumnGroupSection({ group, isChecked, isIndeterminate, onToggleGroup, onToggleItem }: ColumnGroupSectionProps) {
  return (
    <div>
      {/* Group Header */}
      <div className="h-[32px] bg-[#F3F6F8] border border-[#DADFE4] flex items-center px-[9px]">
        <CheckboxWithLabel
          checked={isChecked}
          indeterminate={isIndeterminate}
          label={group.label}
          onChange={onToggleGroup}
          bold
        />
      </div>

      {/* Group Items */}
      {group.items.length > 0 && (
        <div className="border border-t-0 border-[#DADFE4] px-[9px] py-[9px]">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 301px)', gap: '8px' }}>
            {group.items.map(item => (
              <CheckboxWithLabel
                key={item.key}
                checked={item.checked}
                label={item.label}
                onChange={() => onToggleItem(item.key)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface CheckboxWithLabelProps {
  checked: boolean
  indeterminate?: boolean
  label: string
  onChange: () => void
  bold?: boolean
}

function CheckboxWithLabel({ checked, indeterminate, label, onChange, bold }: CheckboxWithLabelProps) {
  return (
    <label className="flex items-center gap-[6px] cursor-pointer min-w-[72px] pr-[4px]">
      <button onClick={onChange} className="shrink-0 w-[14px] h-[14px]">
        {indeterminate ? (
          <CheckboxIndeterminate />
        ) : checked ? (
          <CheckboxChecked />
        ) : (
          <CheckboxUnchecked />
        )}
      </button>
      <span
        className={`text-[12px] leading-[14px] tracking-[0.8px] text-[#565E66] truncate ${bold ? 'font-bold' : 'font-normal'}`}
      >
        {label}
      </span>
    </label>
  )
}

function CheckboxChecked() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="#3392D3" stroke="#3392D3" />
      <path d="M3.5 7L6 9.5L10.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckboxUnchecked() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="white" stroke="#DADFE4" />
    </svg>
  )
}

function CheckboxIndeterminate() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="#3392D3" stroke="#3392D3" />
      <line x1="4" y1="7" x2="10" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

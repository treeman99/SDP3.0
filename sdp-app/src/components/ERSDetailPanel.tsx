import { useState } from 'react'
import { cn } from '../lib/utils'
import type { MatrixRow, SupportStatus } from '../data/matrixData'

// ──────────────────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1 1L9 9M9 1L1 9" stroke="#384047" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function StarOutlineIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1L7.545 4.135L11 4.635L8.5 7.065L9.09 10.5L6 8.835L2.91 10.5L3.5 7.065L1 4.635L4.455 4.135L6 1Z"
        stroke="#56595F" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

function StarFilledIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1L7.545 4.135L11 4.635L8.5 7.065L9.09 10.5L6 8.835L2.91 10.5L3.5 7.065L1 4.635L4.455 4.135L6 1Z"
        fill="#2D6BE4" stroke="#2D6BE4" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  )
}

const STATUS_DOT: Record<string, string> = {
  Accepted: '#0077c8',
  Rejected:  '#d2362c',
  Pending:   '#F5A623',
  BM:        '#7E57C2',
}
const STATUS_TEXT: Record<string, string> = {
  Accepted: '#0064a7',
  Rejected:  '#d2362c',
  Pending:   '#E65100',
  BM:        '#4527A0',
}

function StatusInline({ status }: { status: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: STATUS_DOT[status] ?? '#767D84' }} />
      <span className="text-[11px]" style={{ color: STATUS_TEXT[status] ?? '#767D84' }}>{status}</span>
    </span>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Confirm Dialog
// ──────────────────────────────────────────────────────────────────────────────

interface ConfirmDialogProps {
  title: string
  message: string
  subMessage: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmDialog({ title, message, subMessage, confirmLabel, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(40,48,55,0.45)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div
        className="flex flex-col bg-white"
        style={{
          width: 360,
          borderRadius: 4,
          boxShadow: '0px 0px 2px 0px rgba(40,48,55,0.16), 0px 8px 16px 2px rgba(40,48,55,0.16)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <span className="text-[14px] font-bold text-[#283037] leading-[20px] tracking-[0.8px]">
            {title}
          </span>
          <button
            onClick={onCancel}
            className="flex items-center justify-center w-4 h-4 rounded hover:bg-[#F3F6F8] transition-colors"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="h-px bg-[#E4E9ED] mx-0" />

        {/* Body */}
        <div className="px-4 py-4 flex flex-col gap-2">
          <p className="text-[13px] text-[#384047] leading-[20px] tracking-[0.4px]">
            {message}
          </p>
          <div className="flex items-start gap-1.5">
            <span className="mt-[7px] w-1 h-1 rounded-full flex-shrink-0 bg-[#767D84]" />
            <p className="text-[12px] text-[#767D84] leading-[18px] tracking-[0.4px]">
              {subMessage}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="h-px bg-[#E4E9ED]" />
        <div className="flex items-center justify-end gap-1.5 px-4 py-3">
          <button
            onClick={onConfirm}
            className="px-3 py-[5px] text-[12px] text-white rounded-[2px] transition-colors leading-[14px] tracking-[0.8px]"
            style={{ backgroundColor: '#2D6BE4' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1A56C6')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2D6BE4')}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-[5px] text-[12px] text-[#384047] border border-[#DADFE4] rounded-[2px] bg-white hover:bg-[#F3F6F8] transition-colors leading-[14px] tracking-[0.8px]"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Sample data
// ──────────────────────────────────────────────────────────────────────────────

const CUSTOMER_COMMENTS = [
  { date: '2025-02-21', text: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
  { date: '2025-02-19', text: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
  { date: '2025-02-15', text: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
]

const SUPPORT_COMMENTS = [
  {
    dept: 'Analog',
    status: 'Accepted' as SupportStatus,
    date: '2025-02-21',
    text: 'Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
  {
    dept: 'Digital',
    status: 'Rejected' as SupportStatus,
    date: '2025-02-21',
    text: 'Sorry Sorry Contrary to popular belief, Lorem Ipsum is not simply random text.',
  },
]

const ERS_DETAIL_TEXT = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.`

// ──────────────────────────────────────────────────────────────────────────────
// Main Component
// ──────────────────────────────────────────────────────────────────────────────

interface ERSDetailPanelProps {
  row: MatrixRow
  onClose: () => void
}

type DialogType = 'interest' | 'notApplicable' | null

export function ERSDetailPanel({ row, onClose }: ERSDetailPanelProps) {
  const [interestRegistered, setInterestRegistered] = useState(false)
  const [notApplicable, setNotApplicable] = useState(false)
  const [openDialog, setOpenDialog] = useState<DialogType>(null)

  function handleInterestConfirm() {
    setInterestRegistered(prev => !prev)
    setOpenDialog(null)
  }

  function handleNotApplicableConfirm() {
    setNotApplicable(prev => !prev)
    setOpenDialog(null)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed z-40 flex flex-col bg-white overflow-hidden"
        style={{
          width: 720,
          height: 820,
          right: 0,
          top: '50%',
          transform: 'translateY(calc(-50% + 30px))',
          borderRadius: 4,
          boxShadow: '0px 0px 2px 0px rgba(40,48,55,0.12), 0px 4px 8px 1px rgba(40,48,55,0.12)',
        }}
      >
        {/* ── Dialog Header ── */}
        <div className="flex-shrink-0" style={{ height: 73 }}>
          <div className="flex items-center justify-between px-5 pt-4 pb-0" style={{ height: 52 }}>
            <span className="text-[16px] font-medium text-[#283037] leading-[22px] tracking-[0.8px] truncate mr-3">
              {row.index} {row.title}
            </span>
            <button
              onClick={onClose}
              className="flex-shrink-0 flex items-center justify-center w-4 h-4 rounded hover:bg-[#F3F6F8] transition-colors"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="h-px bg-[#E4E9ED] mx-0" />
        </div>

        {/* ── Toolbar below header ── */}
        <div className="flex items-center justify-between px-5 flex-shrink-0" style={{ height: 44 }}>
          {/* Left: ERS Detil + Last Updated */}
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-bold text-[#384047] leading-[20px] tracking-[0.8px]">ERS Detil</span>
            <div className="w-px h-[10px] bg-[#CCD1D6]" />
            <span className="text-[12px] text-[#767D84] leading-[20px] tracking-[0.8px]">
              Last Updated: {row.updated || '2025-05-23'}
            </span>
          </div>
          {/* Right: buttons */}
          <div className="flex items-center gap-1.5">
            {/* 관심 ERS 등록 button */}
            <button
              onClick={() => setOpenDialog('interest')}
              className={cn(
                'flex items-center gap-1 px-2 py-[3px] text-[12px] border rounded-[2px] transition-colors leading-[14px] tracking-[0.8px]',
                interestRegistered
                  ? 'text-[#2D6BE4] border-[#2D6BE4] bg-[#EEF3FB] hover:bg-[#E0EBFA]'
                  : 'text-[#384047] border-[#DADFE4] bg-white hover:bg-[#F3F6F8]'
              )}
            >
              {interestRegistered ? <StarFilledIcon /> : <StarOutlineIcon />}
              {interestRegistered ? '관심 ERS 등록 취소' : '관심 ERS 등록'}
            </button>
            {/* 내 부서 해당없음 button */}
            <button
              onClick={() => setOpenDialog('notApplicable')}
              className={cn(
                'flex items-center px-2 py-[3px] text-[12px] border rounded-[2px] transition-colors leading-[14px] tracking-[0.8px]',
                notApplicable
                  ? 'text-[#2D6BE4] border-[#2D6BE4] bg-[#EEF3FB] hover:bg-[#E0EBFA]'
                  : 'text-[#384047] border-[#DADFE4] bg-white hover:bg-[#F3F6F8]'
              )}
            >
              {notApplicable ? '내 부서 해당없음 취소' : '내 부서 해당없음'}
            </button>
          </div>
        </div>

        {/* ── ERS Detail text area ── */}
        <div
          className="mx-5 flex-shrink-0 overflow-y-auto"
          style={{
            height: 322,
            backgroundColor: '#FBFBFB',
            border: '1px solid #F5F5F6',
          }}
        >
          <div className="px-3 py-3">
            {ERS_DETAIL_TEXT.split('\n\n').map((para, i) => (
              <p
                key={i}
                className={cn(
                  'text-[14px] text-[#565E66] leading-[20px] tracking-[0.8px]',
                  i < ERS_DETAIL_TEXT.split('\n\n').length - 1 && 'mb-3'
                )}
              >
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Section divider ── */}
        <div className="px-5 py-3 bg-white flex-shrink-0">
          <div className="h-px bg-[#E4E9ED]" />
        </div>

        {/* ── Comments section ── */}
        <div className="flex flex-1 min-h-0 gap-0 px-0">
          {/* Customer Comment */}
          <div className="flex flex-col flex-1 min-w-0 px-5 overflow-hidden">
            <span className="text-[14px] font-bold text-[#384047] leading-[20px] tracking-[0.8px] flex-shrink-0 mb-2">
              Customer Comment
            </span>
            <div
              className="flex-1 overflow-y-auto"
              style={{ backgroundColor: '#FBFBFB', border: '1px solid #F5F5F6' }}
            >
              <div className="p-3 flex flex-col gap-4">
                {CUSTOMER_COMMENTS.map((comment, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[12px] text-[#767D84] leading-[20px] tracking-[0.8px]">
                      {comment.date}
                    </span>
                    <p className="text-[14px] text-[#565E66] leading-[20px] tracking-[0.8px]">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Support Comment */}
          <div className="flex flex-col flex-1 min-w-0 px-5 overflow-hidden">
            <span className="text-[14px] font-bold text-[#384047] leading-[20px] tracking-[0.8px] flex-shrink-0 mb-2">
              Support Comment
            </span>
            <div
              className="flex-1 overflow-y-auto"
              style={{ backgroundColor: '#FBFBFB', border: '1px solid #F5F5F6' }}
            >
              <div className="p-3 flex flex-col gap-4">
                {SUPPORT_COMMENTS.map((comment, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    {/* dept + status + date */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[14px] font-bold text-[#565E66] leading-[20px] tracking-[0.8px]">
                        {comment.dept}
                      </span>
                      <div className="w-px h-[10px] bg-[#CCD1D6]" />
                      <StatusInline status={comment.status} />
                      <div className="w-px h-[10px] bg-[#CCD1D6]" />
                      <span className="text-[12px] text-[#767D84] leading-[20px] tracking-[0.8px]">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-[14px] text-[#565E66] leading-[20px] tracking-[0.8px]">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex-shrink-0 h-5 bg-white rounded-b" />

        {/* ── Confirm Dialogs ── */}
        {openDialog === 'interest' && (
          <ConfirmDialog
            title={interestRegistered ? '관심 ERS 등록 취소' : '관심 ERS 등록'}
            message={
              interestRegistered
                ? '해당 ERS를 관심 ERS로 등록 취소하시겠습니까?'
                : '해당 ERS를 관심 ERS로 등록하시겠습니까?'
            }
            subMessage={
              interestRegistered
                ? '등록 취소한 ERS는 My Task > 관심 ERS에서 제거됩니다.'
                : '등록한 ERS는 My Task > 관심 ERS에서 확인하실 수 있습니다.'
            }
            confirmLabel={interestRegistered ? '등록 취소' : '관심 ERS 등록'}
            onConfirm={handleInterestConfirm}
            onCancel={() => setOpenDialog(null)}
          />
        )}
        {openDialog === 'notApplicable' && (
          <ConfirmDialog
            title={notApplicable ? '내 부서 해당없음 취소' : '내 부서 해당없음'}
            message={
              notApplicable
                ? '해당 ERS에 내 부서 해당없음 표시를 취소하시겠습니까?'
                : '해당 ERS에 내 부서 해당없음 표시를 하시겠습니까?'
            }
            subMessage={
              notApplicable
                ? '취소 후 Matrix Check 내 상태가 이전으로 복원됩니다.'
                : '내 부서 해당없음 표시를 하시게 되면 Matrix Check 내 None 상태로 변경됩니다.'
            }
            confirmLabel={notApplicable ? '해당없음 취소' : '내 부서 해당없음'}
            onConfirm={handleNotApplicableConfirm}
            onCancel={() => setOpenDialog(null)}
          />
        )}
      </div>
    </>
  )
}

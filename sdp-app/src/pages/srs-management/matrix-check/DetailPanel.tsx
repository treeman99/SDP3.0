import { useState } from 'react'
import { X } from 'lucide-react'
import { StatusBadge } from '@/components/common/StatusBadge'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'
import type { DetailData } from '../Types'

export function DetailPanel({ data, onClose }: { data: DetailData; onClose: () => void }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isExcluded, setIsExcluded] = useState(false)
  const [favoriteDialogOpen, setFavoriteDialogOpen] = useState(false)
  const [excludeDialogOpen, setExcludeDialogOpen] = useState(false)

  return (
    <>
      <ConfirmDialog
        open={favoriteDialogOpen}
        onClose={() => setFavoriteDialogOpen(false)}
        onConfirm={() => setIsFavorite(!isFavorite)}
        title={isFavorite ? '관심 ERS 등록 취소' : '관심 ERS 등록'}
        message={
          isFavorite
            ? '해당 ERS를 관심 ERS에서 해제하시겠습니까?'
            : '해당 ERS를 관심 ERS로 등록하시겠습니까?'
        }
        note={
          isFavorite
            ? undefined
            : '등록한 ERS는 My Task > 관심 ERS에서 확인하실 수 있습니다.'
        }
        confirmLabel={isFavorite ? '관심 ERS 등록 취소' : '관심 ERS 등록'}
      />
      <ConfirmDialog
        open={excludeDialogOpen}
        onClose={() => setExcludeDialogOpen(false)}
        onConfirm={() => setIsExcluded(!isExcluded)}
        title={isExcluded ? '내 부서 해당없음 취소' : '내 부서 해당 없음'}
        message={
          isExcluded
            ? '해당 ERS의 내 부서 해당없음 표시를 취소하시겠습니까?'
            : '해당 ERS에 내 부서 해당없음 표시를 하시겠습니까?'
        }
        note={
          isExcluded
            ? undefined
            : '내 부서 해당없음 표시를 하시면 되면 Matrix Check 내 None 상태로 변경됩니다.'
        }
        confirmLabel={isExcluded ? '내 부서 해당없음 취소' : '내 부서 해당없음'}
      />

      <div className="w-[720px] shrink-0 bg-white flex flex-col overflow-hidden rounded-[4px] shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_4px_8px_1px_rgba(40,48,55,0.12)]">
        {/* Header */}
        <div className="shrink-0">
          <div className="flex items-center gap-[12px] pl-[20px] pr-[18px] pt-[16px] pb-[14px]">
            <h3 className="text-[16px] font-normal leading-[22px] tracking-[0.8px] text-[#283037] truncate flex-1 min-w-0">
              {data.index} {data.title}
            </h3>
            <button onClick={onClose} className="rounded-[2px] hover:bg-[#EDF2F4] shrink-0">
              <X className="w-[16px] h-[16px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {/* ERS Detail Section */}
          <div className="px-[20px] pt-[12px]">
            <div className="flex items-center justify-between mb-[8px]">
              <div className="flex items-center gap-[4px]">
                <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                  ERS Detil
                </span>
                <div className="flex items-center justify-center w-[13px]">
                  <div className="w-px h-[10px] bg-[#CCD1D6]" />
                </div>
                <span className="text-[12px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                  Last Updated: {data.lastUpdated}
                </span>
              </div>
              <div className="flex items-center gap-[4px]">
                <button
                  onClick={() => setFavoriteDialogOpen(true)}
                  className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
                >
                  {isFavorite ? '관심 ERS 등록 취소' : '관심 ERS 등록'}
                </button>
                <button
                  onClick={() => setExcludeDialogOpen(true)}
                  className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
                >
                  {isExcluded ? '내 부서 해당없음 취소' : '내 부서 해당없음'}
                </button>
              </div>
            </div>
            <div className="bg-[#FBFBFB] border border-[#F5F5F6] rounded-[2px] p-[12px] max-h-[300px] overflow-y-auto">
              <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-pre-line">
                {data.ersContent}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="px-[20px] py-[12px]">
            <div className="h-px bg-[#E4E9ED]" />
          </div>

          {/* Comments Section */}
          <div className="flex gap-[20px] px-[20px] pb-[20px]">
            {/* Customer Comment */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] mb-[8px]">
                Customer Comment
              </h4>
              <div className="bg-[#FBFBFB] border border-[#F5F5F6] rounded-[2px] p-[12px] max-h-[322px] overflow-y-auto space-y-[16px]">
                {data.customerComments.map((comment, i) => (
                  <div key={i} className="flex flex-col gap-[6px]">
                    <span className="text-[12px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                      {comment.date}
                    </span>
                    <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66]">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Comment */}
            <div className="flex-1 min-w-0">
              <h4 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] mb-[8px]">
                Support Comment
              </h4>
              <div className="bg-[#FBFBFB] border border-[#F5F5F6] rounded-[2px] p-[12px] max-h-[322px] overflow-y-auto space-y-[16px]">
                {data.supportComments.map((comment, i) => (
                  <div key={i} className="flex flex-col gap-[6px]">
                    <div className="flex items-center gap-[4px]">
                      <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66]">
                        {comment.category}
                      </span>
                      <div className="flex items-center justify-center w-[13px]">
                        <div className="w-px h-[10px] bg-[#CCD1D6]" />
                      </div>
                      <StatusBadge status={comment.status} />
                      <div className="flex items-center justify-center w-[13px]">
                        <div className="w-px h-[10px] bg-[#CCD1D6]" />
                      </div>
                      <span className="text-[12px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66]">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Footer spacer */}
        <div className="h-[20px] shrink-0 bg-white rounded-b-[6px]" />
      </div>
    </>
  )
}

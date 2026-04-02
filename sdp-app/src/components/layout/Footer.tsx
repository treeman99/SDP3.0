export function Footer() {
  return (
    <footer className="w-full bg-[#EDF2F4]">
      <div className="h-px w-full bg-[#DADFE4]" />
      <div className="flex items-center justify-end gap-[16px] px-[20px] pt-px pb-[2px]">
        <div className="flex items-center gap-[12px] text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">
          <span className="opacity-60">개인정보 처리방침</span>
          <span className="opacity-60">이용약관</span>
        </div>
        <div className="flex items-center">
          <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#90969D]">
            © 2025 Samsung
          </span>
        </div>
      </div>
    </footer>
  )
}

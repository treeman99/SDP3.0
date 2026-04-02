import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full bg-[#EDF2F4]">
      <div className="h-px w-full bg-[#DADFE4]" />
      <div className="flex items-center justify-end gap-[16px] px-[20px] pt-px pb-[2px]">
        <div className="flex items-center gap-[12px] text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">
          <span className="opacity-60">{t('footer.privacy')}</span>
          <span className="opacity-60">{t('footer.terms')}</span>
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

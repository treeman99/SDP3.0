import { createContext, useContext, useState, type ReactNode } from 'react'

export type Language = 'ko' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Header GNB
    'gnb.myTask': 'My Task',
    'gnb.management': 'Management',
    'gnb.testDesign': 'Test Design',

    // Header Utility
    'header.notification': 'Notification',
    'header.userGuide': 'User Guide',
    'header.voc': 'VOC',
    'header.confluence': 'Confluence',
    'header.jira': 'Jira',
    'header.admin': 'Admin',

    // Management dropdown
    'menu.srsManagement': 'SRS Management',
    'menu.ersManagement': 'ERS Management',
    'menu.functionManagement': 'Function Management',
    'menu.complianceMatrix': 'Compliance Matrix',

    // Settings dropdown
    'settings.userInfo': '사용자 정보',
    'settings.language': '언어',
    'settings.korean': '한국어',
    'settings.english': '영어(English)',

    // Notification
    'notification.viewPrevious': '이전 알림 보기',

    // ComplianceMatrix page
    'page.complianceMatrix': 'Compliance Matrix',
    'toolbar.import': 'Import',
    'toolbar.export': 'Export',
    'toolbar.history': 'History',
    'toolbar.tableOption': 'Table Option',
    'toolbar.pageSize': '30개씩 보기',
    'toolbar.total': 'Total',

    // Import dialog
    'import.title': 'Import',
    'import.step1.title': 'STEP1. Select Target File',
    'import.step1.desc': 'Import the latest version of ERS file for Compliance Matrix.',
    'import.step2.title': 'STEP2. Select Target Column',
    'import.step2.desc': 'Please select your desired column.',
    'import.step3.title': 'STEP3. Confirm Change',
    'import.step3.desc': 'Please review the changes made from the previous content.',
    'import.importErsFile': 'Import ERS File',
    'import.noAttachedFiles': 'No attached files.',
    'import.prev': 'Prev',
    'import.next': 'Next',
    'import.submit': 'Submit',
    'import.add': 'Add',
    'import.delete': 'Delete',

    // Footer
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '이용약관',
  },
  en: {
    // Header GNB
    'gnb.myTask': 'My Task',
    'gnb.management': 'Management',
    'gnb.testDesign': 'Test Design',

    // Header Utility
    'header.notification': 'Notification',
    'header.userGuide': 'User Guide',
    'header.voc': 'VOC',
    'header.confluence': 'Confluence',
    'header.jira': 'Jira',
    'header.admin': 'Admin',

    // Management dropdown
    'menu.srsManagement': 'SRS Management',
    'menu.ersManagement': 'ERS Management',
    'menu.functionManagement': 'Function Management',
    'menu.complianceMatrix': 'Compliance Matrix',

    // Settings dropdown
    'settings.userInfo': 'User Info',
    'settings.language': 'Language',
    'settings.korean': '한국어',
    'settings.english': 'English',

    // Notification
    'notification.viewPrevious': 'View Previous Notifications',

    // ComplianceMatrix page
    'page.complianceMatrix': 'Compliance Matrix',
    'toolbar.import': 'Import',
    'toolbar.export': 'Export',
    'toolbar.history': 'History',
    'toolbar.tableOption': 'Table Option',
    'toolbar.pageSize': '30 per page',
    'toolbar.total': 'Total',

    // Import dialog
    'import.title': 'Import',
    'import.step1.title': 'STEP1. Select Target File',
    'import.step1.desc': 'Import the latest version of ERS file for Compliance Matrix.',
    'import.step2.title': 'STEP2. Select Target Column',
    'import.step2.desc': 'Please select your desired column.',
    'import.step3.title': 'STEP3. Confirm Change',
    'import.step3.desc': 'Please review the changes made from the previous content.',
    'import.importErsFile': 'Import ERS File',
    'import.noAttachedFiles': 'No attached files.',
    'import.prev': 'Prev',
    'import.next': 'Next',
    'import.submit': 'Submit',
    'import.add': 'Add',
    'import.delete': 'Delete',

    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
  },
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko')

  const t = (key: string): string => {
    return translations[language][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

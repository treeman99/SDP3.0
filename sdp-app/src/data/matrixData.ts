export type SupportStatus = 'Accepted' | 'Pending' | 'Rejected' | 'BM' | 'Comp' | '-'

export interface MatrixRow {
  index: string
  title: string
  progress: string
  updated: string
  support: SupportStatus
  apsElectric: string
  apsOptic: string
  analog: string
  digitalChip: string
  fw: string
  alpdp: string
  pm: string
  isGroupHeader?: boolean
  badge?: 'New' | 'Updated'
}

export const matrixData: MatrixRow[] = [
  { index: '1',       title: 'Project Overview',                    progress: '-',  updated: '-',          support: 'Comp',     apsElectric: '-',            apsOptic: '-',            analog: '-',            digitalChip: '-',            fw: '-',            alpdp: '-',            pm: '-',            isGroupHeader: true },
  { index: '1.1',     title: 'Purpose Overview',                    progress: '40', updated: '',           support: 'Pending',  apsElectric: '이삼성, 김삼성', apsOptic: '이삼성, 김삼성', analog: '이삼성, 김삼성', digitalChip: '이삼성, 김삼성', fw: '이삼성, 김삼성', alpdp: '이삼성, 김삼성', pm: '이삼성, 김삼성' },
  { index: '1.1.1',   title: 'Scope 51',                            progress: '40', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성외 1명',  apsOptic: '이삼성외 1명',  analog: '이삼성외 1명',  digitalChip: '이삼성, 김삼성', fw: '이삼성, 김삼성', alpdp: '이삼성외 1명',  pm: '-' },
  { index: '1.1.1',   title: 'Expectation ABCD',                    progress: '40', updated: '2025-05-23', support: 'Pending',  apsElectric: '이삼성',       apsOptic: '이삼성',       analog: '이삼성, 김삼성', digitalChip: '이삼성, 김삼성', fw: '이삼성, 김삼성', alpdp: '이삼성, 김삼성', pm: '이삼성, 김삼성' },
  { index: '1.1.2',   title: 'Expectation ABCD',                    progress: '40', updated: '2025-06-08', support: 'Accepted', apsElectric: '이삼성',       apsOptic: '이삼성외 1명',  analog: '이삼성',       digitalChip: '이삼성',       fw: '-',            alpdp: '이삼성',       pm: '이삼성외 1명',  badge: 'New' },
  { index: '1.1.2.1', title: 'Expectation BCDEF',                   progress: '40', updated: '2025-06-08', support: 'Accepted', apsElectric: '-',            apsOptic: '-',            analog: '이삼성',       digitalChip: '이삼성외 1명',  fw: '-',            alpdp: '-',            pm: '이삼성',       badge: 'Updated' },
  { index: '1.1.2.2', title: 'Expectation BCDF',                    progress: '40', updated: '2025-05-23', support: 'Accepted', apsElectric: '-',            apsOptic: '이삼성외 1명',  analog: '-',            digitalChip: '-',            fw: '-',            alpdp: '-',            pm: '이삼성' },
  { index: '1.1.3',   title: 'Expectation ABCEFG',                  progress: '40', updated: '2025-05-23', support: 'Rejected', apsElectric: '-',            apsOptic: '이삼성외 1명',  analog: '-',            digitalChip: '이삼성',       fw: '-',            alpdp: '-',            pm: '이삼성외 1명' },
  { index: '1.2',     title: 'Function Overview',                   progress: '40', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성외 1명',  apsOptic: '이삼성외 1명',  analog: '-',            digitalChip: '-',            fw: '-',            alpdp: '-',            pm: '이삼성' },
  { index: '1.2.1',   title: 'Production W123',                     progress: '0',  updated: '2025-05-23', support: 'BM',       apsElectric: '이삼성',       apsOptic: '이삼성',       analog: '이삼성',       digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성' },
  { index: '1.2.2',   title: 'Expectation ABCD',                    progress: '40', updated: '2025-05-23', support: 'BM',       apsElectric: '-',            apsOptic: '-',            analog: '-',            digitalChip: '-',            fw: '-',            alpdp: '-',            pm: '-' },
  { index: '2',       title: 'Purpose',                             progress: '40', updated: '2025-05-23', support: 'Rejected', apsElectric: '-',            apsOptic: '이삼성외 1명',  analog: '이삼성',       digitalChip: '이삼성',       fw: '이삼성외 1명', alpdp: '이삼성',       pm: '이삼성',       isGroupHeader: true },
  { index: '2.1',     title: 'Scope 51',                            progress: '40', updated: '2025-05-23', support: 'Accepted', apsElectric: '-',            apsOptic: '이삼성',       analog: '이삼성외 1명',  digitalChip: '이삼성외 1명',  fw: '이삼성외 1명', alpdp: '이삼성',       pm: '이삼성' },
  { index: '2.2',     title: 'Expectation ABCD',                    progress: '40', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성외 1명',  apsOptic: '-',            analog: '이삼성외 1명',  digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성외 1명' },
  { index: '2.2.1',   title: 'Expectation BCDEF',                   progress: '40', updated: '2025-06-08', support: 'Accepted', apsElectric: '이삼성외 1명',  apsOptic: '-',            analog: '이삼성',       digitalChip: '이삼성',       fw: '이삼성외 1명', alpdp: '이삼성',       pm: '이삼성',       badge: 'Updated' },
  { index: '2.2.1.1', title: 'Expectation BCDF',                    progress: '40', updated: '2025-05-23', support: 'Pending',  apsElectric: '이삼성',       apsOptic: '이삼성',       analog: '이삼성',       digitalChip: '-',            fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성' },
  { index: '2.2.2',   title: 'Production W123',                     progress: '40', updated: '2025-05-23', support: 'Accepted', apsElectric: '-',            apsOptic: '이삼성외 1명',  analog: '-',            digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성외 1명', pm: '이삼성' },
  { index: '2.3',     title: 'Expectation ABCEFG Expecticn',        progress: '40', updated: '2025-06-08', support: 'Accepted', apsElectric: '-',            apsOptic: '이삼성',       analog: '-',            digitalChip: '이삼성외 1명',  fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성',       badge: 'Updated' },
  { index: '2.4',     title: 'Function Overview',                   progress: '40', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성외 1명',  apsOptic: '이삼성',       analog: '이삼성외 1명',  digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성외 1명' },
  { index: '2.5',     title: 'Production W123',                     progress: '30', updated: '2025-05-23', support: 'BM',       apsElectric: '-',            apsOptic: '-',            analog: '-',            digitalChip: '-',            fw: '-',            alpdp: '-',            pm: '-' },
  { index: '3',       title: 'Purpose',                             progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성',       apsOptic: '이삼성',       analog: '-',            digitalChip: '이삼성',       fw: '이삼성외 1명', alpdp: '이삼성',       pm: '이삼성',       isGroupHeader: true },
  { index: '3.1',     title: 'Expectation ABCEF, Production W123',  progress: '',   updated: '2025-06-08', support: 'Rejected', apsElectric: '-',            apsOptic: '이삼성',       analog: '이삼성외 1명',  digitalChip: '이삼성외 1명',  fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성',       badge: 'New' },
  { index: '3.1.1',   title: 'Expectation BCDEF',                   progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '-',            apsOptic: '이삼성외 1명',  analog: '이삼성',       digitalChip: '이삼성',       fw: '-',            alpdp: '이삼성+',      pm: '-' },
  { index: '3.2',     title: 'Production W123',                     progress: '30', updated: '2025-05-23', support: 'BM',       apsElectric: '이삼성',       apsOptic: '이삼성',       analog: '이삼성',       digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성' },
  { index: '3.2.1',   title: 'Production W1244',                    progress: '0',  updated: '2025-05-23', support: 'Pending',  apsElectric: '이삼성',       apsOptic: '이삼성',       analog: '이삼성',       digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성' },
  { index: '3.2.2',   title: 'Production W1245',                    progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성외 1명',  apsOptic: '-',            analog: '-',            digitalChip: '이삼성외 1명',  fw: '-',            alpdp: '이삼성외 1명', pm: '이삼성외 1명' },
  { index: '3.3',     title: 'Title Inputplace',                    progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '-',            apsOptic: '이삼성외 1명',  analog: '-',            digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성' },
  { index: '3.4',     title: 'Title Inputplace',                    progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성외 1명',  apsOptic: '-',            analog: '-',            digitalChip: '이삼성',       fw: '이삼성외 1명', alpdp: '-',            pm: '이삼성' },
  { index: '3.4.1',   title: 'Title Inputplace',                    progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성',       apsOptic: '-',            analog: '이삼성',       digitalChip: '이삼성외 1명',  fw: '이삼성',       alpdp: '-',            pm: '이삼성' },
  { index: '3.4.1.1', title: 'Title Inputplace',                    progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '-',            apsOptic: '이삼성외 1명',  analog: '이삼성외 1명',  digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성외 1명' },
  { index: '3.4.2',   title: 'Title Inputplace',                    progress: '30', updated: '2025-05-23', support: 'Accepted', apsElectric: '이삼성',       apsOptic: '이삼성',       analog: '이삼성',       digitalChip: '이삼성',       fw: '이삼성',       alpdp: '이삼성',       pm: '이삼성' },
  { index: '1.3.2',   title: 'Title Inputplace',                    progress: '30', updated: '2025-05-23', support: '-',        apsElectric: '-',            apsOptic: '-',            analog: '-',            digitalChip: '-',            fw: '-',            alpdp: '-',            pm: '-' },
]

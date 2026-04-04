import type { MatrixRow, SrsBadgeEntry, DetailData } from '../Types'

const B = (label: string, color = '#007492'): SrsBadgeEntry => ({ label, color })

export const matrixData: MatrixRow[] = [
  { index: '1', ersTitle: 'Project Overview', progress: null, updated: '', support: null, srs: {}, isParent: true },
  { index: '1.1', ersTitle: 'Purpose Overview', progress: 40, updated: '2025-05-23', support: 'Pending', srs: {} },
  { index: '1.1.1', ersTitle: 'Scope 51', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명'), analog: B('이삼성외 1명') } },
  { index: '1.1.2', ersTitle: 'Expectation ABCD', tag: 'NEW', progress: 40, updated: '2025-06-08', support: 'Pending', srs: {} },
  { index: '1.1.2.1', ersTitle: 'Expectation BCDEF', tag: 'UPDATED', progress: 40, updated: '2025-06-08', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), alpdp: B('이삼성외 1명', '#AB772A') } },
  { index: '1.1.2.2', ersTitle: 'Expectation BCDF', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { analog: B('이삼성외 1명', '#AB772A') } },
  { index: '1.1.3', ersTitle: 'Expectation ABCEFG', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명') } },
  { index: '1.2', ersTitle: 'Function Overview', progress: 40, updated: '2025-05-23', support: 'Rejected', srs: { apsOptic: B('이삼성외 1명') } },
  { index: '1.2.1', ersTitle: 'Production W123', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명') } },
  { index: '1.2.2', ersTitle: 'Expectation ABCD', tag: 'NEW', progress: 0, updated: '2025-05-23', support: null, srs: {} },
  { index: '2', ersTitle: 'Purpose', progress: null, updated: '', support: null, srs: {}, isParent: true },
  { index: '2.1', ersTitle: 'Scope 51', progress: 40, updated: '2025-05-23', support: 'Rejected', srs: { apsOptic: B('이삼성외 1명'), analog: B('이삼성외 1명', '#AB772A'), alpdp: B('이삼성외 1명') } },
  { index: '2.2', ersTitle: 'Expectation ABCD', tag: 'NEW', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), analog: B('이삼성외 1명', '#AB772A') } },
  { index: '2.2.1', ersTitle: 'Expectation BCDEF', tag: 'UPDATED', progress: 40, updated: '2025-06-08', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명'), digitalChip: B('이삼성외 1명') } },
  { index: '2.2.1.1', ersTitle: 'Expectation BCDF', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), digitalChip: B('이삼성외 1명') } },
  { index: '2.2.2', ersTitle: 'Production W123', progress: 40, updated: '2025-05-23', support: 'Pending', srs: {} },
  { index: '2.3', ersTitle: 'Expectation ABCEFG Expect...', tag: 'UPDATED', progress: 40, updated: '2025-06-08', support: 'Accepted', srs: { alpdp: B('이삼성외 1명') } },
  { index: '2.4', ersTitle: 'Function Overview', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { analog: B('이삼성외 1명', '#AB772A'), fw: B('이삼성외 1명') } },
  { index: '2.5', ersTitle: 'Production W123', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), analog: B('이삼성외 1명') } },
  { index: '3', ersTitle: 'Purpose', progress: null, updated: '', support: null, srs: {}, isParent: true },
  { index: '3.1', ersTitle: 'Expectation ABCEF, Production...', tag: 'NEW', progress: 30, updated: '2025-06-08', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), fw: B('이삼성외 1명') } },
  { index: '3.1.1', ersTitle: 'Expectation BCDEF', progress: 30, updated: '2025-05-23', support: 'Rejected', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명', '#AB772A') } },
  { index: '3.2', ersTitle: 'Production W123', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명') } },
  { index: '3.2.1', ersTitle: 'Production W1244', progress: 0, updated: '2025-05-23', support: null, srs: {} },
  { index: '3.2.2', ersTitle: 'Production W1245', progress: 30, updated: '2025-05-23', support: 'Pending', srs: {} },
  { index: '3.3', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), analog: B('이삼성외 1명'), alpdp: B('이삼성외 1명') } },
  { index: '3.4', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명') } },
  { index: '3.4.1', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), analog: B('이삼성외 1명') } },
  { index: '3.4.2', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { analog: B('이삼성외 1명') } },
]

export const sampleDetail: DetailData = {
  index: '1.1.3',
  title: 'Expectation ABCEFG',
  lastUpdated: '2025-05-23',
  ersContent:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of cl...',
  customerComments: [
    { date: '2025-02-21', content: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
    { date: '2025-02-19', content: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
    { date: '2025-02-15', content: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
  ],
  supportComments: [
    { category: 'Analog', status: 'Accepted', date: '2025-02-21', content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.' },
    { category: 'Digital', status: 'Rejected', date: '2025-02-21', content: 'Sorry Sorry Contrary to popular belief, Lorem Ipsum is not simply random text.' },
  ],
}

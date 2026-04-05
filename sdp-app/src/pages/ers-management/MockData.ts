export interface ErsItem {
  index: string
  title: string
  qa: string
  hasNew?: boolean
  depth: number
  selected?: boolean
}

export const ersTreeData: ErsItem[] = [
  { index: '1', title: 'Overview', qa: '0/0', depth: 0 },
  { index: '1.1', title: 'Project Overview', qa: '0/0', depth: 1 },
  { index: '1.1.1', title: 'Purpose Overview', qa: '2/2', depth: 2 },
  { index: '1.1.2', title: 'Scope 51', qa: '0/0', depth: 2 },
  { index: '1.2', title: 'Expectation ABCD', qa: '0/0', depth: 1 },
  { index: '1.2.2.1', title: 'Expectation BCDF', qa: '2/3', hasNew: true, depth: 2, selected: true },
  { index: '1.2.2.2', title: 'Expectation BCDEF', qa: '0/0', depth: 2 },
  { index: '1.3', title: 'Expectation ABCEFG', qa: '0/0', depth: 1 },
  { index: '1.4', title: 'Function Overview', qa: '0/0', depth: 1 },
  { index: '1.1.2', title: 'Production W123', qa: '0/0', depth: 2 },
  { index: '1.1.2', title: 'Expectation ABCD', qa: '2/2', depth: 2 },
  { index: '2', title: 'Project Overview', qa: '0/0', depth: 0 },
  { index: '2.1', title: 'Scope 51', qa: '1/1', hasNew: true, depth: 1 },
  { index: '2.1.1', title: 'Purpose Overview', qa: '0/0', depth: 2 },
  { index: '2.1.2', title: 'Expectation ABCD', qa: '0/0', depth: 2 },
  { index: '2.1.3', title: 'Expectation BCDEF', qa: '0/1', depth: 2 },
  { index: '2.2.2', title: 'Expectation BCDF', qa: '0/0', depth: 2 },
  { index: '2.3.2', title: 'Expectation ABCEFG', qa: '0/0', depth: 2 },
  { index: '2.3.2.1', title: 'Function Overview', qa: '0/0', depth: 3 },
  { index: '2.4.2.1', title: 'Production W123', qa: '0/0', depth: 3 },
  { index: '2.5.3', title: 'Expectation ABCD', qa: '3/3', depth: 2 },
  { index: '2.6', title: 'Project Overview', qa: '0/0', depth: 1 },
  { index: '2.6.1', title: 'Purpose Overview', qa: '0/0', depth: 2 },
  { index: '3', title: 'Scope 51', qa: '1/1', depth: 0 },
  { index: '3.1', title: 'Expectation ABCD', qa: '1/1', depth: 1 },
  { index: '3.1.3', title: 'Expectation BCDEF', qa: '0/0', depth: 2 },
  { index: '3.1.3', title: 'Expectation BCDF', qa: '0/0', depth: 2 },
  { index: '3.1.3', title: 'Expectation ABCEFG', qa: '0/0', depth: 2 },
  { index: '3.1.3', title: 'Function Overview', qa: '0/0', depth: 2 },
  { index: '2.4.2.1', title: 'Production W123', qa: '0/0', depth: 3 },
  { index: '2.4.2.1', title: 'Expectation ABCD', qa: '0/0', depth: 3 },
]

// ERS Compare data
export interface ErsCompareItem {
  index: string
  newErs: string
  oldErs: string
  compare: 'Same' | 'Different'
  status: 'Link' | 'Pass' | 'Unknown'
  depth: number
  selected?: boolean
  tag?: 'NEW' | 'UPDATED' | 'ADD DELETE'
}

export const ersCompareData: ErsCompareItem[] = [
  { index: '1', newErs: 'Overview', oldErs: 'Overview', compare: 'Same', status: 'Link', depth: 0 },
  { index: '1.1', newErs: 'Project Overview', oldErs: 'Project Overview', compare: 'Same', status: 'Link', depth: 1 },
  { index: '1.1.1', newErs: 'Purpose Overview', oldErs: 'Purpose Overview', compare: 'Same', status: 'Link', depth: 2 },
  { index: '1.1.2', newErs: 'Scope 51', oldErs: 'Scope 50', compare: 'Different', status: 'Pass', depth: 2, tag: 'UPDATED' },
  { index: '1.2', newErs: 'Expectation ABCD', oldErs: 'Expectation ABCD', compare: 'Same', status: 'Link', depth: 1 },
  { index: '1.2.2.1', newErs: 'Expectation BCDF', oldErs: 'Expectation BCDF', compare: 'Different', status: 'Unknown', depth: 2, tag: 'NEW', selected: true },
  { index: '1.2.2.2', newErs: 'Expectation BCDEF', oldErs: 'Expectation AKKA', compare: 'Different', status: 'Pass', depth: 2, tag: 'UPDATED' },
  { index: '1.3', newErs: 'Expectation ABCEFG', oldErs: 'Expectation ABCEFG', compare: 'Same', status: 'Link', depth: 1 },
  { index: '1.4', newErs: 'Production W123', oldErs: 'Production W123', compare: 'Same', status: 'Link', depth: 1 },
  { index: '1.1.2', newErs: 'Expectation ABCD', oldErs: 'Expectation ABCD', compare: 'Same', status: 'Link', depth: 2 },
  { index: '1.1.2', newErs: 'Project Overview', oldErs: 'Project Overview', compare: 'Same', status: 'Link', depth: 2 },
  { index: '2', newErs: 'Scope 51', oldErs: 'Scope 51', compare: 'Same', status: 'Link', depth: 0 },
  { index: '2.1', newErs: 'Expectation ABCD', oldErs: 'Expectation ABCD', compare: 'Same', status: 'Link', depth: 1 },
  { index: '2.1.1', newErs: 'Purpose Overview', oldErs: 'Purpose Overview', compare: 'Same', status: 'Link', depth: 2 },
  { index: '2.1.2', newErs: 'Expectation ABCD', oldErs: 'Expectation BCDEF', compare: 'Same', status: 'Link', depth: 2 },
  { index: '2.1.3', newErs: 'Expectation BCDF', oldErs: '–', compare: 'Different', status: 'Unknown', depth: 2, tag: 'NEW' },
  { index: '2.2.2', newErs: 'Expectation ABCEFG', oldErs: 'Expectation ABCEFG', compare: 'Same', status: 'Link', depth: 2 },
  { index: '2.3.2', newErs: 'Function Overview', oldErs: 'Function Overview', compare: 'Same', status: 'Link', depth: 2 },
  { index: '2.3.2.1', newErs: 'Production W123', oldErs: 'Production W123', compare: 'Same', status: 'Link', depth: 3 },
  { index: '2.4.2.1', newErs: 'Expectation ABCD', oldErs: 'Expectation ABCD', compare: 'Different', status: 'Unknown', depth: 3, tag: 'ADD DELETE' },
  { index: '2.5.3', newErs: 'Project Overview', oldErs: 'Project Overview', compare: 'Same', status: 'Link', depth: 2 },
  { index: '2.6', newErs: 'Purpose Overview', oldErs: 'Purpose Overview', compare: 'Same', status: 'Link', depth: 1 },
  { index: '2.6.1', newErs: 'Scope 51', oldErs: 'Scope 51', compare: 'Same', status: 'Link', depth: 2 },
  { index: '3', newErs: 'Scope 51', oldErs: 'Scope 51', compare: 'Same', status: 'Link', depth: 0 },
  { index: '3.1', newErs: 'Expectation ABCD', oldErs: 'Expectation ABCD', compare: 'Same', status: 'Link', depth: 1 },
  { index: '3.1.3', newErs: 'Expectation BCDEF', oldErs: 'Expectation BCDEF', compare: 'Same', status: 'Link', depth: 2 },
  { index: '3.1.3', newErs: 'Expectation BCDF', oldErs: 'Expectation BCDF', compare: 'Same', status: 'Link', depth: 2 },
  { index: '3.1.3', newErs: 'Expectation ABCEFG', oldErs: 'Expectation ABCEFG', compare: 'Same', status: 'Link', depth: 2 },
  { index: '3.1.3', newErs: 'Function Overview', oldErs: 'Function Overview', compare: 'Same', status: 'Link', depth: 2 },
  { index: '2.4.2.1', newErs: 'Production W123', oldErs: 'Production W123', compare: 'Same', status: 'Link', depth: 3 },
  { index: '2.4.2.1', newErs: 'Expectation ABCD', oldErs: 'Expectation ABCD', compare: 'Same', status: 'Link', depth: 3 },
]

export const compareDetailContent = {
  title: '1.2.2.1 Expectation BCDF',
  newText: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at`,
  newHighlight: 'King Goat City of Chicago,',
  newTextAfter: `looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,`,
  newHighlight2: '"Ulsan Hyundai of Hyunwoo Joh was good..",',
  newTextAfter2: `comes from a line in section 1.10.32.\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form.`,
  oldText: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at`,
  oldStrike: 'Hampden-Sydney College in Virginia,',
  oldTextAfter: `looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,`,
  oldStrike2: '"Lorem ipsum dolor sit amet..",',
  oldTextAfter2: `comes from a line in section 1.10.32.\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,`,
  oldStrike3: 'accompanied by English versions from the 1914 translation by H. Rackham.',
  newText2: `Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  oldText2: `Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
}

export const detailContent = {
  title: '1.2.2.2 Expectation BCDF',
  qaView: 'Q&A View(2/3)',
  body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham....`,
}

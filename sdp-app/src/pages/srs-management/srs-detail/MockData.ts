export interface SrsTreeGroup {
  label: string
  expanded: boolean
  items: SrsTreeItem[]
}

export interface SrsTreeItem {
  id: string
  label: string
  disabled?: boolean
}

export interface SrsDetailData {
  title: string
  summary: string
  progress: 'In Progress' | 'In Approval' | 'Done'
  lastUpdated: string
  updatedUser: string
  expectedValues: string[]
  assignee: string
  coworker: string
  description: string
  supportStatus: string
  supportExpectedValue: string
}

export const ersDescription = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackman.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College.`

export const srsTreeData: SrsTreeGroup[] = [
  {
    label: 'Analog',
    expanded: false,
    items: [],
  },
  {
    label: 'Analog2',
    expanded: true,
    items: [
      { id: 'a2-1', label: '항목(Item)' },
      { id: 'a2-2', label: '항목(Item)' },
      { id: 'a2-3', label: '항목(Item)' },
      { id: 'a2-4', label: '항목(Item)', disabled: true },
      { id: 'a2-5', label: '항목(Item)' },
    ],
  },
  {
    label: 'Analog2',
    expanded: true,
    items: [
      { id: 'a3-1', label: '항목(Item)' },
      { id: 'a3-2', label: '항목(Item)' },
      { id: 'a3-3', label: '항목(Item)' },
      { id: 'a3-4', label: '항목(Item)' },
      { id: 'a3-5', label: '항목(Item)' },
    ],
  },
]

export const assigneeOptions = ['김삼성', '이삼성', '박삼성', '최삼성', '정삼성']
export const coworkerOptions = ['안삼성', '홍삼성', '유삼성', '윤삼성', '장삼성']
export const statusOptions = ['Rejected', 'Approved', 'Pending', 'In Review']
export const functionOptions = ['Function A', 'Function B', 'Function C', 'Function D', 'Function E', 'Function F']

export const srsDetailData: SrsDetailData = {
  title: 'Analog_Feature02',
  summary: 'Analog Feature 02 CD32',
  progress: 'In Progress',
  lastUpdated: '2025-02-12',
  updatedUser: '김삼성',
  expectedValues: ['Function A', 'Function B', 'Function C', 'Function D'],
  assignee: '김삼성',
  coworker: '안삼성',
  description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet.", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackman.`,
  supportStatus: 'Rejected',
  supportExpectedValue: 'classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics',
}

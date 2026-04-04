export interface SidebarSection {
  id: string
  title: string
  type: 'accordion' | 'tree' | 'item'
  expanded?: boolean
  selected?: boolean
  children?: SidebarSection[]
}

export const sidebarSections: SidebarSection[] = [
  { id: '1', title: '1. Overview', type: 'accordion' },
  { id: '2', title: '2. Summary', type: 'accordion' },
  {
    id: '3',
    title: '3. Change Point',
    type: 'accordion',
    expanded: true,
    children: [
      { id: '3.1', title: '3.1 Block Diagram', type: 'tree' },
      {
        id: '3.2',
        title: '3.2 Block Features',
        type: 'tree',
        expanded: true,
        children: [
          { id: '3.2.1', title: '3.2.1 Detail A', type: 'item' },
          { id: '3.2.2', title: '3.2.2 Detail B001A', type: 'item', selected: true },
          { id: '3.2.3', title: '3.2.3 Detail C', type: 'item' },
          { id: '3.2.4', title: '3.2.4 Detail D', type: 'item' },
        ],
      },
      { id: '3.3', title: '3.3 Block Information', type: 'tree' },
    ],
  },
  { id: '4', title: '4. Interface', type: 'accordion' },
  { id: '5', title: '5. Data Flow', type: 'accordion' },
  { id: '4t', title: '4. Task Flow', type: 'accordion' },
  { id: '5t', title: '5. Technical Information', type: 'accordion' },
]

export const detailContent = {
  title: '3.2.2 Deatil B001A',
  body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
}

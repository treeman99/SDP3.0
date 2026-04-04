export function CheckboxChecked() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="#3392D3" stroke="#3392D3" />
      <path d="M3.5 7L6 9.5L10.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckboxUnchecked() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="white" stroke="#DADFE4" />
    </svg>
  )
}

export function CheckboxIndeterminate() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="2" fill="#3392D3" stroke="#3392D3" />
      <line x1="4" y1="7" x2="10" y2="7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Form({ onSubmit, children, className }) {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  )
}

import { type MouseEventHandler, type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function Button ({
  children,
  className,
  onClick
}: {
  children: ReactNode
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      className={
        twMerge('px-3 py-2 rounded bg-secondary hover:bg-secondary/50 transition-colors', className)
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}

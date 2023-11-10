import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { ReactNode } from 'react'

function Menu({ className, children }: { className?: string; children: ReactNode }) {
  return <ul className={cn(className, 'flex', 'flex-col', 'gap-2', 'text-zinc-500')}>{children}</ul>
}

function MenuItem({
  className,
  children,
  selected,
}: {
  className?: string
  children: ReactNode
  selected?: boolean
}) {
  return (
    <li
      className={cn(
        className,
        'flex items-center rounded-md px-2 py-2 hover:cursor-pointer hover:bg-zinc-100 hover:font-bold hover:text-zinc-900 ',
        {
          'rounded-md bg-zinc-100 font-bold text-zinc-900 hover:bg-zinc-200': selected,
        },
      )}
    >
      {children}
    </li>
  )
}

function MenuIcon({ className, children }: { className?: string; children: ReactNode }) {
  return <Slot className={cn(className, 'mr-2 h-4 w-4')}>{children}</Slot>
}

export { Menu, MenuItem, MenuIcon }

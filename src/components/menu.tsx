'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { ReactNode } from 'react'
import { RiDashboardFill } from 'react-icons/ri'

function Menu({ className, children }: { className?: string; children: ReactNode }) {
  return <ul className={cn(className, 'flex', 'flex-col', 'gap-2', 'text-zinc-500')}>{children}</ul>
}

function MenuItem({
  className,
  children,
  selected,
  onClick,
}: {
  className?: string
  children: ReactNode
  selected?: boolean
  onClick?: () => void
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
      onClick={onClick}
    >
      {children}
    </li>
  )
}

const icons = (icon: string) => {
  switch (icon) {
    case 'dashboard':
      return <RiDashboardFill />
    default:
      return <RiDashboardFill />
  }
}

function MenuIcon({ className, icon }: { className?: string; icon: string }) {
  return <Slot className={cn(className, 'mr-2 h-4 w-4')}>{icons(icon)}</Slot>
}

export { Menu, MenuItem, MenuIcon }

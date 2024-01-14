'use client'

import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { ReactNode } from 'react'
import { RiDashboardFill, RiDeviceLine, RiProfileFill, RiUser3Fill } from 'react-icons/ri'
import { FaCat } from 'react-icons/fa6'

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

const icons = (menuId: string) => {
  const DEFAULT_ICON = <FaCat />
  const icons: Record<string, ReactNode> = {
    dashboard: <RiDashboardFill />,
    profile: <RiProfileFill />,
    environment: <RiDeviceLine />,
    userActivity: <RiUser3Fill />,
  }

  return icons[menuId] || DEFAULT_ICON
}

function MenuIcon({ className, menuId }: { className?: string; menuId: string }) {
  return <Slot className={cn(className, 'mr-2 h-4 w-4')}>{icons(menuId)}</Slot>
}

export { Menu, MenuItem, MenuIcon }

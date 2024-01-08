'use client'

import { Menu, MenuIcon, MenuItem } from '@/components/menu'
import { RiDashboardFill, RiDeviceLine, RiProfileFill, RiUser3Fill } from 'react-icons/ri'
import { useRouter } from 'next/navigation'

export function LnbMenus({ className, menus }: LnbMenusProps) {
  const router = useRouter()
  const onClickMenuItem = (href: string | undefined) => {
    if (href) {
      router.push(href)
    }
  }

  return (
    <nav className={className}>
      <Menu>
        {menus.map(menu => (
          <MenuItem key={menu.id} onClick={() => onClickMenuItem(menu.href)}>
            {menu.icon && <MenuIcon icon={menu.icon} />}
            {menu.name}
          </MenuItem>
        ))}
      </Menu>
    </nav>
  )
}

interface LnbMenusProps {
  className?: string
  menus: {
    id: string | number
    name: string
    icon?: string
    href?: string
  }[]
}

const menuIcons = {
  dashboard: <RiDashboardFill />,
  profile: <RiProfileFill />,
  environment: <RiDeviceLine />,
  user: <RiUser3Fill />,
}

'use client'

import { Menu, MenuIcon, MenuItem } from '@/components/menu'
import { useRouter } from 'next/navigation'
import { LnbMenuData } from '@/domains/menu/menu'

export function LnbMenus({ className, menus }: LnbMenusProps) {
  const router = useRouter()
  const onClickMenuItem = (id: string | undefined) => {
    if (id) {
      router.push(id)
    }
  }

  return (
    <nav className={className}>
      <Menu>
        {menus.map(menu => (
          <MenuItem key={menu.id} onClick={() => onClickMenuItem(menu.id)} selected={menu.selected}>
            {menu.id && <MenuIcon menuId={menu.id} />}
            {menu.name}
          </MenuItem>
        ))}
      </Menu>
    </nav>
  )
}

interface LnbMenusProps {
  className?: string
  menus: LnbMenuData[]
}

'use client'

import { useMenus } from '@/domains/menu/menu'
import { LnbMenus } from '@/app/analytics/_components/lnb-menus'

export default function Lnb({ className }: { className?: string }) {
  const menus = useMenus()
  if (!menus) {
    return null
  }

  return <LnbMenus menus={menus} />
}

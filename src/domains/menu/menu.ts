import { usePathname } from 'next/navigation'
import { useCurrentService } from '@/domains/service/service'

export interface MenuData {
  id: string
  name: string
}

export interface LnbMenuData extends MenuData {
  selected: boolean
}

export const getMenusByServiceId = (serviceId?: string): MenuData[] => {
  switch (serviceId) {
    default:
      return [
        {
          id: 'dashboard',
          name: '대시보드',
        },
        {
          id: 'userActivity',
          name: '이용자 활동',
        },
        {
          id: 'environment',
          name: '이용자 환경',
        },
      ]
  }
}

export function useMenus() {
  const currentService = useCurrentService()
  const pathname = usePathname()

  if (!currentService) {
    return null
  }

  const menus = getMenusByServiceId(currentService?.id)
  const currentMenuId = pathname.split('/')[2]

  //@todo currentMenuId에 해당하는 menu가 없을 경우 throw 404 exception
  return menus.map(menu => ({
    ...menu,
    selected: menu.id === currentMenuId,
  }))
}

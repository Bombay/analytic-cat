'use client'

import { cn } from '@/lib/utils'

export default function Lnb({ className }: { className?: string }) {
  return (
    <aside className={cn(className, 'flex flex-col shadow-xl')}>
      {/*<LnbMenus className="mt-7" menus={} />*/}
    </aside>
  )
}

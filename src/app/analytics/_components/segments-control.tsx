import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ReactNode } from 'react'

export default function SegmentsControl() {
  return (
    <section className={cn('border-b-1 mb-4 flex h-[40px] items-center gap-2 pb-1')}>
      <FilterBadge>browser: Chrome</FilterBadge>
      <FilterAddButton />
    </section>
  )
}

function FilterAddButton() {
  return (
    <Badge variant="dashed" className={cn('hover:cursor-pointer')}>
      + 필터 추가
    </Badge>
  )
}

function FilterBadge({ children }: { children: ReactNode }) {
  return <Badge closable>{children}</Badge>
}

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ReactNode } from 'react'

export default function FilterControls() {
  return (
    <section
      className={cn(
        'border-b-1 mb-4 flex h-[40px] items-center gap-2 border-b border-zinc-200 pb-2 pt-2',
      )}
    >
      <FilterAddButton />
      <FilterBadge>browser: Chrome</FilterBadge>
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

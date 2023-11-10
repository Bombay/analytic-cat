import { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export default function ScoreCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex min-w-[200px] flex-col rounded-md pb-4 pl-2 pr-2 pt-4', className)}>
      {children}
    </div>
  )
}

function ScoreCardTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center pb-3 pl-2 pr-2 pt-3 text-5xl font-extrabold">{children}</div>
  )
}

function ScoreCardFooter({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2 pl-2 pr-2">{children}</div>
}

function ScoreCardLabel({ children }: { children: ReactNode }) {
  return <div className="font-bold">{children}</div>
}

function ScoreCardDiff({ children }: { children: number }) {
  const isPositive = children > 0
  let classes = isPositive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'

  return (
    <div className="flex items-center justify-end">
      <Badge className={classes}>
        {isPositive && '+'}
        {children}
      </Badge>
    </div>
  )
}

export interface ScoreCardProps {
  className?: string
  value: number
  label: string
  diff?: number
}

export { ScoreCardTitle, ScoreCardFooter, ScoreCardLabel, ScoreCardDiff }

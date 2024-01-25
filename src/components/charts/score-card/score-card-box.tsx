import { ReactNode } from 'react'

interface ScoreCardProps {
  children: ReactNode
}

export default function ScoreCardBox({ children }: ScoreCardProps) {
  return <div className="flex">{children}</div>
}

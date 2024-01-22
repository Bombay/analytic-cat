'use client'

import { ScoreCardProps } from '@/components/score-card'
import Report from '@/components/report/report'
import ScoreCard from '@/components/charts/score-card'

const scoreCards: ScoreCardProps[] = [
  {
    label: '페이지뷰',
    value: 158,
    diff: 24,
  },
  {
    label: '사용자 수',
    value: 52,
    diff: -10,
  },
  {
    label: '세션 수',
    value: 72,
    diff: 31,
  },
  {
    label: '세션당 페이지뷰',
    value: 6.5,
  },
  {
    label: '사용자 당 세션 수',
    value: 1.2,
    diff: -0.2,
  },
  {
    label: '평균 세션 시간',
    value: 128,
    diff: 15,
  },
]

export default function ServicePage() {
  return (
    <section>
      <Report>
        <ScoreCard />
      </Report>
    </section>
  )
}

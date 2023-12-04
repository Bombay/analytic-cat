'use client'

import SimpleScoreCard, {
  ScoreCardDiff,
  ScoreCardFooter,
  ScoreCardLabel,
  ScoreCardProps,
  ScoreCardTitle,
} from '@/components/score-cards/simple-score-card'
import DashboardChart from '@/app/analytics/dashboard/_components/dashboard-chart'
import axios from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { Operators } from '@/domains/filter/filter.types'

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

const queryFilters = {
  startDate: { filter: Operators.after, value: new Date('2021-01-01') },
  endDate: { filter: Operators.before, value: new Date('2021-01-31') },
  /*timezone: { value: 'Asia/Seoul' },
  unit: { value: 'day' },
  eventType: { filter: Operators.equals, value: 1 },
  url: { filter: Operators.contains, value: 'example.com' },
  referrer: { filter: Operators.doesNotContain, value: 'anotherdomain.com' },
  title: { filter: Operators.equals, value: 'Homepage' },
  os: { filter: Operators.equals, value: 'Windows' },
  browser: { filter: Operators.equals, value: 'Chrome' },
  device: { filter: Operators.equals, value: 'Mobile' },
  country: { filter: Operators.equals, value: 'KR' },
  region: { filter: Operators.equals, value: 'Seoul' },
  city: { filter: Operators.equals, value: 'Gangnam' },
  language: { filter: Operators.equals, value: 'ko' },
  event: { filter: Operators.equals, value: 'click' },
  team: { filter: Operators.equals, value: 'Development' },
  corp: { filter: Operators.equals, value: 'ExampleCorp' },
  lang: { filter: Operators.equals, value: 'Korean' },*/
}

export default function ServicePage() {
  const onClick = async () => {
    const data = await axios.post('/api/service/e25a0666-6dbd-41ea-9204-46a044852f64/stats', {
      ...queryFilters,
    })
    console.log('??', data)
  }

  return (
    <div className="ml-auto mr-auto w-[90%]">
      <Button onClick={onClick}>데이터 가져오기</Button>
      <div className="mb-5 grid grid-cols-3 2xl:grid-cols-6">
        {scoreCards.map(scoreCard => (
          <SimpleScoreCard key={scoreCard.label}>
            <ScoreCardTitle>{scoreCard.value}</ScoreCardTitle>
            <ScoreCardFooter>
              <ScoreCardLabel>{scoreCard.label}</ScoreCardLabel>
              {scoreCard.diff && <ScoreCardDiff>{scoreCard.diff}</ScoreCardDiff>}
            </ScoreCardFooter>
          </SimpleScoreCard>
        ))}
      </div>
      <div className="h-[400px] w-[100%]">
        <DashboardChart />
      </div>
    </div>
  )
}

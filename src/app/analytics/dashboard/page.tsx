import SimpleScoreCard, {
  ScoreCardDiff,
  ScoreCardFooter,
  ScoreCardLabel,
  ScoreCardProps,
  ScoreCardTitle,
} from '@/components/score-cards/simple-score-card'
import DashboardChart from '@/app/analytics/dashboard/_components/dashboard-chart'
import PostsRsc from '@/app/analytics/dashboard/_components/posts/posts-rsc'

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
    <div className="ml-auto mr-auto w-[90%]">
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
      <div>
        <PostsRsc />
      </div>
    </div>
  )
}

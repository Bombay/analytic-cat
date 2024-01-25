import { useState } from 'react'
import ScoreCard, { ScoreCardData } from '@/components/charts/score-card/score-card'
import ScoreCardBox from '@/components/charts/score-card/score-card-box'

const cardsData: ScoreCardData[] = [
  {
    id: 1,
    title: 'Total Users',
    value: 100,
    selected: true,
  },
  {
    id: 2,
    title: 'Total Posts',
    value: 200,
  },
  {
    id: 3,
    title: 'Total Comments',
    value: 300,
  },
  {
    id: 4,
    title: 'Total Likes',
    value: 400,
  },
]

/**
 * 차트를 담는 리포트. 차트 여러 개를 담을 수 있음
 * 크기는 디비에 저장되서 설정됨
 */
export default function ScoreCardWithLineReport() {
  const [cards, setCards] = useState(cardsData)
  const onClick = (id: ScoreCardData['id']) => {
    setCards(cards =>
      cards.map(card =>
        card.id === id ? { ...card, selected: true } : { ...card, selected: false },
      ),
    )
  }

  return (
    <div className="rounded border border-gray-200 shadow-sm">
      <ScoreCardBox>
        {cards.map(card => (
          <ScoreCard
            key={card.id}
            id={card.id}
            title={card.title}
            value={card.value}
            selected={card.selected}
            onClick={onClick}
          />
        ))}
      </ScoreCardBox>
    </div>
  )
}

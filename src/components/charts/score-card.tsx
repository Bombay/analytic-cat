const data = [
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

export default function ScoreCard() {
  return (
    <div className="flex">
      {data.map(card => (
        <Card key={card.id} title={card.title} value={card.value} selected={card.selected} />
      ))}
    </div>
  )
}

interface CardProps {
  title: string
  value: number | string
  selected?: boolean
}

const CARD_FONT_COLOR_ACCENT = 'text-zinc-950'
const CARD_FONT_COLOR_DEFAULT = 'text-gray-500'

function Card({ title, value, selected = false }: CardProps) {
  return (
    <div className="flex flex-col rounded pl-6 pr-6 hover:bg-gray-100">
      <div className="relative flex flex-col pb-6 pt-6">
        {selected && (
          <div className="absolute left-0 top-0 h-1 w-full rounded-bl-lg rounded-br-lg bg-zinc-950"></div>
        )}
        <div
          className={`text-sm ${
            selected ? `font-bold ${CARD_FONT_COLOR_ACCENT}` : CARD_FONT_COLOR_DEFAULT
          }`}
        >
          {title}
        </div>
        <div
          className={`text-3xl ${
            selected ? `font-bold ${CARD_FONT_COLOR_ACCENT}` : CARD_FONT_COLOR_DEFAULT
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  )
}

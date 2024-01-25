'use client'

import { motion } from 'framer-motion'

const CARD_FONT_COLOR_ACCENT = 'text-zinc-950'
const CARD_FONT_COLOR_DEFAULT = 'text-gray-500'

export default function ScoreCard({ id, title, value, selected = false, onClick }: ScoreCardProps) {
  return (
    <div
      className="flex cursor-pointer flex-col rounded pl-6 pr-6 hover:bg-gray-100"
      onClick={onClick ? () => onClick(id) : undefined}
    >
      <div className="relative flex flex-col pb-6 pt-6">
        {selected && (
          <motion.div
            layoutId="score-card-upper-line"
            className="absolute left-0 top-0 h-1 w-full rounded-bl-lg rounded-br-lg bg-zinc-950"
          />
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

export interface ScoreCardData {
  id: number
  title: string
  value: number | string
  selected?: boolean
}

interface ScoreCardProps extends ScoreCardData {
  onClick?: (id: ScoreCardData['id']) => void
}

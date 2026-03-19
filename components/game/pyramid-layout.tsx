'use client'

import { Card, ThemeConfig } from '@/lib/game-data'
import { PlayingCard } from './playing-card'

interface PyramidLayoutProps {
  cards: Card[]
  theme: ThemeConfig
  onCardClick: (card: Card) => void
  wrongCardId: number | null
}

export function PyramidLayout({ cards, theme, onCardClick, wrongCardId }: PyramidLayoutProps) {
  // Create pyramid rows: 1, 2, 3, 4, 5 cards
  const rows = [
    cards.slice(0, 1),
    cards.slice(1, 3),
    cards.slice(3, 6),
    cards.slice(6, 10),
    cards.slice(10, 15),
  ]

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
      {rows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4"
        >
          {row.map((card) => (
            <PlayingCard
              key={card.id}
              card={card}
              theme={theme}
              onClick={() => onCardClick(card)}
              isWrong={wrongCardId === card.id}
              pyramidRow={rowIndex}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

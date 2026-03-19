'use client'

import { Card, ThemeConfig } from '@/lib/game-data'
import { cn } from '@/lib/utils'

interface PlayingCardProps {
  card: Card
  theme: ThemeConfig
  onClick: () => void
  isWrong: boolean
  pyramidRow: number
}

export function PlayingCard({ card, theme, onClick, isWrong, pyramidRow }: PlayingCardProps) {
  const sizeClasses = pyramidRow <= 2 ? 'w-20 h-28 sm:w-24 sm:h-32 md:w-28 md:h-36' : 'w-18 h-26 sm:w-22 sm:h-30 md:w-26 md:h-34'
  
  if (card.isCollected) {
    return <div className={cn(sizeClasses, 'opacity-0 transition-opacity duration-500')} />
  }

  return (
    <div
      className={cn(
        sizeClasses,
        'relative cursor-pointer perspective-1000 transition-transform hover:scale-105',
        isWrong && 'animate-shake'
      )}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-700 transform-style-preserve-3d',
          card.isFlipped && 'rotate-y-180'
        )}
        style={{
          transformStyle: 'preserve-3d',
          transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card - Playing card with theme background */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl shadow-lg overflow-hidden border-2 border-white/50"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Background image layer */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${theme.cardFront})` }}
          />
          {/* Main card content */}
          <div className="w-full h-full bg-white/85 flex flex-col items-center justify-center p-1 relative">
            {/* Top left value */}
            <div className={cn(
              'absolute top-1 left-1 flex flex-col items-center text-xs sm:text-sm font-bold leading-none z-10',
              card.color === 'red' ? 'text-red-600' : 'text-gray-900'
            )}>
              <span className="drop-shadow-sm">{card.value}</span>
              <span className="text-base sm:text-lg drop-shadow-sm">{card.suitSymbol}</span>
            </div>
            
            {/* Center suit */}
            <div className={cn(
              'text-3xl sm:text-4xl md:text-5xl z-10 drop-shadow-md',
              card.color === 'red' ? 'text-red-600' : 'text-gray-900'
            )}>
              {card.suitSymbol}
            </div>
            
            {/* Bottom right value (upside down) */}
            <div className={cn(
              'absolute bottom-1 right-1 flex flex-col items-center text-xs sm:text-sm font-bold leading-none rotate-180 z-10',
              card.color === 'red' ? 'text-red-600' : 'text-gray-900'
            )}>
              <span className="drop-shadow-sm">{card.value}</span>
              <span className="text-base sm:text-lg drop-shadow-sm">{card.suitSymbol}</span>
            </div>
          </div>
        </div>

        {/* Back of card - Learning content */}
        <div
          className="absolute inset-0 backface-hidden rounded-xl shadow-lg overflow-hidden border-2 border-white/50"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: theme.cardBack,
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-white">
            {/* Show combined icons for hard level content with subIcon */}
            {card.learningContent.subIcon ? (
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xl sm:text-2xl md:text-3xl">
                  {card.learningContent.subIcon}
                </span>
                <span className="text-base sm:text-lg">+</span>
                <span className="text-xl sm:text-2xl md:text-3xl">
                  {card.learningContent.icon}
                </span>
              </div>
            ) : (
              <span className="text-2xl sm:text-3xl md:text-4xl mb-1">
                {card.learningContent.icon}
              </span>
            )}
            <span className="text-xs sm:text-sm md:text-base font-bold text-center leading-tight">
              {card.learningContent.text}
            </span>
          </div>
        </div>
      </div>
      
      {/* Wrong answer indicator */}
      {isWrong && (
        <div className="absolute inset-0 rounded-xl border-4 border-red-500 pointer-events-none animate-pulse" />
      )}
    </div>
  )
}

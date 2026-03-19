'use client'

import { ThemeConfig } from '@/lib/game-data'

interface GameSidebarProps {
  theme: ThemeConfig
  hint: string
  collected: number
  total: number
  rewards: string[]
  nightMode?: boolean
}

export function GameSidebar({ theme, hint, collected, total, rewards, nightMode = false }: GameSidebarProps) {
  const progress = (collected / total) * 100

  return (
    <div 
      className="flex flex-col gap-4 p-5 rounded-2xl backdrop-blur-sm shadow-2xl w-72 lg:w-80"
      style={{ backgroundColor: nightMode ? 'rgba(17,24,39,0.95)' : 'rgba(255,255,255,0.95)' }}
    >
      {/* Animal Icon at top */}
      <div className="flex justify-center">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${theme.secondaryColor}40, ${theme.primaryColor}40)`,
            border: `3px solid ${theme.primaryColor}`,
          }}
        >
          {theme.icon}
        </div>
      </div>

      {/* Hint Box - Prominent */}
      <div 
        className="p-5 rounded-xl text-white text-center shadow-lg"
        style={{ background: theme.cardBack }}
      >
        <div className="text-xs uppercase tracking-wider mb-2 opacity-80 font-medium">Find the card:</div>
        <div className="text-xl sm:text-2xl font-bold leading-snug">{hint}</div>
      </div>

      {/* Basket with Rewards */}
      <div className="space-y-2">
        <div 
          className="text-sm font-semibold text-center flex items-center justify-center gap-2"
          style={{ color: nightMode ? '#d1d5db' : '#374151' }}
        >
          <span className="text-lg">🧺</span>
          <span>Basket</span>
        </div>
        <div 
          className="min-h-[100px] p-3 rounded-xl border-dashed flex flex-wrap gap-1 justify-center items-center transition-all"
          style={{ 
            borderColor: theme.primaryColor, 
            borderWidth: '3px',
            backgroundColor: rewards.length > 0 
              ? (nightMode ? '#1f2937' : '#ffffff') 
              : (nightMode ? 'rgba(31,41,55,0.5)' : '#f9fafb')
          }}
        >
          {rewards.length === 0 ? (
            <span className="text-sm" style={{ color: nightMode ? '#6b7280' : '#9ca3af' }}>Collect rewards!</span>
          ) : (
            rewards.map((reward, index) => (
              <span 
                key={index} 
                className="text-2xl animate-bounce-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {reward}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div 
          className="flex justify-between text-sm font-semibold"
          style={{ color: nightMode ? '#d1d5db' : '#374151' }}
        >
          <span>Progress</span>
          <span>{collected} / {total}</span>
        </div>
        <div 
          className="h-5 rounded-full overflow-hidden shadow-inner"
          style={{ backgroundColor: nightMode ? '#374151' : '#e5e7eb' }}
        >
          <div 
            className="h-full transition-all duration-500 ease-out rounded-full flex items-center justify-end pr-2"
            style={{ 
              width: `${Math.max(progress, 8)}%`,
              background: theme.cardBack,
            }}
          >
            {progress > 0 && <span className="text-xs text-white font-bold">{Math.round(progress)}%</span>}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { ThemeConfig } from '@/lib/game-data'
import { Button } from '@/components/ui/button'

interface WinScreenProps {
  isOpen: boolean
  theme: ThemeConfig
  onPlayAgain: () => void
}

export function WinScreen({ isOpen, theme, onPlayAgain }: WinScreenProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative text-center animate-scale-in">
        {/* Confetti effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              {['🎉', '⭐', '🎊', theme.reward, '✨'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm">
          {/* Happy/Full Animal */}
          <div className="relative mb-4">
            <div 
              className="text-8xl animate-bounce-slow"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
            >
              {theme.icon}
            </div>
            <div className="absolute -top-2 -right-2 text-4xl animate-spin-slow">😴</div>
          </div>

          <h2 
            className="text-3xl font-bold mb-2"
            style={{ color: theme.primaryColor }}
          >
            You Won!
          </h2>
          
          <p className="text-gray-600 mb-4">
            {theme.name} is happy and full! Great job learning!
          </p>

          {/* Collected rewards display */}
          <div className="flex justify-center gap-1 mb-6 flex-wrap">
            {[...Array(15)].map((_, i) => (
              <span 
                key={i} 
                className="text-xl animate-bounce-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {theme.reward}
              </span>
            ))}
          </div>

          <Button
            onClick={onPlayAgain}
            size="lg"
            className="gap-2 text-white font-bold"
            style={{ background: theme.cardBack }}
          >
            Review What You Learned
          </Button>
        </div>
      </div>
    </div>
  )
}

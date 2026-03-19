'use client'

import { ThemeConfig } from '@/lib/game-data'
import { X } from 'lucide-react'

interface HowToPlayModalProps {
  isOpen: boolean
  onClose: () => void
  theme: ThemeConfig
}

export function HowToPlayModal({ isOpen, onClose, theme }: HowToPlayModalProps) {
  if (!isOpen) return null

  const steps = [
    { icon: '👀', text: 'Look at the hint to find the correct card' },
    { icon: '👆', text: 'Click the matching card in the pyramid' },
    { icon: '🔄', text: 'Watch the card flip to reveal learning content' },
    { icon: theme.reward, text: `Collect ${theme.reward} rewards for correct answers` },
    { icon: '🏆', text: 'Complete all 15 cards to win!' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-2">{theme.icon}</div>
          <h2 className="text-2xl font-bold">How to Play</h2>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl bg-gray-50"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{ 
                  background: `${theme.primaryColor}20`,
                }}
              >
                {step.icon}
              </div>
              <p className="text-gray-700 font-medium">{step.text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl text-white font-bold transition-transform hover:scale-105"
          style={{ background: theme.cardBack }}
        >
          Let&apos;s Play!
        </button>
      </div>
    </div>
  )
}

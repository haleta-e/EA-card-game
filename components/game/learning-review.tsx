'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, ThemeConfig } from '@/lib/game-data'
import { Button } from '@/components/ui/button'
import { Play, Pause, SkipForward, RotateCcw, Volume2 } from 'lucide-react'

interface LearningReviewProps {
  isOpen: boolean
  theme: ThemeConfig
  cards: Card[]
  onPlayAgain: () => void
  onClose: () => void
}

export function LearningReview({ isOpen, theme, cards, onPlayAgain, onClose }: LearningReviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const collectedCards = cards.filter(c => c.isCollected)
  const currentCard = collectedCards[currentIndex]

  // Speak the learning content
  const speakContent = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1.1
      utterance.volume = 1
      speechRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  // Auto-advance cards
  useEffect(() => {
    if (!isOpen || !isPlaying || collectedCards.length === 0) return

    // Speak current card content
    if (currentCard) {
      speakContent(currentCard.learningContent.text)
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % collectedCards.length
        return next
      })
    }, 20000) // Show each card for 20 seconds (5 min / 15 cards approx)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isOpen, isPlaying, currentIndex, collectedCards.length, currentCard, speakContent])

  // Countdown timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsPlaying(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, isPlaying])

  // Speak when card changes
  useEffect(() => {
    if (isOpen && isPlaying && currentCard) {
      speakContent(currentCard.learningContent.text)
    }
  }, [currentIndex, isOpen, isPlaying, currentCard, speakContent])

  // Cleanup speech on unmount or close
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Reset when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
      setIsPlaying(true)
      setTimeRemaining(300)
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % collectedCards.length)
  }

  const handleTogglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
    }
    setIsPlaying(!isPlaying)
  }

  const handlePlayAgain = () => {
    window.speechSynthesis.cancel()
    onPlayAgain()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      
      <div className="relative w-full max-w-4xl animate-scale-in">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div 
            className="p-4 text-center text-white"
            style={{ background: theme.cardBack }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl">{theme.icon}</span>
              <h2 className="text-2xl font-bold">Learning Review Time!</h2>
              <span className="text-4xl">{theme.icon}</span>
            </div>
            <p className="opacity-90">Let&apos;s review everything you learned today</p>
          </div>

          {/* Main Content Area */}
          <div className="p-6">
            {/* Timer and Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-2xl font-mono font-bold text-gray-700">
                {formatTime(timeRemaining)}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleTogglePlay}
                  className="rounded-full"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  className="rounded-full"
                >
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => currentCard && speakContent(currentCard.learningContent.text)}
                  className="rounded-full"
                >
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>
              <div className="text-gray-500">
                {currentIndex + 1} / {collectedCards.length}
              </div>
            </div>

            {/* Current Learning Card - Large Display */}
            {currentCard && (
              <div 
                className="mx-auto max-w-md p-8 rounded-2xl text-center text-white mb-6 animate-bounce-in"
                style={{ background: theme.cardBack }}
                key={currentIndex}
              >
                {/* Show combined icons for hard level content */}
                {currentCard.learningContent.subIcon ? (
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-6xl">{currentCard.learningContent.subIcon}</span>
                    <span className="text-4xl">+</span>
                    <span className="text-6xl">{currentCard.learningContent.icon}</span>
                  </div>
                ) : (
                  <div className="text-8xl mb-4">
                    {currentCard.learningContent.icon}
                  </div>
                )}
                <div className="text-3xl font-bold mb-2">
                  {currentCard.learningContent.text}
                </div>
                <div className="text-sm opacity-75 mt-4">
                  From: {currentCard.value} of {currentCard.suit}
                </div>
              </div>
            )}

            {/* All Cards Grid - Small Thumbnails */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-3 text-center">All items you learned:</p>
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                {collectedCards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`p-2 rounded-lg text-center transition-all ${
                      index === currentIndex 
                        ? 'ring-2 ring-offset-2 scale-110' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{ 
                      background: index === currentIndex ? theme.cardBack : `${theme.primaryColor}20`,
                      ringColor: theme.primaryColor,
                    }}
                  >
                    <span className="text-xl">{card.learningContent.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-gray-50 flex justify-center gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
            >
              Continue Watching
            </Button>
            <Button
              onClick={handlePlayAgain}
              size="lg"
              className="gap-2 text-white"
              style={{ background: theme.cardBack }}
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

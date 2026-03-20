'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Theme, Level, LessonPack, themes, Card, generateDeck, generateQuestion, Question } from '@/lib/game-data'
import { PyramidLayout } from './pyramid-layout'
import { GameSidebar } from './game-sidebar'
import { SettingsPanel } from './settings-panel'
import { HowToPlayModal } from './how-to-play-modal'
import { WinScreen } from './win-screen'
import { LearningReview } from './learning-review'
import { FlyingReward } from './flying-reward'
import { useAudio } from '@/hooks/use-audio'
import { Settings } from 'lucide-react'

// Helper to get streak from localStorage
function getStreak(): number {
  if (typeof window === 'undefined') return 0
  const data = localStorage.getItem('kidsCardGame_streak')
  if (!data) return 0
  try {
    const parsed = JSON.parse(data)
    const lastPlayed = new Date(parsed.lastPlayed)
    const today = new Date()
    const diffDays = Math.floor((today.getTime() - lastPlayed.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays > 1) return 0 // Streak broken
    return parsed.streak || 0
  } catch {
    return 0
  }
}

function updateStreak(): number {
  if (typeof window === 'undefined') return 0
  const data = localStorage.getItem('kidsCardGame_streak')
  const today = new Date().toDateString()
  
  if (!data) {
    localStorage.setItem('kidsCardGame_streak', JSON.stringify({ streak: 1, lastPlayed: today }))
    return 1
  }
  
  try {
    const parsed = JSON.parse(data)
    const lastPlayed = new Date(parsed.lastPlayed).toDateString()
    
    if (lastPlayed === today) {
      return parsed.streak // Already played today
    }
    
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (lastPlayed === yesterday.toDateString()) {
      // Consecutive day
      const newStreak = (parsed.streak || 0) + 1
      localStorage.setItem('kidsCardGame_streak', JSON.stringify({ streak: newStreak, lastPlayed: today }))
      return newStreak
    }
    
    // Streak broken
    localStorage.setItem('kidsCardGame_streak', JSON.stringify({ streak: 1, lastPlayed: today }))
    return 1
  } catch {
    localStorage.setItem('kidsCardGame_streak', JSON.stringify({ streak: 1, lastPlayed: today }))
    return 1
  }
}

export function CardGame() {
  const [mounted, setMounted] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>('panda')
  const [currentLevel, setCurrentLevel] = useState<Level>('easy')
  const [lessonPack, setLessonPack] = useState<LessonPack>('mixed')
  const [cards, setCards] = useState<Card[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [collectedIds, setCollectedIds] = useState<number[]>([])
  const [rewards, setRewards] = useState<string[]>([])
  const [wrongCardId, setWrongCardId] = useState<number | null>(null)
  const [musicEnabled, setMusicEnabled] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [volume, setVolume] = useState(50)
  const [nightMode, setNightMode] = useState(false)
  const [streak, setStreak] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [howToPlayOpen, setHowToPlayOpen] = useState(false)
  const [showWin, setShowWin] = useState(false)
  const [showLearningReview, setShowLearningReview] = useState(false)
  const [flyingReward, setFlyingReward] = useState<{
    id: number
    startPosition: { x: number; y: number }
    endPosition: { x: number; y: number }
  } | null>(null)
  
  const basketRef = useRef<HTMLDivElement>(null)
  const theme = themes[currentTheme]
  const { playSound, startMusic, stopMusic, setVolume: setAudioVolume, speakText } = useAudio()

  // Mark as mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
    setStreak(getStreak())
  }, [])

  // Handle music
  useEffect(() => {
    if (musicEnabled) {
      startMusic(currentTheme)
    } else {
      stopMusic()
    }
  }, [musicEnabled, currentTheme, startMusic, stopMusic])

  // Handle volume
  useEffect(() => {
    setAudioVolume(volume)
  }, [volume, setAudioVolume])

  // Initialize game
  const initGame = useCallback(() => {
    const newCards = generateDeck(currentLevel, lessonPack)
    setCards(newCards)
    setCollectedIds([])
    setRewards([])
    setShowWin(false)
    setShowLearningReview(false)
    setCurrentQuestion(generateQuestion(newCards, currentLevel, []))
  }, [currentLevel, lessonPack])

  useEffect(() => {
    initGame()
  }, [initGame])

  // Update question when cards are collected
  useEffect(() => {
    if (cards.length > 0 && collectedIds.length < 15) {
      setCurrentQuestion(generateQuestion(cards, currentLevel, collectedIds))
    }
  }, [cards, collectedIds, currentLevel])

  // Check for win - show win screen first, then learning review
  useEffect(() => {
    if (collectedIds.length === 15) {
      if (soundEnabled) playSound('win')
      setStreak(updateStreak())
      setTimeout(() => setShowWin(true), 500)
    }
  }, [collectedIds, playSound, soundEnabled])

  const handleCardClick = useCallback((card: Card) => {
    if (card.isFlipped || card.isCollected || !currentQuestion) return

    const isCorrect = currentQuestion.checkAnswer(card)

    if (isCorrect) {
      if (soundEnabled) playSound('flip')
      
      // Flip the card
      setCards(prev => prev.map(c => 
        c.id === card.id ? { ...c, isFlipped: true, isCorrect: true } : c
      ))

      // Speak the learning content when card flips
      if (soundEnabled) {
        setTimeout(() => {
          speakText(card.learningContent.text)
        }, 300)
      }

      // Get card position for flying animation
      const cardElement = document.querySelector(`[data-card-id="${card.id}"]`)
      const basketElement = basketRef.current
      
      // After longer delay (2.5 seconds), collect the card
      setTimeout(() => {
        if (soundEnabled) playSound('collect')
        
        if (cardElement && basketElement) {
          const cardRect = cardElement.getBoundingClientRect()
          const basketRect = basketElement.getBoundingClientRect()
          
          setFlyingReward({
            id: Date.now(),
            startPosition: { 
              x: cardRect.left + cardRect.width / 2, 
              y: cardRect.top + cardRect.height / 2 
            },
            endPosition: { 
              x: basketRect.left + basketRect.width / 2, 
              y: basketRect.top + basketRect.height / 2 
            },
          })
        }

        setCards(prev => prev.map(c => 
          c.id === card.id ? { ...c, isCollected: true } : c
        ))
        setCollectedIds(prev => [...prev, card.id])
        setRewards(prev => [...prev, theme.reward])
      }, 2500)
    } else {
      // Wrong answer
      if (soundEnabled) playSound('wrong')
      setWrongCardId(card.id)
      setTimeout(() => setWrongCardId(null), 500)
    }
  }, [currentQuestion, theme.reward, playSound, soundEnabled, speakText])

  const handleThemeChange = (newTheme: Theme) => {
    setCurrentTheme(newTheme)
  }

  const handleLevelChange = (newLevel: Level) => {
    setCurrentLevel(newLevel)
  }

  const handleLessonPackChange = (pack: LessonPack) => {
    setLessonPack(pack)
  }

  const handleResetProgress = () => {
    localStorage.removeItem('kidsCardGame_streak')
    setStreak(0)
    initGame()
    setSettingsOpen(false)
  }

  const handleWinComplete = () => {
    setShowWin(false)
    setShowLearningReview(true)
  }

  // Show loading screen until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐼</div>
          <p className="text-gray-600 font-medium">Loading game...</p>
        </div>
      </div>
    )
  }

  // Handle first user interaction to enable music playback (browser autoplay policy)
  const handleUserInteraction = useCallback(() => {
    if (musicEnabled) {
      startMusic(currentTheme)
    }
  }, [musicEnabled, currentTheme, startMusic])

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-fixed transition-all duration-500 cursor-pointer"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      style={{ 
        backgroundImage: `url(${theme.background})`,
      }}
    >
      {/* Overlay for better contrast */}
      <div 
        className="min-h-screen w-full backdrop-blur-[2px]"
        style={{ backgroundColor: nightMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)' }}
      >
        {/* Settings Button */}
        <button
          onClick={() => setSettingsOpen(true)}
          className="fixed top-4 left-4 z-40 p-3 rounded-full shadow-lg transition-colors"
          style={{ 
            backgroundColor: nightMode ? '#1f2937' : 'rgba(255,255,255,0.9)',
          }}
        >
          <Settings className="w-6 h-6" style={{ color: nightMode ? '#e5e7eb' : '#374151' }} />
        </button>

        {/* Streak indicator (top right) */}
        {streak > 0 && (
          <div 
            className="fixed top-4 right-4 z-40 px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            style={{ 
              backgroundColor: nightMode ? '#1f2937' : 'rgba(255,255,255,0.9)',
              color: nightMode ? '#fb923c' : '#ea580c'
            }}
          >
            <span className="text-lg">*</span>
            <span className="font-bold">{streak}</span>
          </div>
        )}

        {/* Main Game Layout - Side by side */}
        <div className="min-h-screen flex items-center justify-center p-4 pt-16 lg:pt-4">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
            {/* Sidebar on left for desktop */}
            <div ref={basketRef} className="order-2 lg:order-1 lg:sticky lg:top-20">
              <GameSidebar
                theme={theme}
                hint={currentQuestion?.text || 'Loading...'}
                collected={collectedIds.length}
                total={15}
                rewards={rewards}
                nightMode={nightMode}
              />
            </div>

            {/* Card Pyramid */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="transform scale-90 sm:scale-100">
                {cards.map(card => (
                  <div key={card.id} data-card-id={card.id} className="hidden" />
                ))}
                <PyramidLayout
                  cards={cards}
                  theme={theme}
                  onCardClick={handleCardClick}
                  wrongCardId={wrongCardId}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Flying Reward Animation */}
        {flyingReward && (
          <FlyingReward
            key={flyingReward.id}
            reward={theme.reward}
            startPosition={flyingReward.startPosition}
            endPosition={flyingReward.endPosition}
            onComplete={() => setFlyingReward(null)}
          />
        )}

        {/* Modals */}
        <SettingsPanel
          isOpen={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          theme={currentTheme}
          level={currentLevel}
          lessonPack={lessonPack}
          musicEnabled={musicEnabled}
          soundEnabled={soundEnabled}
          volume={volume}
          nightMode={nightMode}
          streak={streak}
          onThemeChange={handleThemeChange}
          onLevelChange={handleLevelChange}
          onLessonPackChange={handleLessonPackChange}
          onMusicToggle={() => setMusicEnabled(!musicEnabled)}
          onSoundToggle={() => setSoundEnabled(!soundEnabled)}
          onVolumeChange={setVolume}
          onNightModeToggle={() => setNightMode(!nightMode)}
          onResetProgress={handleResetProgress}
          onHowToPlay={() => {
            setSettingsOpen(false)
            setHowToPlayOpen(true)
          }}
        />

        <HowToPlayModal
          isOpen={howToPlayOpen}
          onClose={() => setHowToPlayOpen(false)}
          theme={theme}
        />

        <WinScreen
          isOpen={showWin}
          theme={theme}
          onPlayAgain={handleWinComplete}
        />

        <LearningReview
          isOpen={showLearningReview}
          theme={theme}
          cards={cards}
          onPlayAgain={initGame}
          onClose={() => setShowLearningReview(false)}
        />
      </div>
    </div>
  )
}

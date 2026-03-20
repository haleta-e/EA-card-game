'use client'

import { useState, useRef, useEffect } from 'react'
import { ThemeConfig } from '@/lib/game-data'
import { GripHorizontal } from 'lucide-react'

interface GameSidebarProps {
  theme: ThemeConfig
  hint: string
  collected: number
  total: number
  rewards: string[]
  nightMode?: boolean
}

interface Position {
  x: number
  y: number
}

interface Size {
  width: number
  height: number
}

export function GameSidebar({ theme, hint, collected, total, rewards, nightMode = false }: GameSidebarProps) {
  const [hintPosition, setHintPosition] = useState<Position>({ x: 0, y: 0 })
  const [basketPosition, setBasketPosition] = useState<Position>({ x: 0, y: 80 })
  const [hintSize, setHintSize] = useState<Size>({ width: 300, height: 120 })
  const [basketSize, setBasketSize] = useState<Size>({ width: 300, height: 140 })
  const [isDraggingHint, setIsDraggingHint] = useState(false)
  const [isDraggingBasket, setIsDraggingBasket] = useState(false)
  const [isResizingHint, setIsResizingHint] = useState(false)
  const [isResizingBasket, setIsResizingBasket] = useState(false)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })

  const hintRef = useRef<HTMLDivElement>(null)
  const basketRef = useRef<HTMLDivElement>(null)

  // Handle hint drag
  const handleHintMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-resizer]')) return
    setIsDraggingHint(true)
    setDragOffset({
      x: e.clientX - hintPosition.x,
      y: e.clientY - hintPosition.y,
    })
  }

  // Handle basket drag
  const handleBasketMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-resizer]')) return
    setIsDraggingBasket(true)
    setDragOffset({
      x: e.clientX - basketPosition.x,
      y: e.clientY - basketPosition.y,
    })
  }

  // Handle hint resize
  const handleHintResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizingHint(true)
  }

  // Handle basket resize
  const handleBasketResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizingBasket(true)
  }

  // Global mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingHint) {
        setHintPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
      if (isDraggingBasket) {
        setBasketPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
      if (isResizingHint && hintRef.current) {
        const rect = hintRef.current.getBoundingClientRect()
        setHintSize({
          width: Math.max(200, e.clientX - rect.left),
          height: Math.max(100, e.clientY - rect.top),
        })
      }
      if (isResizingBasket && basketRef.current) {
        const rect = basketRef.current.getBoundingClientRect()
        setBasketSize({
          width: Math.max(200, e.clientX - rect.left),
          height: Math.max(100, e.clientY - rect.top),
        })
      }
    }

    const handleMouseUp = () => {
      setIsDraggingHint(false)
      setIsDraggingBasket(false)
      setIsResizingHint(false)
      setIsResizingBasket(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingHint, isDraggingBasket, isResizingHint, isResizingBasket, dragOffset])

  const progress = (collected / total) * 100

  return (
    <div 
      className="relative flex flex-col gap-4 p-5 rounded-2xl backdrop-blur-sm shadow-2xl w-72 lg:w-80"
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

      {/* Hint Box - Draggable and Resizable */}
      <div 
        ref={hintRef}
        className="absolute p-5 rounded-xl text-white text-center shadow-lg group border-2 border-transparent hover:border-yellow-300 transition-colors cursor-move"
        onMouseDown={handleHintMouseDown}
        style={{ 
          background: theme.cardBack,
          left: `${hintPosition.x}px`,
          top: `${hintPosition.y}px`,
          width: `${hintSize.width}px`,
          minHeight: `${hintSize.height}px`,
        }}
      >
        {/* Drag Handle */}
        <div className="absolute -top-8 left-0 right-0 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <GripHorizontal className="w-4 h-4 text-yellow-300" />
        </div>
        <div className="text-xs uppercase tracking-wider mb-2 opacity-80 font-medium">Find the card:</div>
        <div className="text-lg sm:text-xl font-bold leading-snug">{hint}</div>
        {/* Resize Handle */}
        <div 
          data-resizer="true"
          onMouseDown={handleHintResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-300 rounded-bl-lg cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
          title="Drag to resize"
        />
      </div>

      {/* Basket with Rewards - Draggable and Resizable */}
      <div 
        ref={basketRef}
        className="absolute p-3 rounded-xl border-dashed group transition-all cursor-move"
        onMouseDown={handleBasketMouseDown}
        style={{ 
          borderColor: theme.primaryColor, 
          borderWidth: '3px',
          backgroundColor: rewards.length > 0 
            ? (nightMode ? '#1f2937' : '#ffffff') 
            : (nightMode ? 'rgba(31,41,55,0.5)' : '#f9fafb'),
          left: `${basketPosition.x}px`,
          top: `${basketPosition.y}px`,
          width: `${basketSize.width}px`,
          minHeight: `${basketSize.height}px`,
        }}
      >
        {/* Drag Handle */}
        <div className="absolute -top-8 left-0 right-0 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <GripHorizontal className="w-4 h-4" style={{ color: theme.primaryColor }} />
        </div>
        <div 
          className="text-sm font-semibold text-center flex items-center justify-center gap-2 mb-2"
          style={{ color: nightMode ? '#d1d5db' : '#374151' }}
        >
          <span className="text-lg">🧺</span>
          <span>Basket</span>
        </div>
        <div className="flex flex-wrap gap-1 justify-center items-center">
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
        {/* Resize Handle */}
        <div 
          data-resizer="true"
          onMouseDown={handleBasketResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 rounded-bl-lg cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: theme.primaryColor }}
          title="Drag to resize"
        />
      </div>

      {/* Progress Bar - Fixed Position */}
      <div className="relative z-10 space-y-2">
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

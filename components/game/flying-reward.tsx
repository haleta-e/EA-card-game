'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface FlyingRewardProps {
  reward: string
  startPosition: { x: number; y: number }
  endPosition: { x: number; y: number }
  onComplete: () => void
}

export function FlyingReward({ reward, startPosition, endPosition, onComplete }: FlyingRewardProps) {
  const [phase, setPhase] = useState<'bounce' | 'fly' | 'land'>('bounce')
  const [style, setStyle] = useState({
    left: startPosition.x,
    top: startPosition.y,
    opacity: 1,
    transform: 'scale(1.5) rotate(0deg)',
  })

  useEffect(() => {
    // Phase 1: Bounce/wiggle at start position
    const bounceTimeout = setTimeout(() => {
      setPhase('fly')
      // Phase 2: Fly to basket
      setStyle({
        left: endPosition.x,
        top: endPosition.y,
        opacity: 1,
        transform: 'scale(1) rotate(360deg)',
      })
    }, 400)

    // Phase 3: Land with small bounce
    const landTimeout = setTimeout(() => {
      setPhase('land')
    }, 1000)

    // Complete callback
    const completeTimeout = setTimeout(() => {
      onComplete()
    }, 1200)

    return () => {
      clearTimeout(bounceTimeout)
      clearTimeout(landTimeout)
      clearTimeout(completeTimeout)
    }
  }, [endPosition.x, endPosition.y, onComplete])

  return (
    <div
      className={cn(
        'fixed z-50 text-4xl pointer-events-none',
        phase === 'bounce' && 'animate-reward-wiggle',
        phase === 'fly' && 'transition-all duration-600 ease-out',
        phase === 'land' && 'animate-reward-land'
      )}
      style={{
        left: style.left,
        top: style.top,
        opacity: style.opacity,
        transform: style.transform,
        transition: phase === 'fly' ? 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
      }}
    >
      {reward}
    </div>
  )
}

'use client'

import { useRef, useCallback, useEffect } from 'react'

/**
 * Audio System for Kids Card Game
 * Features:
 * - Sound effects for game events (flip, correct, wrong, collect, win)
 * - Theme-specific background music with volume control
 * - Text-to-speech for learning content
 * - Browser autoplay policy handling
 */

// Free sound URLs from freesound.org (creative commons)
// Kid-friendly sound effects for learning game
// Audio cues are played at key moments:
// - flip: When a card reveals correct learning content
// - correct: Reserved for future use (ding sound)
// - wrong: When user selects wrong card
// - collect: When card is collected after learning content display
// - win: When all cards are collected (game won)
const SOUND_URLS = {
  correct: 'https://cdn.freesound.org/previews/341/341695_5858296-lq.mp3', // Ding sound for correct answer
  wrong: 'https://cdn.freesound.org/previews/142/142608_1840739-lq.mp3', // Gentle buzzer for wrong answer
  flip: 'https://cdn.freesound.org/previews/240/240776_4107740-lq.mp3', // Card flip sound when learning content shows
  win: 'https://cdn.freesound.org/previews/270/270402_5123851-lq.mp3', // Celebratory win chime
  collect: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3', // Reward collection sound
}

// Background music URLs (royalty-free from freesound.org / creative commons)
// Theme-specific uplifting, kid-friendly music that plays when Music toggle is ON
// Each theme has distinct music to enhance immersion and learning experience
// Music volume is set to 30% of overall volume (quieter than sound effects)
// Music auto-starts on first user interaction (click/touch) to comply with browser policies
const MUSIC_URLS = {
  panda: 'https://cdn.freesound.org/previews/457/457898_4166233-lq.mp3', // Peaceful bamboo forest vibe
  bunny: 'https://cdn.freesound.org/previews/457/457921_4166233-lq.mp3', // Bouncy, cheerful
  lion: 'https://cdn.freesound.org/previews/457/457908_4166233-lq.mp3', // Adventurous, bold
  monkey: 'https://cdn.freesound.org/previews/457/457925_4166233-lq.mp3', // Playful, energetic
}

export type SoundType = keyof typeof SOUND_URLS
export type MusicTheme = keyof typeof MUSIC_URLS

export function useAudio() {
  const soundRefs = useRef<Record<string, HTMLAudioElement>>({})
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const volumeRef = useRef(0.5)
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Initialize sounds
  useEffect(() => {
    // Pre-load sound effects
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url)
      audio.preload = 'auto'
      audio.volume = volumeRef.current
      soundRefs.current[key] = audio
    })

    return () => {
      // Cleanup
      Object.values(soundRefs.current).forEach(audio => {
        audio.pause()
        audio.src = ''
      })
      if (musicRef.current) {
        musicRef.current.pause()
        musicRef.current.src = ''
      }
      // Cancel any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const playSound = useCallback((type: SoundType) => {
    const audio = soundRefs.current[type]
    if (audio) {
      audio.currentTime = 0
      audio.volume = volumeRef.current
      audio.play().catch(() => {
        // Ignore autoplay errors
      })
    }
  }, [])

  const startMusic = useCallback((theme: MusicTheme) => {
    if (musicRef.current) {
      musicRef.current.pause()
    }
    
    const audio = new Audio(MUSIC_URLS[theme])
    audio.loop = true
    audio.volume = volumeRef.current * 0.3 // Music quieter than sfx
    audio.crossOrigin = 'anonymous'
    musicRef.current = audio
    
    // Try to play, with graceful fallback
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // User interaction required for autoplay - will be triggered on first interaction
      })
    }
  }, [])

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.pause()
      musicRef.current.currentTime = 0
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    volumeRef.current = volume / 100
    Object.values(soundRefs.current).forEach(audio => {
      audio.volume = volumeRef.current
    })
    if (musicRef.current) {
      musicRef.current.volume = volumeRef.current * 0.3
    }
  }, [])

  // Text-to-speech for reading learning content aloud
  const speakText = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.85 // Slower for kids
      utterance.pitch = 1.2 // Slightly higher pitch for friendlier tone
      utterance.volume = volumeRef.current
      
      // Try to get a child-friendly voice
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(
        v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google')
      )
      if (preferredVoice) {
        utterance.voice = preferredVoice
      }
      
      speechSynthRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }, [])

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  return {
    playSound,
    startMusic,
    stopMusic,
    setVolume,
    speakText,
    stopSpeaking,
  }
}

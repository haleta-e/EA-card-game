# Audio & Music System - EA Card Game

## Overview
The game now features a comprehensive audio system designed for kids, with theme-specific music, sound effects for game events, and text-to-speech learning content.

## Features Implemented

### 1. Theme-Specific Background Music
Each of the 4 game themes has its own unique background music track:

- **Panda** 🐼 - Peaceful bamboo forest vibe (zen, calming)
- **Bunny** 🐰 - Bouncy, cheerful music (energetic, fun)
- **Lion** 🦁 - Adventurous, bold music (heroic, exciting)
- **Monkey** 🐵 - Playful, energetic music (silly, joyful)

**How it works:**
- Background music is controlled via the "Music" toggle button in Settings
- Music volume is set to 30% of the master volume (quieter than sound effects)
- Music automatically loops and changes when you switch themes
- First user interaction (click/touch) triggers music playback (browser autoplay policy compliance)

### 2. Audio Cues (Sound Effects)
The game includes sound effects at key moments:

| Event | Sound | Trigger |
|-------|-------|---------|
| **Card Flip** | Card flip sound | When correct card is selected and learning content is revealed |
| **Wrong Answer** | Gentle buzzer | When user selects an incorrect card |
| **Card Collection** | Reward sound | When card is collected after learning content display |
| **Game Won** | Celebratory chime | When all 15 cards are collected |

**How it works:**
- Sound effects are controlled via the "SFX" toggle button in Settings
- Sound volume responds to the master Volume slider (0-100%)
- All sounds are pre-loaded on startup for instant playback

### 3. Volume Control
A unified volume control slider (0-100%) that adjusts:
- All sound effects (SFX)
- Background music
- Text-to-speech speech volume

**How it works:**
- Located in Settings panel under "Sound & Music"
- Slider is disabled when both SFX and Music are turned off
- Volume percentage is displayed next to the slider

### 4. Text-to-Speech Learning Content
When a card is revealed with correct answer, the learning content is spoken aloud with:
- Slower speech rate (0.85x) for child-friendly pacing
- Slightly higher pitch (1.2x) for friendlier tone
- Automatic voice selection (prefers Female/Samantha/Google voices)
- Volume respects master volume setting

## Settings Panel Controls

```
Sound & Music Section:
┌─────────────────────────────────┐
│ [SFX Toggle] [Music Toggle]     │
│ └── Volume Slider ────── 50% ──┘
└─────────────────────────────────┘
```

- **SFX Toggle**: Enable/disable all sound effects
- **Music Toggle**: Enable/disable background music
- **Volume Slider**: Master volume (0-100%)

## Technical Details

### Audio Hook Location
- File: `/hooks/use-audio.ts`
- Hook: `useAudio()`
- Exports: `playSound()`, `startMusic()`, `stopMusic()`, `setVolume()`, `speakText()`, `stopSpeaking()`

### Game Integration
- File: `/components/game/card-game.tsx`
- Audio is initialized on component mount
- Music starts on first user interaction (handleUserInteraction)
- Sound effects triggered in card click handler and win condition

### Sound URLs
All audio is sourced from freesound.org (Creative Commons licensed):
- Sound effects: 5 unique audio cues
- Music tracks: 4 theme-specific tracks

## Browser Compatibility

✅ Works on:
- Chrome, Firefox, Safari, Edge (modern versions)
- Desktop and mobile browsers
- Respects browser autoplay policies

⚠️ Notes:
- Autoplay requires user interaction first (click/touch on game)
- Some browsers may require user permission for audio playback
- Speech synthesis may vary by device/browser

## Future Enhancement Opportunities

- Add sound effects for card collection animation
- Add theme-specific victory fanfares
- Add audio settings for difficulty selection
- Add audio feedback for streak milestones
- Add option to hear learning content pronunciation before answering

## Accessibility

- Volume control available for hearing-impaired players
- SFX and Music can be toggled independently
- Text-to-speech uses child-friendly voices and pacing
- No audio is required to play - all controls can be toggled off

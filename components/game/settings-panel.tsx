'use client'

import { Theme, Level, LessonPack, themes, lessonPacks } from '@/lib/game-data'
import { cn } from '@/lib/utils'
import { X, Volume2, VolumeX, HelpCircle, RotateCcw, Moon, Sun, Flame } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
  theme: Theme
  level: Level
  lessonPack: LessonPack
  musicEnabled: boolean
  soundEnabled: boolean
  volume: number
  nightMode: boolean
  streak: number
  onThemeChange: (theme: Theme) => void
  onLevelChange: (level: Level) => void
  onLessonPackChange: (pack: LessonPack) => void
  onMusicToggle: () => void
  onSoundToggle: () => void
  onVolumeChange: (volume: number) => void
  onNightModeToggle: () => void
  onResetProgress: () => void
  onHowToPlay: () => void
}

export function SettingsPanel({
  isOpen,
  onClose,
  theme,
  level,
  lessonPack,
  musicEnabled,
  soundEnabled,
  volume,
  nightMode,
  streak,
  onThemeChange,
  onLevelChange,
  onLessonPackChange,
  onMusicToggle,
  onSoundToggle,
  onVolumeChange,
  onNightModeToggle,
  onResetProgress,
  onHowToPlay,
}: SettingsPanelProps) {
  if (!isOpen) return null

  const themeOptions: Theme[] = ['panda', 'bunny', 'lion', 'monkey']
  const levelOptions: { value: Level; label: string }[] = [
    { value: 'easy', label: 'Easy' },
    { value: 'normal', label: 'Normal' },
    { value: 'hard', label: 'Hard' },
  ]
  const lessonPackOptions: LessonPack[] = ['mixed', 'letters', 'colors', 'shapes', 'animals', 'numbers', 'math', 'vocabulary', 'opposites', 'concepts']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className={cn(
        "relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 animate-scale-in max-h-[90vh] overflow-y-auto",
        nightMode && "bg-[#1a1a2e] text-white"
      )}>
        <button
          onClick={onClose}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors",
            nightMode && "hover:bg-gray-700"
          )}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-center">Settings</h2>

        {/* Streak Display */}
        {streak > 0 && (
          <div className={cn(
            "flex items-center justify-center gap-2 p-3 rounded-xl",
            nightMode ? "bg-gray-800" : "bg-orange-50"
          )}>
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-orange-600">{streak} Day Streak!</span>
            <div className="flex gap-0.5">
              {[...Array(Math.min(streak, 7))].map((_, i) => (
                <span key={i} className="text-yellow-400">*</span>
              ))}
            </div>
          </div>
        )}

        {/* Theme Selector */}
        <div className="space-y-2">
          <label className={cn(
            "text-sm font-medium",
            nightMode ? "text-gray-300" : "text-gray-700"
          )}>Choose Theme</label>
          <div className="grid grid-cols-4 gap-2">
            {themeOptions.map((t) => (
              <button
                key={t}
                onClick={() => onThemeChange(t)}
                className={cn(
                  'flex flex-col items-center gap-1 p-3 rounded-xl transition-all',
                  theme === t
                    ? 'ring-2 ring-offset-2 scale-105'
                    : nightMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                )}
                style={{
                  background: theme === t ? `${themes[t].primaryColor}20` : undefined,
                  ringColor: theme === t ? themes[t].primaryColor : undefined,
                }}
              >
                <span className="text-3xl">{themes[t].icon}</span>
                <span className={cn(
                  "text-xs font-medium",
                  nightMode && theme !== t && "text-gray-300"
                )}>{themes[t].name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lesson Pack Selector */}
        <div className="space-y-2">
          <label className={cn(
            "text-sm font-medium",
            nightMode ? "text-gray-300" : "text-gray-700"
          )}>Lesson Pack</label>
          <div className="grid grid-cols-5 gap-1.5 max-h-40 overflow-y-auto">
            {lessonPackOptions.map((pack) => (
              <button
                key={pack}
                onClick={() => onLessonPackChange(pack)}
                className={cn(
                  'flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all text-xs',
                  lessonPack === pack
                    ? 'text-white scale-105 shadow-lg'
                    : nightMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
                style={{
                  background: lessonPack === pack ? themes[theme].primaryColor : undefined,
                }}
              >
                <span className="text-base">{lessonPacks[pack].icon}</span>
                <span className="font-medium text-[10px] text-center leading-tight">{lessonPacks[pack].name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Level Selector */}
        <div className="space-y-2">
          <label className={cn(
            "text-sm font-medium",
            nightMode ? "text-gray-300" : "text-gray-700"
          )}>Difficulty Level</label>
          <div className="flex gap-2">
            {levelOptions.map((l) => (
              <button
                key={l.value}
                onClick={() => onLevelChange(l.value)}
                className={cn(
                  'flex-1 py-2 px-4 rounded-xl font-medium transition-all',
                  level === l.value
                    ? 'text-white scale-105 shadow-lg'
                    : nightMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
                style={{
                  background: level === l.value ? themes[theme].primaryColor : undefined,
                }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sound Controls */}
        <div className="space-y-3">
          <label className={cn(
            "text-sm font-medium",
            nightMode ? "text-gray-300" : "text-gray-700"
          )}>Sound & Music</label>
          
          <div className="flex items-center gap-3">
            {/* Sound Effects Toggle */}
            <button
              onClick={onSoundToggle}
              className={cn(
                'p-2 rounded-xl transition-all flex items-center gap-2 text-sm',
                soundEnabled
                  ? 'text-white'
                  : nightMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
              )}
              style={{
                background: soundEnabled ? themes[theme].primaryColor : undefined,
              }}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              SFX
            </button>
            
            {/* Music Toggle */}
            <button
              onClick={onMusicToggle}
              className={cn(
                'p-2 rounded-xl transition-all flex items-center gap-2 text-sm',
                musicEnabled
                  ? 'text-white'
                  : nightMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
              )}
              style={{
                background: musicEnabled ? themes[theme].primaryColor : undefined,
              }}
            >
              {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              Music
            </button>
            
            {/* Volume Slider */}
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => onVolumeChange(parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-current"
              style={{ accentColor: themes[theme].primaryColor }}
              disabled={!soundEnabled && !musicEnabled}
            />
            <span className={cn(
              "text-sm w-10",
              nightMode ? "text-gray-400" : "text-gray-500"
            )}>{volume}%</span>
          </div>
        </div>

        {/* Night Mode Toggle */}
        <div className="flex items-center justify-between">
          <label className={cn(
            "text-sm font-medium",
            nightMode ? "text-gray-300" : "text-gray-700"
          )}>Night Mode (Low Contrast)</label>
          <button
            onClick={onNightModeToggle}
            className={cn(
              'p-3 rounded-xl transition-all',
              nightMode
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700'
            )}
          >
            {nightMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={onHowToPlay}
            variant="outline"
            className={cn(
              "flex-1 gap-2",
              nightMode && "border-gray-600 text-gray-200 hover:bg-gray-700"
            )}
          >
            <HelpCircle className="w-4 h-4" />
            How to Play
          </Button>
          <Button
            onClick={onResetProgress}
            variant="outline"
            className={cn(
              "flex-1 gap-2 text-red-500 border-red-200 hover:bg-red-50",
              nightMode && "border-red-800 hover:bg-red-900/30"
            )}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

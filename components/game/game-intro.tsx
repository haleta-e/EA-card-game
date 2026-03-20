'use client'

interface GameIntroProps {
  onStart: () => void
}

export function GameIntro({ onStart }: GameIntroProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 flex items-center justify-center p-4">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-200 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-200 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* Title with emoji */}
        <div className="mb-8">
          <div className="text-8xl mb-6 animate-bounce">🎮</div>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-800 mb-4 leading-tight">
            EA CARD GAME
          </h1>
          <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
            FOR KIDS
          </p>
        </div>

        {/* Description */}
        <div className="mb-12 space-y-4">
          <p className="text-xl text-gray-700 font-medium">
            Learn while you play!
          </p>
          <div className="flex justify-center gap-6 text-5xl">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>🐼</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🐰</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>🦁</span>
            <span className="animate-bounce" style={{ animationDelay: '0.6s' }}>🐵</span>
          </div>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Choose your favorite theme and collect cards while learning letters, colors, shapes, animals, numbers, and more!
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="bg-white bg-opacity-80 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl mb-2">🎨</div>
            <p className="text-sm font-semibold text-gray-700">4 Themes</p>
          </div>
          <div className="bg-white bg-opacity-80 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl mb-2">📚</div>
            <p className="text-sm font-semibold text-gray-700">Learning</p>
          </div>
          <div className="bg-white bg-opacity-80 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl mb-2">🎵</div>
            <p className="text-sm font-semibold text-gray-700">Music</p>
          </div>
          <div className="bg-white bg-opacity-80 rounded-lg p-4 backdrop-blur">
            <div className="text-3xl mb-2">✨</div>
            <p className="text-sm font-semibold text-gray-700">Fun</p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-12 rounded-full text-xl sm:text-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Start Playing!
        </button>

        {/* Small text */}
        <p className="text-sm text-gray-600 mt-8">
          Safe, fun learning for kids of all ages
        </p>
      </div>
    </div>
  )
}

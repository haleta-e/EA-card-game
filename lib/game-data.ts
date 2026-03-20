// Game data and types for the Kids Learning Card Game

export type Theme = 'panda' | 'bunny' | 'lion' | 'monkey'
export type Level = 'easy' | 'normal' | 'hard'

export interface ThemeConfig {
  name: string
  icon: string
  reward: string
  background: string
  cardFront: string
  cardBack: string
  primaryColor: string
  secondaryColor: string
}

export interface Card {
  id: number
  value: string
  suit: string
  suitSymbol: string
  color: 'red' | 'black'
  numericValue: number
  learningContent: LearningContent
  isFlipped: boolean
  isCollected: boolean
  isCorrect: boolean
}

export interface LearningContent {
  text: string
  icon?: string
  subIcon?: string // For hard level combined concepts
  type: 'letter' | 'color' | 'shape' | 'animal' | 'word' | 'concept'
}

export interface Question {
  text: string
  checkAnswer: (card: Card) => boolean
}

export type LessonPack = 'mixed' | 'letters' | 'colors' | 'shapes' | 'animals' | 'numbers' | 'math' | 'vocabulary' | 'opposites' | 'concepts'

export const lessonPacks: Record<LessonPack, { name: string; icon: string }> = {
  mixed: { name: 'Mixed', icon: '🎲' },
  letters: { name: 'Letters', icon: '🔤' },
  colors: { name: 'Colors', icon: '🌈' },
  shapes: { name: 'Shapes', icon: '🔷' },
  animals: { name: 'Animals', icon: '🐾' },
  numbers: { name: 'Numbers', icon: '🔢' },
  math: { name: 'Math', icon: '➕' },
  vocabulary: { name: 'Vocabulary', icon: '📚' },
  opposites: { name: 'Opposites', icon: '⬌' },
  concepts: { name: 'Concepts', icon: '💡' },
}

export const themes: Record<Theme, ThemeConfig> = {
  panda: {
    name: 'Panda',
    icon: '🐼',
    reward: '🎋',
    background: 'https://i.pinimg.com/736x/d0/07/04/d007043d0e0ebec1d95b1d5b03bb1b7.jpg',
    cardFront: 'https://i.pinimg.com/1200x/49/57/2c/49572cf1e0d41fd0f9a20e9621dcd8ac.jpg',
    cardBack: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    primaryColor: '#22c55e',
    secondaryColor: '#4ade80',
  },
  bunny: {
    name: 'Bunny',
    icon: '🐰',
    reward: '🥕',
    background: 'https://i.pinimg.com/1200x/55/3a/df/553adf7b825520fe78864ab77652a90e.jpg',
    cardFront: 'https://i.pinimg.com/1200x/11/a0/b0/11a0b0f94d3697eee743f1a2629a70f9.jpg',
    cardBack: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
    primaryColor: '#ec4899',
    secondaryColor: '#f472b6',
  },
  lion: {
    name: 'Lion',
    icon: '🦁',
    reward: '🍖',
    background: 'https://i.pinimg.com/1200x/31/dd/21/31dd21e249432596d774a070d83dd35e.jpg',
    cardFront: 'https://i.pinimg.com/736x/50/89/9e/50899e1a1b40380d27ada6c7ebb50d7b.jpg',
    cardBack: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24',
  },
  monkey: {
    name: 'Monkey',
    icon: '🐵',
    reward: '🍌',
    background: 'https://i.pinimg.com/736x/23/cf/16/23cf164333f53ecec08133fed7fcae2c.jpg',
    cardFront: 'https://i.pinimg.com/736x/2e/ba/a6/2ebaa60eca4d2d8fcbe2fd3fe82c06d9.jpg',
    cardBack: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
    primaryColor: '#8b5cf6',
    secondaryColor: '#a78bfa',
  },
}

// Learning content pools
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const colors = [
  { text: 'Red', icon: '🔴' },
  { text: 'Blue', icon: '🔵' },
  { text: 'Green', icon: '🟢' },
  { text: 'Yellow', icon: '🟡' },
  { text: 'Orange', icon: '🟠' },
  { text: 'Purple', icon: '🟣' },
  { text: 'Pink', icon: '💗' },
  { text: 'Brown', icon: '🟤' },
]
const shapes = [
  { text: 'Circle', icon: '⚪' },
  { text: 'Square', icon: '🟧' },
  { text: 'Triangle', icon: '🔺' },
  { text: 'Star', icon: '⭐' },
  { text: 'Heart', icon: '❤️' },
  { text: 'Diamond', icon: '💎' },
  { text: 'Rectangle', icon: '▬' },
  { text: 'Oval', icon: '🥚' },
]
const animals = [
  { text: 'Cat', icon: '🐱' },
  { text: 'Dog', icon: '🐶' },
  { text: 'Bird', icon: '🐦' },
  { text: 'Fish', icon: '🐟' },
  { text: 'Elephant', icon: '🐘' },
  { text: 'Tiger', icon: '🐯' },
  { text: 'Monkey', icon: '🐵' },
  { text: 'Rabbit', icon: '🐰' },
  { text: 'Lion', icon: '🦁' },
  { text: 'Bear', icon: '🐻' },
]
const numbers = [
  { text: 'One (1)', icon: '1️⃣' },
  { text: 'Two (2)', icon: '2️⃣' },
  { text: 'Three (3)', icon: '3️⃣' },
  { text: 'Four (4)', icon: '4️⃣' },
  { text: 'Five (5)', icon: '5️⃣' },
  { text: 'Six (6)', icon: '6️⃣' },
  { text: 'Seven (7)', icon: '7️⃣' },
  { text: 'Eight (8)', icon: '8️⃣' },
  { text: 'Nine (9)', icon: '9️⃣' },
  { text: 'Ten (10)', icon: '🔟' },
]

const normalContent = [
  { text: 'A for Apple', icon: '🍎', type: 'word' as const },
  { text: 'B for Ball', icon: '⚽', type: 'word' as const },
  { text: 'C for Cat', icon: '🐱', type: 'word' as const },
  { text: 'D for Dog', icon: '🐶', type: 'word' as const },
  { text: 'E for Egg', icon: '🥚', type: 'word' as const },
  { text: 'F for Fish', icon: '🐟', type: 'word' as const },
  { text: 'Red Apple', icon: '🍎', type: 'concept' as const },
  { text: 'Yellow Sun', icon: '☀️', type: 'concept' as const },
  { text: 'Blue Sky', icon: '🌤️', type: 'concept' as const },
  { text: 'Green Tree', icon: '🌳', type: 'concept' as const },
  { text: 'Circle Moon', icon: '🌙', type: 'concept' as const },
  { text: 'Star Bright', icon: '⭐', type: 'concept' as const },
  { text: 'Happy Lion', icon: '🦁', type: 'concept' as const },
  { text: 'Tall Giraffe', icon: '🦒', type: 'concept' as const },
  { text: 'Fast Rabbit', icon: '🐰', type: 'concept' as const },
  { text: 'Big Elephant', icon: '🐘', type: 'concept' as const },
  { text: 'Little Mouse', icon: '🐭', type: 'concept' as const },
]

// Math content
const mathContent = [
  { text: '1 + 1 = 2', icon: '🔢', type: 'concept' as const },
  { text: '2 + 2 = 4', icon: '🔢', type: 'concept' as const },
  { text: '3 + 1 = 4', icon: '🔢', type: 'concept' as const },
  { text: '2 + 1 = 3', icon: '🔢', type: 'concept' as const },
  { text: '5 - 1 = 4', icon: '➖', type: 'concept' as const },
  { text: '3 - 1 = 2', icon: '➖', type: 'concept' as const },
]

// Vocabulary content
const vocabularyContent = [
  { text: 'Jump', icon: '🦘', type: 'word' as const },
  { text: 'Sleep', icon: '😴', type: 'word' as const },
  { text: 'Eat', icon: '🍽️', type: 'word' as const },
  { text: 'Play', icon: '🎮', type: 'word' as const },
  { text: 'Run', icon: '🏃', type: 'word' as const },
  { text: 'Sing', icon: '🎵', type: 'word' as const },
  { text: 'Dance', icon: '💃', type: 'word' as const },
  { text: 'Read', icon: '📖', type: 'word' as const },
]

// Opposites content
const oppositesContent = [
  { text: 'Big & Small', icon: '🐘', type: 'concept' as const, subIcon: '🐁' },
  { text: 'Hot & Cold', icon: '🔥', type: 'concept' as const, subIcon: '❄️' },
  { text: 'Happy & Sad', icon: '😊', type: 'concept' as const, subIcon: '😢' },
  { text: 'Fast & Slow', icon: '🐇', type: 'concept' as const, subIcon: '🐢' },
  { text: 'Up & Down', icon: '⬆️', type: 'concept' as const, subIcon: '⬇️' },
  { text: 'Light & Dark', icon: '☀️', type: 'concept' as const, subIcon: '🌙' },
]

// Matching concepts content
const conceptsContent = [
  { text: 'Square + Blue', icon: '🔵', type: 'concept' as const, subIcon: '⬛' },
  { text: 'Triangle + Red', icon: '🔴', type: 'concept' as const, subIcon: '🔺' },
  { text: 'Circle + Yellow', icon: '🟡', type: 'concept' as const, subIcon: '⭕' },
  { text: 'Heart + Pink', icon: '💗', type: 'concept' as const, subIcon: '💖' },
  { text: 'Star + Gold', icon: '⭐', type: 'concept' as const, subIcon: '✨' },
  { text: 'Diamond + Purple', icon: '🟪', type: 'concept' as const, subIcon: '💎' },
]

// Hard content with multiple concepts combined
const hardContent = [
  { text: 'Red + Triangle', icon: '🔺', type: 'concept' as const, subIcon: '🔴' },
  { text: 'Blue + Circle', icon: '🔵', type: 'concept' as const, subIcon: '⚪' },
  { text: 'Yellow + Star', icon: '⭐', type: 'concept' as const, subIcon: '🟡' },
  { text: 'Green + Square', icon: '🟩', type: 'concept' as const, subIcon: '🟢' },
  { text: 'A + Apple', icon: '🍎', type: 'concept' as const, subIcon: '🔤' },
  { text: 'B + Bear', icon: '🐻', type: 'concept' as const, subIcon: '🔤' },
  { text: '3 + Three', icon: '3️⃣', type: 'concept' as const, subIcon: '🔢' },
  { text: '5 + Five', icon: '5️⃣', type: 'concept' as const, subIcon: '🖐️' },
  { text: 'Dog says Woof!', icon: '🐶', type: 'concept' as const },
  { text: 'Cat says Meow!', icon: '🐱', type: 'concept' as const },
  { text: 'Birds can fly', icon: '🐦', type: 'concept' as const },
  { text: 'Fish can swim', icon: '🐟', type: 'concept' as const },
  { text: '1 + 1 = 2', icon: '🔢', type: 'concept' as const },
  { text: '2 + 2 = 4', icon: '🔢', type: 'concept' as const },
  { text: 'Triangle has 3 sides', icon: '🔺', type: 'concept' as const },
]

// Anti-repetition tracking - prevent duplicate content
const recentContent = new Map<string, string[]>()

function getContentPool(pack: LessonPack): Array<{ text: string; icon: string; type: string; subIcon?: string }> {
  switch (pack) {
    case 'letters':
      return letters.map(l => ({ text: l, icon: '🔤', type: 'letter' }))
    case 'colors':
      return colors.map(c => ({ text: c.text, icon: c.icon, type: 'color' }))
    case 'shapes':
      return shapes.map(s => ({ text: s.text, icon: s.icon, type: 'shape' }))
    case 'animals':
      return animals.map(a => ({ text: a.text, icon: a.icon, type: 'animal' }))
    case 'numbers':
      return numbers.map(n => ({ text: n.text, icon: n.icon, type: 'concept' }))
    case 'math':
      return mathContent
    case 'vocabulary':
      return vocabularyContent
    case 'opposites':
      return oppositesContent
    case 'concepts':
      return conceptsContent
    case 'mixed':
    default:
      return []
  }
}

function getRandomWithAntiRepetition(pool: Array<any>, packKey: string, maxRecent: number = 5): any {
  if (!recentContent.has(packKey)) {
    recentContent.set(packKey, [])
  }
  
  const recent = recentContent.get(packKey) || []
  const available = pool.filter(item => !recent.includes(item.text))
  
  const item = available.length > 0 
    ? available[Math.floor(Math.random() * available.length)]
    : pool[Math.floor(Math.random() * pool.length)]
  
  // Update recent tracking
  recent.unshift(item.text)
  if (recent.length > maxRecent) recent.pop()
  recentContent.set(packKey, recent)
  
  return item
}

export function getRandomLearningContent(level: Level, lessonPack: LessonPack = 'mixed'): LearningContent {
  // For specific lesson packs, always use that content
  if (lessonPack !== 'mixed') {
    const pool = getContentPool(lessonPack)
    if (pool.length > 0) {
      const item = getRandomWithAntiRepetition(pool, lessonPack)
      return { text: item.text, icon: item.icon, type: item.type as any, subIcon: item.subIcon }
    }
  }

  // Mixed content based on level with anti-repetition
  if (level === 'easy') {
    const packs: LessonPack[] = ['letters', 'colors', 'shapes', 'animals', 'numbers']
    const selectedPack = packs[Math.floor(Math.random() * packs.length)]
    const pool = getContentPool(selectedPack)
    const item = getRandomWithAntiRepetition(pool, `easy-${selectedPack}`)
    return { text: item.text, icon: item.icon, type: item.type as any, subIcon: item.subIcon }
  } else if (level === 'normal') {
    const content = getRandomWithAntiRepetition(normalContent, 'normal')
    return { text: content.text, icon: content.icon, type: content.type, subIcon: content.subIcon }
  } else {
    // Hard level - multiple concepts
    const content = getRandomWithAntiRepetition(hardContent, 'hard')
    return { text: content.text, icon: content.icon, type: content.type, subIcon: content.subIcon }
  }
}

const suits = [
  { name: 'hearts', symbol: '♥', color: 'red' as const },
  { name: 'diamonds', symbol: '♦', color: 'red' as const },
  { name: 'clubs', symbol: '♣', color: 'black' as const },
  { name: 'spades', symbol: '♠', color: 'black' as const },
]

const values = [
  { display: 'A', numeric: 1 },
  { display: '2', numeric: 2 },
  { display: '3', numeric: 3 },
  { display: '4', numeric: 4 },
  { display: '5', numeric: 5 },
  { display: '6', numeric: 6 },
  { display: '7', numeric: 7 },
  { display: '8', numeric: 8 },
  { display: '9', numeric: 9 },
  { display: '10', numeric: 10 },
  { display: 'J', numeric: 11 },
  { display: 'Q', numeric: 12 },
  { display: 'K', numeric: 13 },
]

export function generateDeck(level: Level, lessonPack: LessonPack = 'mixed'): Card[] {
  const fullDeck: Card[] = []
  let id = 0
  
  for (const suit of suits) {
    for (const value of values) {
      fullDeck.push({
        id: id++,
        value: value.display,
        suit: suit.name,
        suitSymbol: suit.symbol,
        color: suit.color,
        numericValue: value.numeric,
        learningContent: getRandomLearningContent(level, lessonPack),
        isFlipped: false,
        isCollected: false,
        isCorrect: false,
      })
    }
  }
  
  // Shuffle and pick 15 cards
  const shuffled = fullDeck.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 15)
}

// Question generators based on level
export function generateQuestion(cards: Card[], level: Level, collectedIds: number[]): Question {
  const availableCards = cards.filter(c => !collectedIds.includes(c.id))
  if (availableCards.length === 0) {
    return { text: 'You won!', checkAnswer: () => false }
  }
  
  const targetCard = availableCards[Math.floor(Math.random() * availableCards.length)]
  
  if (level === 'easy') {
    const questionTypes = [
      {
        text: `Find the ${targetCard.color} ${targetCard.suitSymbol} ${targetCard.value}`,
        check: (card: Card) => card.id === targetCard.id,
      },
      {
        text: `Click the ${targetCard.value} of ${targetCard.suit}`,
        check: (card: Card) => card.id === targetCard.id,
      },
      {
        text: `Where is the ${targetCard.color} ${targetCard.value}?`,
        check: (card: Card) => card.color === targetCard.color && card.value === targetCard.value,
      },
    ]
    const q = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    return { text: q.text, checkAnswer: (card) => q.check(card) && !collectedIds.includes(card.id) }
  }
  
  if (level === 'normal') {
    const questionTypes = [
      {
        text: `Find a ${targetCard.color} card`,
        check: (card: Card) => card.color === targetCard.color,
      },
      {
        text: `Click any ${targetCard.suit.slice(0, -1)}`,
        check: (card: Card) => card.suit === targetCard.suit,
      },
      {
        text: `Find a card ${targetCard.numericValue >= 7 ? 'greater than 6' : 'less than 7'}`,
        check: (card: Card) => targetCard.numericValue >= 7 ? card.numericValue > 6 : card.numericValue < 7,
      },
      {
        text: `Click a ${targetCard.color} ${targetCard.numericValue > 10 ? 'face card' : 'number card'}`,
        check: (card: Card) => card.color === targetCard.color && (targetCard.numericValue > 10 ? card.numericValue > 10 : card.numericValue <= 10),
      },
    ]
    const q = questionTypes[Math.floor(Math.random() * questionTypes.length)]
    return { text: q.text, checkAnswer: (card) => q.check(card) && !collectedIds.includes(card.id) }
  }
  
  // Hard level
  const questionTypes = [
    {
      text: `Find a ${targetCard.color} card greater than ${Math.max(1, targetCard.numericValue - 3)}`,
      check: (card: Card) => card.color === targetCard.color && card.numericValue > Math.max(1, targetCard.numericValue - 3),
    },
    {
      text: `Click a ${targetCard.color} card less than ${Math.min(13, targetCard.numericValue + 3)}`,
      check: (card: Card) => card.color === targetCard.color && card.numericValue < Math.min(13, targetCard.numericValue + 3),
    },
    {
      text: `Find a ${targetCard.suit.slice(0, -1)} between 2 and 10`,
      check: (card: Card) => card.suit === targetCard.suit && card.numericValue >= 2 && card.numericValue <= 10,
    },
    {
      text: `Click any ${targetCard.color} face card (J, Q, K)`,
      check: (card: Card) => card.color === targetCard.color && card.numericValue > 10,
    },
  ]
  const q = questionTypes[Math.floor(Math.random() * questionTypes.length)]
  return { text: q.text, checkAnswer: (card) => q.check(card) && !collectedIds.includes(card.id) }
}

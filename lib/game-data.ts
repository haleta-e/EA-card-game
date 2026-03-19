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

export type LessonPack = 'mixed' | 'letters' | 'colors' | 'shapes' | 'animals' | 'numbers'

export const lessonPacks: Record<LessonPack, { name: string; icon: string }> = {
  mixed: { name: 'Mixed', icon: '🎲' },
  letters: { name: 'Letters', icon: '🔤' },
  colors: { name: 'Colors', icon: '🌈' },
  shapes: { name: 'Shapes', icon: '🔷' },
  animals: { name: 'Animals', icon: '🐾' },
  numbers: { name: 'Numbers', icon: '🔢' },
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

export function getRandomLearningContent(level: Level, lessonPack: LessonPack = 'mixed'): LearningContent {
  // For specific lesson packs, always use that content
  if (lessonPack !== 'mixed') {
    switch (lessonPack) {
      case 'letters': {
        const letter = letters[Math.floor(Math.random() * letters.length)]
        return { text: letter, icon: '🔤', type: 'letter' }
      }
      case 'colors': {
        const color = colors[Math.floor(Math.random() * colors.length)]
        return { text: color.text, icon: color.icon, type: 'color' }
      }
      case 'shapes': {
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
        return { text: shape.text, icon: shape.icon, type: 'shape' }
      }
      case 'animals': {
        const animal = animals[Math.floor(Math.random() * animals.length)]
        return { text: animal.text, icon: animal.icon, type: 'animal' }
      }
      case 'numbers': {
        const num = numbers[Math.floor(Math.random() * numbers.length)]
        return { text: num.text, icon: num.icon, type: 'concept' }
      }
    }
  }

  // Mixed content based on level
  if (level === 'easy') {
    const contentType = Math.floor(Math.random() * 5)
    if (contentType === 0) {
      const letter = letters[Math.floor(Math.random() * letters.length)]
      return { text: letter, icon: '🔤', type: 'letter' }
    } else if (contentType === 1) {
      const color = colors[Math.floor(Math.random() * colors.length)]
      return { text: color.text, icon: color.icon, type: 'color' }
    } else if (contentType === 2) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)]
      return { text: shape.text, icon: shape.icon, type: 'shape' }
    } else if (contentType === 3) {
      const animal = animals[Math.floor(Math.random() * animals.length)]
      return { text: animal.text, icon: animal.icon, type: 'animal' }
    } else {
      const num = numbers[Math.floor(Math.random() * numbers.length)]
      return { text: num.text, icon: num.icon, type: 'concept' }
    }
  } else if (level === 'normal') {
    const content = normalContent[Math.floor(Math.random() * normalContent.length)]
    return { text: content.text, icon: content.icon, type: content.type }
  } else {
    // Hard level - multiple concepts
    const content = hardContent[Math.floor(Math.random() * hardContent.length)]
    return { text: content.text, icon: content.icon, type: content.type }
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

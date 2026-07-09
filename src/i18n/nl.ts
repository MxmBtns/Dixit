/**
 * All copy in one place, so translating later stays easy.
 */
export const t = {
  appName: 'Dixit',
  tagline: 'One hint. A hundred interpretations',
  subTagline: 'Dare to think differently',

  home: {
    passAndPlay: 'One device – pass and play',
    hostRoom: 'Host a room',
    joinRoom: 'Join with a room code',
    howToPlay: 'How to play',
  },

  hostRoom: {
    title: 'Host a room',
    subtitle: 'Create a room and share the code so your friends can join.',
    namePlaceholder: 'Your name',
    roomCodeLabel: 'Room code',
    create: 'Create room',
    newCode: 'New code',
    waiting: 'Waiting for players to join…',
    notReady:
      'Online play needs a Firebase configuration, so syncing between phones is not active yet. ' +
      'You can already generate and share a room code — see the README to switch it on.',
    startAnyway: 'Play on one device instead',
    back: 'Back',
  },

  joinRoom: {
    title: 'Join a room',
    subtitle: 'Enter the room code your host shared with you.',
    namePlaceholder: 'Your name',
    codePlaceholder: 'ABCD',
    join: 'Join room',
    invalidCode: 'A room code is four letters, like ABCD.',
    notReady:
      'Online play needs a Firebase configuration, so joining is not active yet. ' +
      'See the README to switch it on.',
    back: 'Back',
  },

  howToPlay: {
    title: 'How to play',
    intro:
      'Dixit is a game of hints and imagination for 3 to 10 players. Each round one player is the ' +
      'storyteller; everyone else tries to blend in and to read the storyteller’s mind.',
    steps: [
      {
        title: '1. The storyteller gives a hint',
        text: 'The storyteller secretly picks one card from their hand and gives a clue: a word, a sentence, a sound, a memory — anything that fits the picture.',
      },
      {
        title: '2. Everyone plays a matching card',
        text: 'The other players choose a card from their own hand that could also fit the hint. All chosen cards are shuffled together with the storyteller’s.',
      },
      {
        title: '3. Everyone votes',
        text: 'The cards are revealed on the table. Everyone except the storyteller votes for the card they think was the storyteller’s.',
      },
      {
        title: '4. Scoring',
        text: 'If everyone — or no one — finds the storyteller’s card, the storyteller scores nothing and the others get points. Otherwise the storyteller and everyone who guessed right score. You also earn a point for every vote your card lures.',
      },
      {
        title: '5. Winning',
        text: 'Play continues round after round. The player with the most points when the target score or round limit is reached wins.',
      },
    ],
    back: 'Back',
  },

  lobby: {
    title: 'New game',
    playersHeading: 'Players',
    namePlaceholder: 'Player name',
    addPlayer: 'Add player',
    needPlayers: (min: number) => `At least ${min} players needed.`,
    maxPlayers: (max: number) => `At most ${max} players.`,
    mode: 'Game mode',
    modeClassic: 'Classic',
    modeBlitz: 'Blitz',
    modeClassicHint: 'Up to 30 points or 5 rounds',
    modeBlitzHint: 'Shorter and faster',
    category: 'Word category',
    categoryHint: 'Keep it random across everything, or lock the game to one theme.',
    categoryRandom: 'Random (all)',
    categoryFantasy: 'Fantasy & Fiction',
    categoryMoreSoon: 'More soon…',
    start: 'Start game',
  },

  handoff: {
    passTo: (name: string) => `Pass the phone to ${name}`,
    storytellerNote: 'is the storyteller this round',
    chooseNote: 'picks a card for the hint',
    voteNote: 'votes on the storyteller’s card',
    ready: (name: string) => `I’m ${name}`,
  },

  clue: {
    youAreStoryteller: 'You are the storyteller',
    instruction: 'Pick a card and give a hint: a word, a sentence, a memory…',
    cluePlaceholder: 'For example: “The last train home”',
    submit: 'Play the card and share the hint',
  },

  submit: {
    theClueIs: 'The storyteller’s hint',
    instruction: 'Pick the card from your hand that fits it best.',
    submit: 'Put this card on the table',
    waiting: 'The others are still picking a card…',
  },

  voting: {
    instruction: 'Which card is the storyteller’s?',
    ownCardNote: 'Your own card is marked; you can’t vote for it.',
    yourCard: 'Your card',
    submit: 'Vote for this card',
  },

  reveal: {
    title: (round: number) => `Round ${round}`,
    storytellerCard: 'The storyteller’s card',
    votesFor: (n: number) => (n === 1 ? '1 vote' : `${n} votes`),
    points: (n: number) => `+${n}`,
    nextRound: 'Next round',
    toPodium: 'To the final scores',
  },

  gameOver: {
    title: 'Final scores',
    winner: (name: string) => `${name} wins!`,
    winners: (names: string) => `${names} win!`,
    bestStoryteller: 'Best storyteller',
    mostMisleading: 'Master of misdirection',
    sharpestEye: 'Sharpest eye',
    correctGuesses: (n: number, total: number) => `Guessed right ${n} of ${total} times`,
    decoyVotes: (n: number) => (n === 1 ? '1 vote lured' : `${n} votes lured`),
    storytellerPoints: (n: number) => `${n} points as storyteller`,
    playAgain: 'Play again',
  },

  common: {
    score: 'Score',
    round: (n: number, max: number) => `Round ${n} of ${max}`,
    storyteller: 'Storyteller',
    secondsShort: 's',
    error: 'Oops',
    back: 'Back',
  },
} as const;

/** Simple avatar set; index points into this. */
export const AVATARS = ['🌙', '🗝️', '🐦', '🎈', '🌊', '🍄', '🦉', '⭐', '🎭', '🐋'] as const;

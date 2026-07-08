/**
 * Alle teksten op één plek, zodat vertalen later eenvoudig is.
 */
export const t = {
  appName: 'Reverie',
  tagline: 'Een verhalen- en associatiespel',

  home: {
    passAndPlay: 'Speel samen op één telefoon',
    online: 'Online spelen',
    onlineSoon: 'Online spelen vereist een Firebase-configuratie. Zie de README.',
    howToPlay: 'Hoe werkt het?',
    rules:
      'Elke ronde kiest de verteller een kaart en geeft een hint: een woord, een zin, een gevoel. ' +
      'De anderen kiezen uit hun hand de kaart die er het beste bij past. Alles wordt geschud en ' +
      'iedereen raadt welke kaart van de verteller was. Te makkelijk of te moeilijk? Dan scoort de verteller niets.',
  },

  lobby: {
    title: 'Nieuw spel',
    playersHeading: 'Spelers',
    namePlaceholder: 'Naam van speler',
    addPlayer: 'Voeg speler toe',
    needPlayers: (min: number) => `Minstens ${min} spelers nodig.`,
    maxPlayers: (max: number) => `Maximaal ${max} spelers.`,
    mode: 'Spelmodus',
    modeClassic: 'Klassiek',
    modeBlitz: 'Blitz',
    modeClassicHint: 'Tot 30 punten of 10 rondes',
    modeBlitzHint: 'Korter en sneller',
    start: 'Start het spel',
  },

  handoff: {
    passTo: (name: string) => `Geef de telefoon aan ${name}`,
    storytellerNote: 'is de verteller deze ronde',
    chooseNote: 'kiest een kaart bij de hint',
    voteNote: 'stemt op de kaart van de verteller',
    ready: (name: string) => `Ik ben ${name}`,
  },

  clue: {
    youAreStoryteller: 'Jij bent de verteller',
    instruction: 'Kies een kaart en geef een hint: een woord, een zin, een herinnering…',
    cluePlaceholder: 'Bijvoorbeeld: “De laatste trein naar huis”',
    submit: 'Leg de kaart en deel de hint',
  },

  submit: {
    theClueIs: 'De hint van de verteller',
    instruction: 'Kies uit je hand de kaart die hier het beste bij past.',
    submit: 'Leg deze kaart op tafel',
    waiting: 'De anderen kiezen nog een kaart…',
  },

  voting: {
    instruction: 'Welke kaart is van de verteller?',
    ownCardNote: 'Je eigen kaart is gemarkeerd; daar kan je niet op stemmen.',
    yourCard: 'Jouw kaart',
    submit: 'Stem op deze kaart',
  },

  reveal: {
    title: (round: number) => `Ronde ${round}`,
    storytellerCard: 'De kaart van de verteller',
    votesFor: (n: number) => (n === 1 ? '1 stem' : `${n} stemmen`),
    points: (n: number) => `+${n}`,
    nextRound: 'Volgende ronde',
    toPodium: 'Naar de eindstand',
  },

  gameOver: {
    title: 'Eindstand',
    winner: (name: string) => `${name} wint!`,
    winners: (names: string) => `${names} winnen!`,
    bestStoryteller: 'Beste verteller',
    mostMisleading: 'Meesterlijke misleider',
    sharpestEye: 'Scherpste blik',
    correctGuesses: (n: number, total: number) => `${n} van ${total} keer juist geraden`,
    decoyVotes: (n: number) => (n === 1 ? '1 stem gelokt' : `${n} stemmen gelokt`),
    storytellerPoints: (n: number) => `${n} punten als verteller`,
    playAgain: 'Speel opnieuw',
  },

  common: {
    score: 'Score',
    round: (n: number, max: number) => `Ronde ${n} van ${max}`,
    storyteller: 'Verteller',
    secondsShort: 's',
  },
} as const;

/** Eenvoudige avatarset; index verwijst hiernaar. */
export const AVATARS = ['🌙', '🗝️', '🐦', '🎈', '🌊', '🍄', '🦉', '⭐', '🎭', '🐋'] as const;

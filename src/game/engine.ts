import { createDeck } from './deck';
import { mulberry32, shuffle } from './rng';
import { scoreRound } from './scoring';
import {
  CLASSIC_SETTINGS,
  GameAction,
  GameSettings,
  GameState,
  MAX_PLAYERS,
  MIN_PLAYERS,
  Player,
  PlayerId,
  PlayerStats,
  RoundState,
} from './types';

export class GameError extends Error {}

function emptyStats(): PlayerStats {
  return {
    storytellerPoints: 0,
    storytellerRounds: 0,
    decoyVotes: 0,
    correctGuesses: 0,
    votesCast: 0,
  };
}

export interface NewPlayer {
  id: PlayerId;
  name: string;
  avatar: number;
}

/** Maakt een spel in de lobbyfase aan. */
export function createGame(
  players: NewPlayer[],
  settings: GameSettings = CLASSIC_SETTINGS,
  seed: number = Date.now() & 0xffffffff
): GameState {
  if (players.length < MIN_PLAYERS || players.length > MAX_PLAYERS) {
    throw new GameError(`Aantal spelers moet tussen ${MIN_PLAYERS} en ${MAX_PLAYERS} liggen.`);
  }
  const ids = new Set(players.map((p) => p.id));
  if (ids.size !== players.length) {
    throw new GameError('Speler-ids moeten uniek zijn.');
  }
  const stats: Record<PlayerId, PlayerStats> = {};
  for (const p of players) stats[p.id] = emptyStats();
  return {
    phase: 'lobby',
    settings,
    players: players.map((p) => ({ ...p, score: 0, hand: [] })),
    storytellerOrder: [],
    round: 0,
    roundState: null,
    lastResult: null,
    deck: [],
    stats,
    winnerIds: [],
    seed,
  };
}

function rngForRound(state: GameState, salt: number): () => number {
  return mulberry32((state.seed ^ (state.round * 2654435761) ^ salt) >>> 0);
}

function getPlayer(state: GameState, id: PlayerId): Player {
  const player = state.players.find((p) => p.id === id);
  if (!player) throw new GameError('Onbekende speler.');
  return player;
}

function requireRound(state: GameState): RoundState {
  if (!state.roundState) throw new GameError('Er is geen actieve ronde.');
  return state.roundState;
}

function dealNewRound(state: GameState): GameState {
  const round = state.round + 1;
  const deck = [...state.deck];
  const players = state.players.map((p) => ({ ...p, hand: [...p.hand] }));

  // Iedere speler vult zijn hand aan tot handSize.
  for (const player of players) {
    while (player.hand.length < state.settings.handSize) {
      const card = deck.pop();
      if (card === undefined) throw new GameError('De stapel is leeg.');
      player.hand.push(card);
    }
  }

  const storytellerId = state.storytellerOrder[(round - 1) % state.storytellerOrder.length];
  const roundState: RoundState = {
    storytellerId,
    clue: null,
    storytellerCardId: null,
    submissions: {},
    table: [],
    votes: {},
  };
  return { ...state, phase: 'storytellerClue', round, deck, players, roundState };
}

/** Kan er nog een volledige ronde gedeeld worden? */
function deckSupportsAnotherRound(state: GameState): boolean {
  const cardsNeeded = state.players.reduce(
    (sum, p) => sum + (state.settings.handSize - p.hand.length),
    0
  );
  return state.deck.length >= cardsNeeded;
}

function finishRound(state: GameState): GameState {
  const round = requireRound(state);
  if (round.clue === null || round.storytellerCardId === null) {
    throw new GameError('Ronde is niet compleet.');
  }
  const points = scoreRound({
    storytellerId: round.storytellerId,
    storytellerCardId: round.storytellerCardId,
    submissions: round.submissions,
    votes: round.votes,
  });

  const players = state.players.map((p) => ({ ...p, score: p.score + (points[p.id] ?? 0) }));

  const stats: Record<PlayerId, PlayerStats> = {};
  for (const p of state.players) stats[p.id] = { ...state.stats[p.id] };
  stats[round.storytellerId].storytellerRounds += 1;
  stats[round.storytellerId].storytellerPoints += points[round.storytellerId] ?? 0;
  for (const [voterId, cardId] of Object.entries(round.votes)) {
    stats[voterId].votesCast += 1;
    if (cardId === round.storytellerCardId) {
      stats[voterId].correctGuesses += 1;
    } else {
      const owner = Object.entries(round.submissions).find(([, c]) => c === cardId)?.[0];
      if (owner) stats[owner].decoyVotes += 1;
    }
  }

  const lastResult = {
    round: state.round,
    storytellerId: round.storytellerId,
    clue: round.clue,
    storytellerCardId: round.storytellerCardId,
    submissions: { ...round.submissions },
    votes: { ...round.votes },
    points,
  };

  return { ...state, phase: 'reveal', players, stats, lastResult };
}

function isGameOver(state: GameState): boolean {
  if (state.players.some((p) => p.score >= state.settings.targetScore)) return true;
  if (state.round >= state.settings.maxRounds) return true;
  if (!deckSupportsAnotherRound(state)) return true;
  return false;
}

function withWinners(state: GameState): GameState {
  const top = Math.max(...state.players.map((p) => p.score));
  return {
    ...state,
    phase: 'gameOver',
    winnerIds: state.players.filter((p) => p.score === top).map((p) => p.id),
  };
}

export function reduce(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      if (state.phase !== 'lobby') throw new GameError('Het spel is al gestart.');
      const rand = mulberry32(state.seed);
      const deck = shuffle(createDeck(), rand);
      const storytellerOrder = shuffle(
        state.players.map((p) => p.id),
        rand
      );
      return dealNewRound({ ...state, deck, storytellerOrder });
    }

    case 'SUBMIT_CLUE': {
      if (state.phase !== 'storytellerClue') throw new GameError('Nu is er geen hint nodig.');
      const round = requireRound(state);
      if (action.playerId !== round.storytellerId) {
        throw new GameError('Alleen de verteller geeft een hint.');
      }
      const clue = action.clue.trim();
      if (clue.length === 0) throw new GameError('De hint mag niet leeg zijn.');
      const player = getPlayer(state, action.playerId);
      if (!player.hand.includes(action.cardId)) {
        throw new GameError('Die kaart zit niet in je hand.');
      }
      return {
        ...state,
        phase: 'playersSubmit',
        players: state.players.map((p) =>
          p.id === player.id ? { ...p, hand: p.hand.filter((c) => c !== action.cardId) } : p
        ),
        roundState: {
          ...round,
          clue,
          storytellerCardId: action.cardId,
          submissions: { [player.id]: action.cardId },
        },
      };
    }

    case 'SUBMIT_CARD': {
      if (state.phase !== 'playersSubmit') throw new GameError('Nu kan er geen kaart gekozen worden.');
      const round = requireRound(state);
      if (action.playerId === round.storytellerId) {
        throw new GameError('De verteller heeft zijn kaart al gekozen.');
      }
      if (round.submissions[action.playerId]) {
        throw new GameError('Je hebt al een kaart gekozen.');
      }
      const player = getPlayer(state, action.playerId);
      if (!player.hand.includes(action.cardId)) {
        throw new GameError('Die kaart zit niet in je hand.');
      }
      const submissions = { ...round.submissions, [action.playerId]: action.cardId };
      const players = state.players.map((p) =>
        p.id === player.id ? { ...p, hand: p.hand.filter((c) => c !== action.cardId) } : p
      );
      const everyoneSubmitted = Object.keys(submissions).length === state.players.length;
      if (!everyoneSubmitted) {
        return { ...state, players, roundState: { ...round, submissions } };
      }
      // Alle kaarten liggen op tafel: schudden en naar de stemfase.
      const table = shuffle(Object.values(submissions), rngForRound(state, 0x7ab1e));
      return {
        ...state,
        phase: 'voting',
        players,
        roundState: { ...round, submissions, table },
      };
    }

    case 'CAST_VOTE': {
      if (state.phase !== 'voting') throw new GameError('Nu kan er niet gestemd worden.');
      const round = requireRound(state);
      if (action.playerId === round.storytellerId) {
        throw new GameError('De verteller stemt niet mee.');
      }
      if (round.votes[action.playerId]) throw new GameError('Je hebt al gestemd.');
      if (!round.table.includes(action.cardId)) {
        throw new GameError('Die kaart ligt niet op tafel.');
      }
      if (round.submissions[action.playerId] === action.cardId) {
        throw new GameError('Je kan niet op je eigen kaart stemmen.');
      }
      getPlayer(state, action.playerId);
      const votes = { ...round.votes, [action.playerId]: action.cardId };
      const everyoneVoted = Object.keys(votes).length === state.players.length - 1;
      const next = { ...state, roundState: { ...round, votes } };
      return everyoneVoted ? finishRound(next) : next;
    }

    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal') throw new GameError('De ronde is nog bezig.');
      const cleared = { ...state, roundState: null };
      return isGameOver(cleared) ? withWinners(cleared) : dealNewRound(cleared);
    }

    default: {
      const exhaustive: never = action;
      throw new GameError(`Onbekende actie: ${JSON.stringify(exhaustive)}`);
    }
  }
}

/** Spelers die in de huidige fase nog een actie moeten doen (voor de UI). */
export function pendingPlayers(state: GameState): PlayerId[] {
  const round = state.roundState;
  if (!round) return [];
  switch (state.phase) {
    case 'storytellerClue':
      return [round.storytellerId];
    case 'playersSubmit':
      return state.players.map((p) => p.id).filter((id) => !round.submissions[id]);
    case 'voting':
      return state.players
        .map((p) => p.id)
        .filter((id) => id !== round.storytellerId && !round.votes[id]);
    default:
      return [];
  }
}

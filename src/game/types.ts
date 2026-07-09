/**
 * Kern-typen van het spel. Dit hele pakket (src/game) is pure TypeScript
 * zonder React Native-afhankelijkheden, zodat de spelregels los van de UI
 * getest kunnen worden en zowel lokaal als op een server kunnen draaien.
 */

export type CardId = string;
export type PlayerId = string;

export type Phase =
  | 'lobby'
  | 'storytellerClue' // verteller kiest kaart + schrijft hint
  | 'playersSubmit' // andere spelers kiezen een passende kaart
  | 'voting' // iedereen (behalve verteller) stemt
  | 'reveal' // uitslag van de ronde
  | 'gameOver';

export type GameMode = 'classic' | 'blitz';

/** Theme the words/cards are drawn from. Only a couple exist for now. */
export type WordCategory = 'random' | 'fantasy';

export interface Player {
  id: PlayerId;
  name: string;
  /** Index in de avatarlijst (zie i18n/avatars). */
  avatar: number;
  score: number;
  hand: CardId[];
}

export interface PlayerStats {
  /** Punten verdiend in rondes waarin deze speler verteller was. */
  storytellerPoints: number;
  /** Aantal keren dat de speler verteller was. */
  storytellerRounds: number;
  /** Stemmen die deze speler lokte met een kaart die níét van de verteller was. */
  decoyVotes: number;
  /** Aantal keren dat de speler de kaart van de verteller juist raadde. */
  correctGuesses: number;
  /** Aantal keren dat de speler mocht stemmen. */
  votesCast: number;
}

export interface RoundResult {
  round: number;
  storytellerId: PlayerId;
  clue: string;
  storytellerCardId: CardId;
  /** Wie speelde welke kaart (inclusief verteller). */
  submissions: Record<PlayerId, CardId>;
  /** Wie stemde op welke kaart. */
  votes: Record<PlayerId, CardId>;
  /** Punten die iedere speler deze ronde verdiende. */
  points: Record<PlayerId, number>;
}

export interface RoundState {
  storytellerId: PlayerId;
  clue: string | null;
  storytellerCardId: CardId | null;
  /** Gekozen kaart per speler (inclusief de verteller). */
  submissions: Record<PlayerId, CardId>;
  /** Geschudde kaarten op tafel; pas gevuld zodra iedereen heeft ingeleverd. */
  table: CardId[];
  votes: Record<PlayerId, CardId>;
}

export interface GameSettings {
  mode: GameMode;
  /** Spel eindigt zodra iemand deze score haalt (na afloop van de ronde). */
  targetScore: number;
  /** Spel eindigt sowieso na dit aantal rondes. */
  maxRounds: number;
  handSize: number;
  /** Richttijd per beurt in seconden (alleen weergave, niet afgedwongen in v1). */
  turnSeconds: number;
  /** Gekozen woordcategorie; 'random' tenzij het spel op één thema staat. */
  category?: WordCategory;
}

export interface GameState {
  phase: Phase;
  settings: GameSettings;
  players: Player[];
  /** Volgorde waarin spelers verteller worden (speler-ids). */
  storytellerOrder: PlayerId[];
  round: number;
  roundState: RoundState | null;
  /** Resultaat van de laatst afgeronde ronde (voor het reveal-scherm). */
  lastResult: RoundResult | null;
  deck: CardId[];
  stats: Record<PlayerId, PlayerStats>;
  winnerIds: PlayerId[];
  /** Seed zodat schudden deterministisch en reproduceerbaar is. */
  seed: number;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SUBMIT_CLUE'; playerId: PlayerId; cardId: CardId; clue: string }
  | { type: 'SUBMIT_CARD'; playerId: PlayerId; cardId: CardId }
  | { type: 'CAST_VOTE'; playerId: PlayerId; cardId: CardId }
  | { type: 'NEXT_ROUND' };

export const CLASSIC_SETTINGS: GameSettings = {
  mode: 'classic',
  targetScore: 30,
  maxRounds: 5,
  handSize: 6,
  turnSeconds: 60,
};

export const BLITZ_SETTINGS: GameSettings = {
  mode: 'blitz',
  targetScore: 15,
  maxRounds: 6,
  handSize: 6,
  turnSeconds: 25,
};

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 10;

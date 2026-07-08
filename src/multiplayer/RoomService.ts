import { GameAction, GameState } from '../game/types';

/**
 * Abstractie voor online multiplayer. De spelregels (src/game) weten niets
 * van het netwerk; een RoomService synchroniseert alleen GameState en
 * acties tussen apparaten. Zo kan de backend (Firebase, Supabase, eigen
 * server) gewisseld worden zonder de rest van de app te raken.
 *
 * Model: de host is de bron van waarheid. Spelers sturen acties naar de
 * kamer; de host past ze toe met de reducer en publiceert de nieuwe staat.
 */
export interface RoomInfo {
  /** Korte code die medespelers intypen, bv. "MAAN7". */
  code: string;
  /** Id van deze speler binnen de kamer. */
  selfId: string;
  /** Alleen de host voert acties uit en publiceert de staat. */
  isHost: boolean;
}

export interface RoomService {
  createRoom(hostName: string): Promise<RoomInfo>;
  joinRoom(code: string, playerName: string): Promise<RoomInfo>;
  /** Publiceer de actuele spelstaat (alleen host). */
  publishState(code: string, state: GameState): Promise<void>;
  /** Luister naar de spelstaat. Geeft een unsubscribe-functie terug. */
  onState(code: string, listener: (state: GameState) => void): () => void;
  /** Stuur een actie van deze speler naar de host. */
  sendAction(code: string, action: GameAction): Promise<void>;
  /** Luister als host naar binnenkomende acties. */
  onAction(code: string, listener: (action: GameAction) => void): () => void;
  leaveRoom(code: string): Promise<void>;
}

/** Genereert een leesbare kamercode zonder verwarrende tekens. */
export function generateRoomCode(rand: () => number = Math.random): string {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += alphabet[Math.floor(rand() * alphabet.length)];
  }
  return code;
}

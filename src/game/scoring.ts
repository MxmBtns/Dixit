import { CardId, PlayerId } from './types';

export interface ScoreInput {
  storytellerId: PlayerId;
  storytellerCardId: CardId;
  /** Gekozen kaart per speler, inclusief de verteller. */
  submissions: Record<PlayerId, CardId>;
  /** Stem per speler (verteller stemt niet). */
  votes: Record<PlayerId, CardId>;
}

/** Maximale bonus voor gelokte stemmen, zoals in het klassieke spel. */
export const MAX_DECOY_BONUS = 3;

/**
 * Klassiek puntensysteem:
 * - Iedereen of niemand raadt de kaart van de verteller: verteller 0 punten,
 *   alle andere spelers 2 punten.
 * - Anders: verteller en juiste raders elk 3 punten.
 * - Daarnaast: 1 bonuspunt per stem op je eigen (niet-verteller)kaart,
 *   met een maximum van 3.
 */
export function scoreRound(input: ScoreInput): Record<PlayerId, number> {
  const { storytellerId, storytellerCardId, submissions, votes } = input;
  const points: Record<PlayerId, number> = {};
  for (const playerId of Object.keys(submissions)) {
    points[playerId] = 0;
  }

  const voters = Object.keys(votes);
  const correctVoters = voters.filter((id) => votes[id] === storytellerCardId);
  const allOrNone = correctVoters.length === 0 || correctVoters.length === voters.length;

  if (allOrNone) {
    for (const playerId of Object.keys(points)) {
      if (playerId !== storytellerId) points[playerId] += 2;
    }
  } else {
    points[storytellerId] += 3;
    for (const voterId of correctVoters) {
      points[voterId] += 3;
    }
  }

  const ownerByCard: Record<CardId, PlayerId> = {};
  for (const [playerId, cardId] of Object.entries(submissions)) {
    ownerByCard[cardId] = playerId;
  }
  const decoyBonus: Record<PlayerId, number> = {};
  for (const cardId of Object.values(votes)) {
    const owner = ownerByCard[cardId];
    if (owner !== undefined && owner !== storytellerId) {
      decoyBonus[owner] = (decoyBonus[owner] ?? 0) + 1;
    }
  }
  for (const [playerId, bonus] of Object.entries(decoyBonus)) {
    points[playerId] += Math.min(bonus, MAX_DECOY_BONUS);
  }

  return points;
}

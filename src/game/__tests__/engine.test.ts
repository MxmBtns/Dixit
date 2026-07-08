import { createGame, GameError, pendingPlayers, reduce } from '../engine';
import { DECK_SIZE } from '../deck';
import { CLASSIC_SETTINGS, GameState } from '../types';

const PLAYERS = [
  { id: 'p1', name: 'Anna', avatar: 0 },
  { id: 'p2', name: 'Bram', avatar: 1 },
  { id: 'p3', name: 'Cato', avatar: 2 },
  { id: 'p4', name: 'Daan', avatar: 3 },
];

function startedGame(seed = 42): GameState {
  return reduce(createGame(PLAYERS, CLASSIC_SETTINGS, seed), { type: 'START_GAME' });
}

/** Speelt één volledige ronde; iedereen stemt op de eerste toegestane tafelkaart. */
function playRound(state: GameState): GameState {
  const storyteller = state.roundState!.storytellerId;
  const storytellerHand = state.players.find((p) => p.id === storyteller)!.hand;
  let s = reduce(state, {
    type: 'SUBMIT_CLUE',
    playerId: storyteller,
    cardId: storytellerHand[0],
    clue: 'De laatste trein naar huis',
  });
  for (const p of s.players) {
    if (p.id === storyteller) continue;
    s = reduce(s, { type: 'SUBMIT_CARD', playerId: p.id, cardId: p.hand[0] });
  }
  for (const p of s.players) {
    if (p.id === storyteller) continue;
    const own = s.roundState!.submissions[p.id];
    const target = s.roundState!.table.find((c) => c !== own)!;
    s = reduce(s, { type: 'CAST_VOTE', playerId: p.id, cardId: target });
  }
  return s;
}

describe('createGame', () => {
  test('weigert minder dan 3 spelers', () => {
    expect(() => createGame(PLAYERS.slice(0, 2))).toThrow(GameError);
  });

  test('weigert dubbele speler-ids', () => {
    expect(() => createGame([...PLAYERS.slice(0, 3), { ...PLAYERS[0] }])).toThrow(GameError);
  });
});

describe('spelverloop', () => {
  test('START_GAME deelt iedereen een volle hand en wijst een verteller aan', () => {
    const s = startedGame();
    expect(s.phase).toBe('storytellerClue');
    expect(s.round).toBe(1);
    for (const p of s.players) expect(p.hand).toHaveLength(CLASSIC_SETTINGS.handSize);
    expect(s.deck).toHaveLength(DECK_SIZE - 4 * CLASSIC_SETTINGS.handSize);
    expect(s.storytellerOrder).toHaveLength(4);
    expect(pendingPlayers(s)).toEqual([s.roundState!.storytellerId]);
  });

  test('kaarten in handen en stapel blijven uniek', () => {
    const s = startedGame();
    const all = [...s.deck, ...s.players.flatMap((p) => p.hand)];
    expect(new Set(all).size).toBe(DECK_SIZE);
  });

  test('alleen de verteller mag de hint geven', () => {
    const s = startedGame();
    const other = s.players.find((p) => p.id !== s.roundState!.storytellerId)!;
    expect(() =>
      reduce(s, { type: 'SUBMIT_CLUE', playerId: other.id, cardId: other.hand[0], clue: 'x' })
    ).toThrow(GameError);
  });

  test('lege hint wordt geweigerd', () => {
    const s = startedGame();
    const teller = s.players.find((p) => p.id === s.roundState!.storytellerId)!;
    expect(() =>
      reduce(s, { type: 'SUBMIT_CLUE', playerId: teller.id, cardId: teller.hand[0], clue: '   ' })
    ).toThrow(GameError);
  });

  test('na alle inzendingen ligt alles geschud op tafel en begint het stemmen', () => {
    let s = startedGame();
    const storyteller = s.roundState!.storytellerId;
    const hand = s.players.find((p) => p.id === storyteller)!.hand;
    s = reduce(s, { type: 'SUBMIT_CLUE', playerId: storyteller, cardId: hand[0], clue: 'Verlangen' });
    expect(s.phase).toBe('playersSubmit');
    for (const p of s.players) {
      if (p.id === storyteller) continue;
      s = reduce(s, { type: 'SUBMIT_CARD', playerId: p.id, cardId: p.hand[0] });
    }
    expect(s.phase).toBe('voting');
    expect(s.roundState!.table).toHaveLength(4);
    expect(new Set(s.roundState!.table)).toEqual(new Set(Object.values(s.roundState!.submissions)));
  });

  test('stemmen op je eigen kaart mag niet', () => {
    let s = startedGame();
    const storyteller = s.roundState!.storytellerId;
    const hand = s.players.find((p) => p.id === storyteller)!.hand;
    s = reduce(s, { type: 'SUBMIT_CLUE', playerId: storyteller, cardId: hand[0], clue: 'Regen' });
    for (const p of s.players) {
      if (p.id === storyteller) continue;
      s = reduce(s, { type: 'SUBMIT_CARD', playerId: p.id, cardId: p.hand[0] });
    }
    const voter = s.players.find((p) => p.id !== storyteller)!;
    const own = s.roundState!.submissions[voter.id];
    expect(() => reduce(s, { type: 'CAST_VOTE', playerId: voter.id, cardId: own })).toThrow(
      GameError
    );
  });

  test('na de laatste stem volgt het reveal met punten en statistieken', () => {
    const s = playRound(startedGame());
    expect(s.phase).toBe('reveal');
    expect(s.lastResult).not.toBeNull();
    const totalScore = s.players.reduce((sum, p) => sum + p.score, 0);
    const totalPoints = Object.values(s.lastResult!.points).reduce((a, b) => a + b, 0);
    expect(totalScore).toBe(totalPoints);
    const st = s.stats[s.lastResult!.storytellerId];
    expect(st.storytellerRounds).toBe(1);
  });

  test('NEXT_ROUND vult handen aan en geeft de beurt aan de volgende verteller', () => {
    const afterRound = playRound(startedGame());
    const firstStoryteller = afterRound.lastResult!.storytellerId;
    const s = reduce(afterRound, { type: 'NEXT_ROUND' });
    expect(s.phase).toBe('storytellerClue');
    expect(s.round).toBe(2);
    for (const p of s.players) expect(p.hand).toHaveLength(CLASSIC_SETTINGS.handSize);
    expect(s.roundState!.storytellerId).not.toBe(firstStoryteller);
  });

  test('het spel eindigt na maxRounds met winnaars', () => {
    let s = startedGame();
    for (let i = 0; i < CLASSIC_SETTINGS.maxRounds; i++) {
      s = playRound(s);
      s = reduce(s, { type: 'NEXT_ROUND' });
      if (s.phase === 'gameOver') break;
    }
    expect(s.phase).toBe('gameOver');
    expect(s.winnerIds.length).toBeGreaterThan(0);
    const top = Math.max(...s.players.map((p) => p.score));
    for (const id of s.winnerIds) {
      expect(s.players.find((p) => p.id === id)!.score).toBe(top);
    }
  });

  test('zelfde seed geeft exact hetzelfde spelverloop', () => {
    const a = playRound(startedGame(7));
    const b = playRound(startedGame(7));
    expect(a).toEqual(b);
  });
});

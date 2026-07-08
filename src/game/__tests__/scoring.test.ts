import { scoreRound } from '../scoring';

const base = {
  storytellerId: 'a',
  storytellerCardId: 'kaart-a',
  submissions: { a: 'kaart-a', b: 'kaart-b', c: 'kaart-c', d: 'kaart-d' },
};

describe('scoreRound', () => {
  test('iedereen raadt juist: verteller 0, rest 2', () => {
    const points = scoreRound({
      ...base,
      votes: { b: 'kaart-a', c: 'kaart-a', d: 'kaart-a' },
    });
    expect(points).toEqual({ a: 0, b: 2, c: 2, d: 2 });
  });

  test('niemand raadt juist: verteller 0, rest 2 plus lokbonus', () => {
    const points = scoreRound({
      ...base,
      votes: { b: 'kaart-c', c: 'kaart-d', d: 'kaart-c' },
    });
    // b: 2, c: 2 + 2 stemmen gelokt, d: 2 + 1 stem gelokt
    expect(points).toEqual({ a: 0, b: 2, c: 4, d: 3 });
  });

  test('deel raadt juist: verteller 3, juiste raders 3', () => {
    const points = scoreRound({
      ...base,
      votes: { b: 'kaart-a', c: 'kaart-b', d: 'kaart-a' },
    });
    // b: 3 (juist) + 1 (stem van c), c: 0, d: 3 (juist)
    expect(points).toEqual({ a: 3, b: 4, c: 0, d: 3 });
  });

  test('lokbonus is begrensd op 3', () => {
    const points = scoreRound({
      storytellerId: 'a',
      storytellerCardId: 'kaart-a',
      submissions: {
        a: 'kaart-a',
        b: 'kaart-b',
        c: 'kaart-c',
        d: 'kaart-d',
        e: 'kaart-e',
        f: 'kaart-f',
      },
      // Eén juiste stem, vier stemmen op kaart-b.
      votes: { b: 'kaart-a', c: 'kaart-b', d: 'kaart-b', e: 'kaart-b', f: 'kaart-b' },
    });
    expect(points.a).toBe(3);
    expect(points.b).toBe(3 + 3); // juist geraden + begrensde lokbonus
    expect(points.c).toBe(0);
  });

  test('stemmen op de vertellerskaart leveren de verteller geen lokbonus op', () => {
    const points = scoreRound({
      ...base,
      votes: { b: 'kaart-a', c: 'kaart-a', d: 'kaart-b' },
    });
    expect(points.a).toBe(3);
    expect(points.b).toBe(3 + 1);
  });
});

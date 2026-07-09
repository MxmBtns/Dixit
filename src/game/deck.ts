import { CardId } from './types';

/**
 * De basiskaartenset. Elke kaart-id verwijst naar een echte illustratie in
 * assets/cards (zie src/art/cardImages). Het deck telt precies zoveel kaarten
 * als er illustraties zijn, zodat er geen procedureel SVG-artwork meer in het
 * spel verschijnt.
 */
export const DECK_SIZE = 64;

export function createDeck(): CardId[] {
  return Array.from({ length: DECK_SIZE }, (_, i) => `card-${String(i + 1).padStart(2, '0')}`);
}

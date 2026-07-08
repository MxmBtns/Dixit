import { CardId } from './types';

/**
 * De basiskaartenset. Elke kaart is alleen een id; het artwork wordt in de
 * app procedureel gegenereerd op basis van dit id (zie src/art). Zodra er
 * echte illustraties of AI-gegenereerde sets zijn, wordt dit een mapping
 * van id naar afbeelding zonder dat de spelregels veranderen.
 */
export const DECK_SIZE = 96;

export function createDeck(): CardId[] {
  return Array.from({ length: DECK_SIZE }, (_, i) => `card-${String(i + 1).padStart(2, '0')}`);
}

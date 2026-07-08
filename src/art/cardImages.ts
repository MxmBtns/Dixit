import { ImageSourcePropType } from 'react-native';

/**
 * Real illustrations that stand in for the procedural SVG art on specific
 * cards. Any card id not listed here still falls back to the generated
 * artwork in CardArt, so the deck keeps working while the set is filled in.
 */
import card01 from '../../assets/cards/card-01.jpg';
import card02 from '../../assets/cards/card-02.jpg';
import card03 from '../../assets/cards/card-03.jpg';
import card04 from '../../assets/cards/card-04.jpg';
import card05 from '../../assets/cards/card-05.jpg';
import card06 from '../../assets/cards/card-06.jpg';
import card07 from '../../assets/cards/card-07.jpg';
import card08 from '../../assets/cards/card-08.jpg';
import card09 from '../../assets/cards/card-09.jpg';
import card10 from '../../assets/cards/card-10.jpg';
import card11 from '../../assets/cards/card-11.jpg';
import card12 from '../../assets/cards/card-12.jpg';

const CARD_IMAGES: Record<string, ImageSourcePropType> = {
  'card-01': card01,
  'card-02': card02,
  'card-03': card03,
  'card-04': card04,
  'card-05': card05,
  'card-06': card06,
  'card-07': card07,
  'card-08': card08,
  'card-09': card09,
  'card-10': card10,
  'card-11': card11,
  'card-12': card12,
};

export function cardImage(cardId: string): ImageSourcePropType | undefined {
  return CARD_IMAGES[cardId];
}

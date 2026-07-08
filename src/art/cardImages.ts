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
import card13 from '../../assets/cards/card-13.jpg';
import card14 from '../../assets/cards/card-14.jpg';
import card15 from '../../assets/cards/card-15.jpg';
import card16 from '../../assets/cards/card-16.jpg';
import card17 from '../../assets/cards/card-17.jpg';
import card18 from '../../assets/cards/card-18.jpg';
import card19 from '../../assets/cards/card-19.jpg';
import card20 from '../../assets/cards/card-20.jpg';
import card21 from '../../assets/cards/card-21.jpg';
import card22 from '../../assets/cards/card-22.jpg';
import card23 from '../../assets/cards/card-23.jpg';
import card24 from '../../assets/cards/card-24.jpg';
import card25 from '../../assets/cards/card-25.jpg';
import card26 from '../../assets/cards/card-26.jpg';

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
  'card-13': card13,
  'card-14': card14,
  'card-15': card15,
  'card-16': card16,
  'card-17': card17,
  'card-18': card18,
  'card-19': card19,
  'card-20': card20,
  'card-21': card21,
  'card-22': card22,
  'card-23': card23,
  'card-24': card24,
  'card-25': card25,
  'card-26': card26,
};

export function cardImage(cardId: string): ImageSourcePropType | undefined {
  return CARD_IMAGES[cardId];
}

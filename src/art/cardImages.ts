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
import card27 from '../../assets/cards/card-27.jpg';
import card28 from '../../assets/cards/card-28.jpg';
import card29 from '../../assets/cards/card-29.jpg';
import card30 from '../../assets/cards/card-30.jpg';
import card31 from '../../assets/cards/card-31.jpg';
import card32 from '../../assets/cards/card-32.jpg';
import card33 from '../../assets/cards/card-33.jpg';
import card34 from '../../assets/cards/card-34.jpg';
import card35 from '../../assets/cards/card-35.jpg';
import card36 from '../../assets/cards/card-36.jpg';
import card37 from '../../assets/cards/card-37.jpg';
import card38 from '../../assets/cards/card-38.jpg';
import card39 from '../../assets/cards/card-39.jpg';
import card40 from '../../assets/cards/card-40.jpg';
import card41 from '../../assets/cards/card-41.jpg';
import card42 from '../../assets/cards/card-42.jpg';
import card43 from '../../assets/cards/card-43.jpg';
import card44 from '../../assets/cards/card-44.jpg';
import card45 from '../../assets/cards/card-45.jpg';
import card46 from '../../assets/cards/card-46.jpg';
import card47 from '../../assets/cards/card-47.jpg';
import card48 from '../../assets/cards/card-48.jpg';
import card49 from '../../assets/cards/card-49.jpg';
import card50 from '../../assets/cards/card-50.jpg';
import card51 from '../../assets/cards/card-51.jpg';
import card52 from '../../assets/cards/card-52.jpg';
import card53 from '../../assets/cards/card-53.jpg';
import card54 from '../../assets/cards/card-54.jpg';
import card55 from '../../assets/cards/card-55.jpg';
import card56 from '../../assets/cards/card-56.jpg';
import card57 from '../../assets/cards/card-57.jpg';
import card58 from '../../assets/cards/card-58.jpg';
import card59 from '../../assets/cards/card-59.jpg';
import card60 from '../../assets/cards/card-60.jpg';
import card61 from '../../assets/cards/card-61.jpg';
import card62 from '../../assets/cards/card-62.jpg';
import card63 from '../../assets/cards/card-63.jpg';
import card64 from '../../assets/cards/card-64.jpg';

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
  'card-27': card27,
  'card-28': card28,
  'card-29': card29,
  'card-30': card30,
  'card-31': card31,
  'card-32': card32,
  'card-33': card33,
  'card-34': card34,
  'card-35': card35,
  'card-36': card36,
  'card-37': card37,
  'card-38': card38,
  'card-39': card39,
  'card-40': card40,
  'card-41': card41,
  'card-42': card42,
  'card-43': card43,
  'card-44': card44,
  'card-45': card45,
  'card-46': card46,
  'card-47': card47,
  'card-48': card48,
  'card-49': card49,
  'card-50': card50,
  'card-51': card51,
  'card-52': card52,
  'card-53': card53,
  'card-54': card54,
  'card-55': card55,
  'card-56': card56,
  'card-57': card57,
  'card-58': card58,
  'card-59': card59,
  'card-60': card60,
  'card-61': card61,
  'card-62': card62,
  'card-63': card63,
  'card-64': card64,
};

export function cardImage(cardId: string): ImageSourcePropType | undefined {
  return CARD_IMAGES[cardId];
}

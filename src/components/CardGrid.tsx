import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { theme } from '../theme';
import { CardView } from './CardView';

interface Props {
  cardIds: string[];
  selectedId?: string | null;
  disabledIds?: string[];
  badges?: Record<string, string>;
  onSelect?: (cardId: string) => void;
}

/** Kaarten in een rustig raster van twee of drie kolommen. */
export function CardGrid({ cardIds, selectedId, disabledIds, badges, onSelect }: Props) {
  const { width } = useWindowDimensions();
  // Two roomy columns for a normal hand (up to 6 cards); three only when the
  // table gets crowded (e.g. voting with many players), so cards stay legible.
  const columns = cardIds.length > 6 ? 3 : 2;
  const gap = theme.spacing(1.5);
  const cardWidth = (Math.min(width, 520) - theme.spacing(4) - gap * (columns - 1)) / columns;

  return (
    <View style={[styles.grid, { gap }]}>
      {cardIds.map((id) => (
        <CardView
          key={id}
          cardId={id}
          width={cardWidth}
          selected={selectedId === id}
          disabled={disabledIds?.includes(id)}
          badge={badges?.[id]}
          onPress={onSelect}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

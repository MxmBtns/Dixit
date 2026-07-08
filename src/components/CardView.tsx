import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { CardArt, CARD_H, CARD_W } from '../art/CardArt';
import { cardImage } from '../art/cardImages';
import { theme } from '../theme';

interface Props {
  cardId: string;
  width: number;
  selected?: boolean;
  disabled?: boolean;
  badge?: string;
  onPress?: (cardId: string) => void;
}

/** Eén speelkaart: artwork in een afgerond kader, optioneel selecteerbaar. */
export function CardView({ cardId, width, selected, disabled, badge, onPress }: Props) {
  const height = (width * CARD_H) / CARD_W;
  const innerWidth = width - 6;
  const image = cardImage(cardId);
  return (
    <Pressable
      onPress={onPress ? () => onPress(cardId) : undefined}
      disabled={disabled || !onPress}
      style={({ pressed }) => [
        styles.frame,
        { width, height },
        selected && styles.selected,
        disabled && styles.disabled,
        pressed && onPress && styles.pressed,
      ]}
    >
      {image ? (
        <Image
          source={image}
          style={{ width: innerWidth, height: (innerWidth * CARD_H) / CARD_W }}
          resizeMode="cover"
        />
      ) : (
        <CardArt cardId={cardId} width={innerWidth} />
      )}
      {badge !== undefined && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: theme.radius.card,
    borderWidth: 3,
    borderColor: theme.colors.surface,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  selected: {
    borderColor: theme.colors.accent,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.chip,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#fff',
    fontSize: theme.font.small,
    fontWeight: '700',
  },
});

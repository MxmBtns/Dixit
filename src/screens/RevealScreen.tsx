import React from 'react';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { Button } from '../components/Button';
import { CardView } from '../components/CardView';
import { GameState, RoundResult } from '../game/types';
import { AVATARS, t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  state: GameState;
  result: RoundResult;
  onNext: () => void;
}

/** Uitslag van de ronde: wie speelde wat, wie stemde waarop, en de punten. */
export function RevealScreen({ state, result, onNext }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min((width - theme.spacing(6)) / 2.4, 150);

  const playerById = (id: string) => state.players.find((p) => p.id === id);
  const willEnd =
    state.players.some((p) => p.score >= state.settings.targetScore) ||
    state.round >= state.settings.maxRounds;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.reveal.title(result.round)}</Text>
      <Text style={styles.clue}>“{result.clue}”</Text>

      {Object.entries(result.submissions).map(([playerId, cardId]) => {
        const player = playerById(playerId);
        if (!player) return null;
        const isStoryteller = playerId === result.storytellerId;
        const voters = Object.entries(result.votes)
          .filter(([, votedCard]) => votedCard === cardId)
          .map(([voterId]) => playerById(voterId))
          .filter((p) => p !== undefined);
        const points = result.points[playerId] ?? 0;

        return (
          <View key={playerId} style={[styles.row, isStoryteller && styles.storytellerRow]}>
            <CardView cardId={cardId} width={cardWidth} badge={isStoryteller ? t.common.storyteller : undefined} />
            <View style={styles.rowInfo}>
              <Text style={styles.playerName}>
                {AVATARS[player.avatar % AVATARS.length]} {player.name}
              </Text>
              <Text style={styles.votes}>{t.reveal.votesFor(voters.length)}</Text>
              {voters.length > 0 && (
                <Text style={styles.voterNames}>{voters.map((v) => v!.name).join(', ')}</Text>
              )}
              <Text style={[styles.points, points > 0 && styles.pointsPositive]}>
                {t.reveal.points(points)}
              </Text>
            </View>
          </View>
        );
      })}

      <Button label={willEnd ? t.reveal.toPodium : t.reveal.nextRound} onPress={onNext} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.font.small,
    fontWeight: '700',
    color: theme.colors.inkSoft,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clue: {
    fontSize: theme.font.heading,
    fontWeight: '600',
    color: theme.colors.ink,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing(2),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing(1.5),
    alignItems: 'center',
  },
  storytellerRow: {
    borderColor: theme.colors.accent,
    borderWidth: 2,
  },
  rowInfo: {
    flex: 1,
    gap: 4,
  },
  playerName: {
    fontSize: theme.font.body,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  votes: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
  },
  voterNames: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
    fontStyle: 'italic',
  },
  points: {
    fontSize: theme.font.heading,
    fontWeight: '700',
    color: theme.colors.inkSoft,
  },
  pointsPositive: {
    color: theme.colors.success,
  },
});

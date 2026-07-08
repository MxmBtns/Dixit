import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { GameState, Player } from '../game/types';
import { AVATARS, t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  state: GameState;
  onPlayAgain: () => void;
}

/** Eindscherm: podium, winnaars en een paar leuke statistieken. */
export function GameOverScreen({ state, onPlayAgain }: Props) {
  const ranked = [...state.players].sort((a, b) => b.score - a.score);
  const winners = state.winnerIds
    .map((id) => state.players.find((p) => p.id === id))
    .filter((p): p is Player => p !== undefined);
  const winnerLine =
    winners.length === 1
      ? t.gameOver.winner(winners[0].name)
      : t.gameOver.winners(winners.map((w) => w.name).join(' & '));

  const bestStoryteller = maxBy(state.players, (p) => state.stats[p.id].storytellerPoints);
  const mostMisleading = maxBy(state.players, (p) => state.stats[p.id].decoyVotes);
  const sharpestEye = maxBy(state.players, (p) => {
    const s = state.stats[p.id];
    return s.votesCast === 0 ? 0 : s.correctGuesses / s.votesCast;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.gameOver.title}</Text>
      <Text style={styles.winner}>🏆 {winnerLine}</Text>

      <View style={styles.podium}>
        {ranked.map((p, i) => (
          <View key={p.id} style={[styles.podiumRow, i === 0 && styles.podiumFirst]}>
            <Text style={styles.rank}>{i + 1}</Text>
            <Text style={styles.podiumName}>
              {AVATARS[p.avatar % AVATARS.length]} {p.name}
            </Text>
            <Text style={styles.podiumScore}>{p.score}</Text>
          </View>
        ))}
      </View>

      <View style={styles.statsBlock}>
        {bestStoryteller && (
          <StatRow
            title={t.gameOver.bestStoryteller}
            player={bestStoryteller}
            detail={t.gameOver.storytellerPoints(state.stats[bestStoryteller.id].storytellerPoints)}
          />
        )}
        {mostMisleading && state.stats[mostMisleading.id].decoyVotes > 0 && (
          <StatRow
            title={t.gameOver.mostMisleading}
            player={mostMisleading}
            detail={t.gameOver.decoyVotes(state.stats[mostMisleading.id].decoyVotes)}
          />
        )}
        {sharpestEye && state.stats[sharpestEye.id].votesCast > 0 && (
          <StatRow
            title={t.gameOver.sharpestEye}
            player={sharpestEye}
            detail={t.gameOver.correctGuesses(
              state.stats[sharpestEye.id].correctGuesses,
              state.stats[sharpestEye.id].votesCast
            )}
          />
        )}
      </View>

      <Button label={t.gameOver.playAgain} onPress={onPlayAgain} />
    </ScrollView>
  );
}

function maxBy(players: Player[], value: (p: Player) => number): Player | null {
  if (players.length === 0) return null;
  return players.reduce((best, p) => (value(p) > value(best) ? p : best), players[0]);
}

function StatRow({ title, player, detail }: { title: string; player: Player; detail: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statPlayer}>
        {AVATARS[player.avatar % AVATARS.length]} {player.name}
      </Text>
      <Text style={styles.statDetail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.font.title,
    fontWeight: '700',
    color: theme.colors.ink,
    textAlign: 'center',
  },
  winner: {
    fontSize: theme.font.heading,
    color: theme.colors.ink,
    textAlign: 'center',
  },
  podium: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1.5),
    gap: theme.spacing(1.5),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  podiumFirst: {
    backgroundColor: '#fdf6e3',
  },
  rank: {
    width: 24,
    fontSize: theme.font.body,
    fontWeight: '700',
    color: theme.colors.inkSoft,
  },
  podiumName: {
    flex: 1,
    fontSize: theme.font.body,
    color: theme.colors.ink,
    fontWeight: '600',
  },
  podiumScore: {
    fontSize: theme.font.heading,
    fontWeight: '700',
    color: theme.colors.accent,
  },
  statsBlock: {
    gap: theme.spacing(1),
  },
  statRow: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing(2),
    gap: 2,
  },
  statTitle: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statPlayer: {
    fontSize: theme.font.body,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  statDetail: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
  },
});

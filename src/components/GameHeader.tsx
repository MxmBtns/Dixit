import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GameState } from '../game/types';
import { AVATARS, t } from '../i18n/nl';
import { theme } from '../theme';

/** Rustige kopregel: rondenummer, richttimer en de tussenstand. */
export function GameHeader({ state }: { state: GameState }) {
  const storyteller = state.roundState
    ? state.players.find((p) => p.id === state.roundState!.storytellerId)
    : null;

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.round}>{t.common.round(state.round, state.settings.maxRounds)}</Text>
        <PhaseTimer key={`${state.round}-${state.phase}`} seconds={state.settings.turnSeconds} />
      </View>
      {storyteller && (
        <Text style={styles.storyteller}>
          {t.common.storyteller}: {AVATARS[storyteller.avatar % AVATARS.length]} {storyteller.name}
        </Text>
      )}
      <View style={styles.scores}>
        {[...state.players]
          .sort((a, b) => b.score - a.score)
          .map((p) => (
            <View key={p.id} style={styles.chip}>
              <Text style={styles.chipText}>
                {AVATARS[p.avatar % AVATARS.length]} {p.name} · {p.score}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
}

/** Richttijd voor de fase; loopt af maar dwingt niets af (v1). */
function PhaseTimer({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const timer = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <Text style={[styles.timer, left <= 10 && styles.timerLow]}>
      {left}
      {t.common.secondsShort}
    </Text>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: theme.spacing(2),
    paddingTop: theme.spacing(1),
    gap: theme.spacing(1),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  round: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timer: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
    fontVariant: ['tabular-nums'],
  },
  timerLow: {
    color: theme.colors.danger,
    fontWeight: '700',
  },
  storyteller: {
    fontSize: theme.font.small,
    color: theme.colors.ink,
  },
  scores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(0.75),
  },
  chip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing(1.25),
    paddingVertical: 3,
  },
  chipText: {
    fontSize: theme.font.small,
    color: theme.colors.ink,
  },
});

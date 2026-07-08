import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { GameState } from '../game/types';
import { AVATARS, t } from '../i18n/nl';
import { theme } from '../theme';

/** Rustige kopregel: rondenummer, richttimer en de tussenstand. */
export function GameHeader({ state, onExit }: { state: GameState; onExit?: () => void }) {
  const storyteller = state.roundState
    ? state.players.find((p) => p.id === state.roundState!.storytellerId)
    : null;

  return (
    <View style={styles.wrap}>
      {onExit && (
        <Pressable onPress={onExit} style={styles.back} hitSlop={8} accessibilityLabel={t.common.back}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      )}
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1.5),
    gap: theme.spacing(1),
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  back: {
    position: 'absolute',
    left: theme.spacing(1.5),
    top: theme.spacing(1.5),
    padding: theme.spacing(1),
    zIndex: 2,
  },
  backText: {
    fontSize: theme.font.heading,
    color: theme.colors.inkSoft,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
  round: {
    fontSize: theme.font.body,
    color: theme.colors.ink,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  timer: {
    fontSize: theme.font.body,
    color: theme.colors.inkSoft,
    fontVariant: ['tabular-nums'],
  },
  timerLow: {
    color: theme.colors.danger,
    fontWeight: '700',
  },
  storyteller: {
    fontSize: theme.font.body,
    color: theme.colors.ink,
    fontWeight: '600',
    textAlign: 'center',
  },
  scores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
  chip: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.chip,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing(1.75),
    paddingVertical: theme.spacing(0.75),
  },
  chipText: {
    fontSize: theme.font.body,
    color: theme.colors.ink,
    fontWeight: '600',
  },
});

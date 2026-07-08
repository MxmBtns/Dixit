import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { Phase, Player } from '../game/types';
import { AVATARS, t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  player: Player;
  phase: Phase;
  onReady: () => void;
}

/**
 * Privacyscherm bij spelen op één telefoon: pas als de juiste speler
 * bevestigt, worden zijn kaarten getoond.
 */
export function HandoffScreen({ player, phase, onReady }: Props) {
  const note =
    phase === 'storytellerClue'
      ? t.handoff.storytellerNote
      : phase === 'playersSubmit'
        ? t.handoff.chooseNote
        : t.handoff.voteNote;

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>{AVATARS[player.avatar % AVATARS.length]}</Text>
      <Text style={styles.title}>{t.handoff.passTo(player.name)}</Text>
      <Text style={styles.note}>
        {player.name} {note}
      </Text>
      <Button label={t.handoff.ready(player.name)} onPress={onReady} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    gap: theme.spacing(1.5),
  },
  avatar: {
    fontSize: 64,
  },
  title: {
    fontSize: theme.font.heading,
    fontWeight: '700',
    color: theme.colors.ink,
    textAlign: 'center',
  },
  note: {
    fontSize: theme.font.body,
    color: theme.colors.inkSoft,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
    alignSelf: 'center',
    width: 360,
    maxWidth: '100%',
  },
});

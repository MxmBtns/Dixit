import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { CardGrid } from '../components/CardGrid';
import { Player } from '../game/types';
import { t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  player: Player;
  clue: string;
  onSubmit: (cardId: string) => void;
}

/** Een medespeler kiest de kaart uit zijn hand die het beste bij de hint past. */
export function SubmitScreen({ player, clue, onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.clueBox}>
        <Text style={styles.clueLabel}>{t.submit.theClueIs}</Text>
        <Text style={styles.clue}>“{clue}”</Text>
      </View>
      <Text style={styles.instruction}>{t.submit.instruction}</Text>
      <CardGrid cardIds={player.hand} selectedId={selected} onSelect={setSelected} />
      <Button label={t.submit.submit} onPress={() => selected && onSubmit(selected)} disabled={!selected} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    gap: theme.spacing(2),
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  clueBox: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radius.card,
    padding: theme.spacing(2),
    alignItems: 'center',
    gap: 4,
  },
  clueLabel: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  clue: {
    fontSize: theme.font.heading,
    fontWeight: '600',
    color: theme.colors.ink,
    textAlign: 'center',
  },
  instruction: {
    fontSize: theme.font.body,
    color: theme.colors.inkSoft,
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { CardGrid } from '../components/CardGrid';
import { Player, RoundState } from '../game/types';
import { t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  player: Player;
  round: RoundState;
  onVote: (cardId: string) => void;
}

/** Stemmen: welke tafelkaart was van de verteller? Eigen kaart is geblokkeerd. */
export function VotingScreen({ player, round, onVote }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const ownCard = round.submissions[player.id];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.clueBox}>
        <Text style={styles.clue}>“{round.clue}”</Text>
      </View>
      <Text style={styles.instruction}>{t.voting.instruction}</Text>
      <Text style={styles.note}>{t.voting.ownCardNote}</Text>
      <CardGrid
        cardIds={round.table}
        selectedId={selected}
        disabledIds={ownCard ? [ownCard] : []}
        badges={ownCard ? { [ownCard]: t.voting.yourCard } : undefined}
        onSelect={setSelected}
      />
      <Button label={t.voting.submit} onPress={() => selected && onVote(selected)} disabled={!selected} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    gap: theme.spacing(1.5),
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  clueBox: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radius.card,
    padding: theme.spacing(2),
    alignItems: 'center',
  },
  clue: {
    fontSize: theme.font.heading,
    fontWeight: '600',
    color: theme.colors.ink,
    textAlign: 'center',
  },
  instruction: {
    fontSize: theme.font.body,
    color: theme.colors.ink,
    textAlign: 'center',
    fontWeight: '600',
  },
  note: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
    textAlign: 'center',
  },
});

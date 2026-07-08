import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

import { Button } from '../components/Button';
import { CardGrid } from '../components/CardGrid';
import { Player } from '../game/types';
import { t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  storyteller: Player;
  onSubmit: (cardId: string, clue: string) => void;
}

/** De verteller kiest een kaart en schrijft er een hint bij. */
export function ClueScreen({ storyteller, onSubmit }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [clue, setClue] = useState('');

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{t.clue.youAreStoryteller}</Text>
        <Text style={styles.instruction}>{t.clue.instruction}</Text>
        <CardGrid cardIds={storyteller.hand} selectedId={selected} onSelect={setSelected} />
        <TextInput
          style={styles.input}
          value={clue}
          onChangeText={setClue}
          placeholder={t.clue.cluePlaceholder}
          placeholderTextColor={theme.colors.inkSoft}
          maxLength={120}
          multiline
        />
        <Button
          label={t.clue.submit}
          onPress={() => selected && onSubmit(selected, clue)}
          disabled={!selected || clue.trim().length === 0}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
    gap: theme.spacing(2),
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.font.heading,
    fontWeight: '700',
    color: theme.colors.ink,
    textAlign: 'center',
  },
  instruction: {
    fontSize: theme.font.body,
    color: theme.colors.inkSoft,
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.button,
    padding: theme.spacing(2),
    fontSize: theme.font.body,
    color: theme.colors.ink,
    minHeight: 56,
  },
});

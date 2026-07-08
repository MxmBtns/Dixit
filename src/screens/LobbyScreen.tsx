import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { NewPlayer } from '../game/engine';
import { BLITZ_SETTINGS, CLASSIC_SETTINGS, GameSettings, MAX_PLAYERS, MIN_PLAYERS } from '../game/types';
import { AVATARS, t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  onStart: (players: NewPlayer[], settings: GameSettings) => void;
  onBack: () => void;
}

/** Lobby voor spelen op één telefoon: spelers toevoegen en de modus kiezen. */
export function LobbyScreen({ onStart, onBack }: Props) {
  const [names, setNames] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [mode, setMode] = useState<'classic' | 'blitz'>('classic');

  const addPlayer = () => {
    const name = draft.trim();
    if (!name || names.length >= MAX_PLAYERS) return;
    setNames([...names, name]);
    setDraft('');
  };

  const removePlayer = (index: number) => {
    setNames(names.filter((_, i) => i !== index));
  };

  const start = () => {
    const players: NewPlayer[] = names.map((name, i) => ({
      id: `speler-${i + 1}`,
      name,
      avatar: i % AVATARS.length,
    }));
    onStart(players, mode === 'classic' ? CLASSIC_SETTINGS : BLITZ_SETTINGS);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.lobby.title}</Text>

      <Text style={styles.heading}>{t.lobby.playersHeading}</Text>
      <View style={styles.playerList}>
        {names.map((name, i) => (
          <Pressable key={`${name}-${i}`} style={styles.playerChip} onPress={() => removePlayer(i)}>
            <Text style={styles.playerChipText}>
              {AVATARS[i % AVATARS.length]} {name} ✕
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.addRow}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder={t.lobby.namePlaceholder}
          placeholderTextColor={theme.colors.inkSoft}
          onSubmitEditing={addPlayer}
          returnKeyType="done"
          maxLength={16}
        />
        <Button label="+" onPress={addPlayer} disabled={!draft.trim() || names.length >= MAX_PLAYERS} style={styles.addButton} />
      </View>
      {names.length < MIN_PLAYERS && <Text style={styles.hint}>{t.lobby.needPlayers(MIN_PLAYERS)}</Text>}
      {names.length >= MAX_PLAYERS && <Text style={styles.hint}>{t.lobby.maxPlayers(MAX_PLAYERS)}</Text>}

      <Text style={styles.heading}>{t.lobby.mode}</Text>
      <View style={styles.modes}>
        <ModeCard
          label={t.lobby.modeClassic}
          hint={t.lobby.modeClassicHint}
          selected={mode === 'classic'}
          onPress={() => setMode('classic')}
        />
        <ModeCard
          label={t.lobby.modeBlitz}
          hint={t.lobby.modeBlitzHint}
          selected={mode === 'blitz'}
          onPress={() => setMode('blitz')}
        />
      </View>

      <View style={styles.footer}>
        <Button label={t.lobby.start} onPress={start} disabled={names.length < MIN_PLAYERS} />
        <Button label="←" variant="ghost" onPress={onBack} />
      </View>
    </ScrollView>
  );
}

function ModeCard({ label, hint, selected, onPress }: { label: string; hint: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable style={[styles.modeCard, selected && styles.modeCardSelected]} onPress={onPress}>
      <Text style={[styles.modeLabel, selected && styles.modeLabelSelected]}>{label}</Text>
      <Text style={styles.modeHint}>{hint}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: theme.spacing(3),
    gap: theme.spacing(1.5),
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.font.title,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  heading: {
    fontSize: theme.font.small,
    fontWeight: '700',
    color: theme.colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: theme.spacing(1),
  },
  playerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
  },
  playerChip: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radius.chip,
    paddingHorizontal: theme.spacing(1.5),
    paddingVertical: theme.spacing(0.75),
  },
  playerChipText: {
    color: theme.colors.ink,
    fontSize: theme.font.body,
  },
  addRow: {
    flexDirection: 'row',
    gap: theme.spacing(1),
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.button,
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1.5),
    fontSize: theme.font.body,
    color: theme.colors.ink,
  },
  addButton: {
    paddingHorizontal: theme.spacing(2.5),
  },
  hint: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
  },
  modes: {
    flexDirection: 'row',
    gap: theme.spacing(1.5),
  },
  modeCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 2,
    borderColor: theme.colors.border,
    padding: theme.spacing(2),
    gap: 4,
  },
  modeCardSelected: {
    borderColor: theme.colors.accent,
  },
  modeLabel: {
    fontSize: theme.font.body,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  modeLabelSelected: {
    color: theme.colors.accent,
  },
  modeHint: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
  },
  footer: {
    marginTop: theme.spacing(2),
    gap: theme.spacing(1.5),
  },
});

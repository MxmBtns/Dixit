import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { t } from '../i18n/nl';
import { isFirebaseConfigured } from '../multiplayer/firebaseConfig';
import { theme } from '../theme';

interface Props {
  onBack: () => void;
  onPlayOnDevice: () => void;
}

function makeRoomCode(): string {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i += 1) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  return code;
}

/** Host creates a room, gets a shareable code, and waits for players to join. */
export function HostRoomScreen({ onBack, onPlayOnDevice }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState<string | null>(null);
  const online = isFirebaseConfigured();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t.hostRoom.title}</Text>
        <Text style={styles.subtitle}>{t.hostRoom.subtitle}</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={t.hostRoom.namePlaceholder}
          placeholderTextColor={theme.colors.inkSoft}
          maxLength={16}
        />

        {code ? (
          <View style={styles.codeBox}>
            <Text style={styles.codeLabel}>{t.hostRoom.roomCodeLabel}</Text>
            <Text style={styles.code}>{code}</Text>
            <Text style={styles.waiting}>{t.hostRoom.waiting}</Text>
            <Button label={t.hostRoom.newCode} variant="ghost" onPress={() => setCode(makeRoomCode())} />
          </View>
        ) : (
          <Button
            label={t.hostRoom.create}
            onPress={() => setCode(makeRoomCode())}
            disabled={!name.trim()}
          />
        )}

        {!online && <Text style={styles.notice}>{t.hostRoom.notReady}</Text>}
        {!online && (
          <Button label={t.hostRoom.startAnyway} variant="ghost" onPress={onPlayOnDevice} />
        )}
      </View>

      <Button label={t.hostRoom.back} variant="ghost" onPress={onBack} style={styles.back} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing(3),
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: theme.spacing(1.5),
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.font.title,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  subtitle: {
    fontSize: theme.font.body,
    color: theme.colors.inkSoft,
    marginBottom: theme.spacing(1),
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.button,
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1.5),
    fontSize: theme.font.body,
    color: theme.colors.ink,
  },
  codeBox: {
    backgroundColor: theme.colors.accentSoft,
    borderRadius: theme.radius.card,
    padding: theme.spacing(2.5),
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  codeLabel: {
    fontSize: theme.font.small,
    color: theme.colors.inkSoft,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  code: {
    fontSize: theme.font.title + 12,
    fontWeight: '700',
    color: theme.colors.accent,
    letterSpacing: 8,
  },
  waiting: {
    fontSize: theme.font.small + 1,
    color: theme.colors.inkSoft,
    textAlign: 'center',
  },
  notice: {
    fontSize: theme.font.small + 1,
    lineHeight: 19,
    color: theme.colors.inkSoft,
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  back: {
    alignSelf: 'center',
    width: 420,
    maxWidth: '100%',
  },
});

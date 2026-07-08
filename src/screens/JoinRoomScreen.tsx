import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../components/Button';
import { t } from '../i18n/nl';
import { isFirebaseConfigured } from '../multiplayer/firebaseConfig';
import { theme } from '../theme';

interface Props {
  onBack: () => void;
}

/** Player joins an existing room by entering the host's code. */
export function JoinRoomScreen({ onBack }: Props) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const online = isFirebaseConfigured();

  const codeValid = /^[A-Z]{4}$/.test(code.trim().toUpperCase());

  const join = () => {
    if (!codeValid) {
      setError(t.joinRoom.invalidCode);
      return;
    }
    setError(online ? null : t.joinRoom.notReady);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{t.joinRoom.title}</Text>
        <Text style={styles.subtitle}>{t.joinRoom.subtitle}</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={t.joinRoom.namePlaceholder}
          placeholderTextColor={theme.colors.inkSoft}
          maxLength={16}
        />
        <TextInput
          style={[styles.input, styles.codeInput]}
          value={code}
          onChangeText={(text) => {
            setCode(text.toUpperCase());
            setError(null);
          }}
          placeholder={t.joinRoom.codePlaceholder}
          placeholderTextColor={theme.colors.inkSoft}
          autoCapitalize="characters"
          maxLength={4}
        />

        <Button label={t.joinRoom.join} onPress={join} disabled={!name.trim() || !code.trim()} />

        {error && <Text style={styles.notice}>{error}</Text>}
        {!online && !error && <Text style={styles.notice}>{t.joinRoom.notReady}</Text>}
      </View>

      <Button label={t.joinRoom.back} variant="ghost" onPress={onBack} style={styles.back} />
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
  codeInput: {
    fontSize: theme.font.heading,
    fontWeight: '700',
    letterSpacing: 8,
    textAlign: 'center',
  },
  notice: {
    fontSize: theme.font.small + 1,
    lineHeight: 19,
    color: theme.colors.inkSoft,
    textAlign: 'center',
  },
  back: {
    alignSelf: 'center',
    width: 420,
    maxWidth: '100%',
  },
});

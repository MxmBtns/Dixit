import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CardView } from '../components/CardView';
import { Button } from '../components/Button';
import { t } from '../i18n/nl';
import { isFirebaseConfigured } from '../multiplayer/firebaseConfig';
import { theme } from '../theme';

interface Props {
  onPassAndPlay: () => void;
}

export function HomeScreen({ onPassAndPlay }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.fan}>
        <View style={{ transform: [{ rotate: '-9deg' }, { translateY: 10 }] }}>
          <CardView cardId="card-07" width={92} />
        </View>
        <View style={{ zIndex: 2 }}>
          <CardView cardId="card-23" width={104} />
        </View>
        <View style={{ transform: [{ rotate: '9deg' }, { translateY: 10 }] }}>
          <CardView cardId="card-58" width={92} />
        </View>
      </View>

      <Text style={styles.title}>{t.appName}</Text>
      <Text style={styles.tagline}>{t.tagline}</Text>

      <View style={styles.actions}>
        <Button label={t.home.passAndPlay} onPress={onPassAndPlay} />
        <Button
          label={t.home.online}
          variant="ghost"
          onPress={() => {
            if (!isFirebaseConfigured()) {
              Alert.alert(t.home.online, t.home.onlineSoon);
            }
          }}
        />
      </View>

      <View style={styles.rules}>
        <Text style={styles.rulesTitle}>{t.home.howToPlay}</Text>
        <Text style={styles.rulesText}>{t.home.rules}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    gap: theme.spacing(1),
  },
  fan: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: theme.font.title + 8,
    fontWeight: '700',
    color: theme.colors.ink,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: theme.font.body,
    color: theme.colors.inkSoft,
    marginBottom: theme.spacing(3),
  },
  actions: {
    alignSelf: 'stretch',
    maxWidth: 420,
    width: '100%',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
  },
  rules: {
    maxWidth: 420,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing(2),
    gap: theme.spacing(0.75),
  },
  rulesTitle: {
    fontSize: theme.font.body,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  rulesText: {
    fontSize: theme.font.small + 1,
    lineHeight: 20,
    color: theme.colors.inkSoft,
  },
});

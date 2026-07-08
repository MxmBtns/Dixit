import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CardView } from '../components/CardView';
import { Button } from '../components/Button';
import { NightSky } from '../components/NightSky';
import { t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  onPassAndPlay: () => void;
  onHostRoom: () => void;
  onJoinRoom: () => void;
  onHowToPlay: () => void;
}

export function HomeScreen({ onPassAndPlay, onHostRoom, onJoinRoom, onHowToPlay }: Props) {
  return (
    <View style={styles.root}>
      <NightSky />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.fan}>
        <View style={{ transform: [{ rotate: '-9deg' }, { translateY: 10 }] }}>
          <CardView cardId="card-02" width={92} />
        </View>
        <View style={{ zIndex: 2 }}>
          <CardView cardId="card-01" width={104} />
        </View>
        <View style={{ transform: [{ rotate: '9deg' }, { translateY: 10 }] }}>
          <CardView cardId="card-05" width={92} />
        </View>
      </View>

      <Text style={styles.title}>{t.appName}</Text>
      <Text style={styles.tagline}>{t.tagline}</Text>
      <Text style={styles.subTagline}>{t.subTagline}</Text>

        <View style={styles.actions}>
          <Button label={t.home.passAndPlay} onPress={onPassAndPlay} />
          <Button label={t.home.hostRoom} variant="ghostLight" onPress={onHostRoom} />
          <Button label={t.home.joinRoom} variant="ghostLight" onPress={onJoinRoom} />
          <Button label={t.home.howToPlay} variant="ghostLight" onPress={onHowToPlay} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#140a2e',
  },
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
    color: '#f7f3ff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    fontSize: theme.font.body,
    color: 'rgba(247, 243, 255, 0.82)',
  },
  subTagline: {
    fontSize: theme.font.small + 1,
    color: '#c4b3f0',
    fontStyle: 'italic',
    marginBottom: theme.spacing(3),
  },
  actions: {
    alignSelf: 'center',
    width: 420,
    maxWidth: '100%',
    gap: theme.spacing(1.5),
  },
});

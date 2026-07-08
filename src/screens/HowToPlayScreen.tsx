import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { t } from '../i18n/nl';
import { theme } from '../theme';

interface Props {
  onBack: () => void;
}

/** Explains the rules of the game, one step at a time. */
export function HowToPlayScreen({ onBack }: Props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.howToPlay.title}</Text>
      <Text style={styles.intro}>{t.howToPlay.intro}</Text>

      <View style={styles.steps}>
        {t.howToPlay.steps.map((step) => (
          <View key={step.title} style={styles.step}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepText}>{step.text}</Text>
          </View>
        ))}
      </View>

      <Button label={t.howToPlay.back} variant="ghost" onPress={onBack} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.font.title,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  intro: {
    fontSize: theme.font.body,
    lineHeight: 22,
    color: theme.colors.inkSoft,
  },
  steps: {
    gap: theme.spacing(1.5),
  },
  step: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing(2),
    gap: theme.spacing(0.5),
  },
  stepTitle: {
    fontSize: theme.font.body,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  stepText: {
    fontSize: theme.font.small + 1,
    lineHeight: 20,
    color: theme.colors.inkSoft,
  },
});

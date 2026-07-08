import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { theme } from '../theme';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'ghostLight';
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ label, onPress, variant = 'primary', disabled, style }: Props) {
  const surface =
    variant === 'primary' ? styles.primary : variant === 'ghostLight' ? styles.ghostLight : styles.ghost;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        surface,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          variant === 'ghost' && styles.ghostLabel,
          variant === 'ghostLight' && styles.ghostLightLabel,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.button,
    paddingVertical: theme.spacing(1.75),
    paddingHorizontal: theme.spacing(3),
    alignItems: 'center',
  },
  primary: {
    backgroundColor: theme.colors.accent,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ghostLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.28)',
  },
  disabled: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.75,
  },
  label: {
    color: '#ffffff',
    fontSize: theme.font.body,
    fontWeight: '600',
  },
  ghostLabel: {
    color: theme.colors.ink,
  },
  ghostLightLabel: {
    color: '#f7f3ff',
  },
});

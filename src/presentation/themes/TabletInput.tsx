// src/presentation/components/TabletInput.tsx
import React from 'react';
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from 'react-native';
import { Colors } from './Colors';
import { Spacing } from './Spacing';
import { Typography } from './Typography';

interface TabletInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const TabletInput: React.FC<TabletInputProps> = ({
  label,
  error,
  icon,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon: null, style]}
          placeholderTextColor={Colors.disabled}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.labelLarge,
    marginBottom: Spacing.xs,
    color: Colors.onSurface,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.outline,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    minHeight: 60,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  iconContainer: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.bodyLarge,
    color: Colors.onSurface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  errorText: {
    ...Typography.bodyMedium,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
});

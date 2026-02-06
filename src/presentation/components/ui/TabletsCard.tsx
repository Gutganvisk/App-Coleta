// src/presentation/components/TabletCard.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../themes/Colors';
import { Spacing } from '../../themes/Spacing';

interface TabletCardProps {
  children: React.ReactNode;
  elevated?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  style?: ViewStyle;
}

export const TabletCard: React.FC<TabletCardProps> = ({
  children,
  elevated = true,
  style,
}) => {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
});


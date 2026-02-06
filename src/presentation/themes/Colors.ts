// src/presentation/themes/Colors.ts
export const Colors = {
  // Cores principais (sua paleta)
  primary: "#2E7D32",
  primaryLight: "#4CAF50",
  primaryDark: "#1B5E20",

  // Neutros
  background: "#F5F5F5",
  surface: "#FFFFFF",
  onSurface: "#212121",
  outline: "#E0E0E0",
  disabled: "#BDBDBD",

  // Feedback
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  info: "#2196F3",

  // Específico para tablets
  touchTarget: "#2E7D32",
};

// src/presentation/themes/Typography.ts
export const Typography = {
  headlineLarge: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 40,
    color: Colors.onSurface,
  },
  headlineMedium: {
    fontSize: 28,
    fontWeight: "600" as const,
    lineHeight: 36,
    color: Colors.onSurface,
  },
  titleLarge: {
    fontSize: 22,
    fontWeight: "600" as const,
    lineHeight: 28,
    color: Colors.onSurface,
  },
  bodyLarge: {
    fontSize: 18,
    fontWeight: "400" as const,
    lineHeight: 24,
    color: Colors.onSurface,
  },
  bodyMedium: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 22,
    color: "#616161",
  },
  labelLarge: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 20,
    color: Colors.onSurface,
  },
};

// src/presentation/themes/Spacing.ts
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

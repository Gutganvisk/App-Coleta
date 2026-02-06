// src/presentation/themes/Typography.ts
/**
 * Sistema tipográfico otimizado para tablets de 10 polegadas
 * Foco em legibilidade em campo (possível uso sob sol forte)
 */

import { Platform } from "react-native";

// Famílias de fonte (ajuste conforme suas fontes instaladas)
export const FontFamily = {
  regular: Platform.select({
    ios: "System", // San Francisco no iOS
    android: "Roboto", // Roboto no Android
    default: "System",
  }),
  medium: Platform.select({
    ios: "System",
    android: "Roboto-Medium",
    default: "System",
  }),
  bold: Platform.select({
    ios: "System",
    android: "Roboto-Bold",
    default: "System",
  }),
  light: Platform.select({
    ios: "System",
    android: "Roboto-Light",
    default: "System",
  }),
} as const;

// Escala base para tablets (25% maior que mobile)
const TABLET_SCALE_FACTOR = 1.25;

// Função para escalar tamanhos para tablets
const scaleFont = (size: number, isTablet: boolean = true): number => {
  return isTablet ? size * TABLET_SCALE_FACTOR : size;
};

export const Typography = {
  // Títulos grandes (headlines)
  headlineLarge: {
    fontFamily: FontFamily.bold,
    fontSize: scaleFont(32), // 40px no tablet
    lineHeight: scaleFont(40), // 50px
    letterSpacing: 0,
    color: "#212121",
  } as const,

  headlineMedium: {
    fontFamily: FontFamily.bold,
    fontSize: scaleFont(28), // 35px
    lineHeight: scaleFont(36), // 45px
    letterSpacing: 0,
    color: "#212121",
  } as const,

  headlineSmall: {
    fontFamily: FontFamily.bold,
    fontSize: scaleFont(24), // 30px
    lineHeight: scaleFont(32), // 40px
    letterSpacing: 0,
    color: "#212121",
  } as const,

  // Títulos (titles)
  titleLarge: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(22), // 27.5px
    lineHeight: scaleFont(28), // 35px
    letterSpacing: 0,
    color: "#212121",
  } as const,

  titleMedium: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(18), // 22.5px
    lineHeight: scaleFont(24), // 30px
    letterSpacing: 0.15,
    color: "#212121",
  } as const,

  titleSmall: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(16), // 20px
    lineHeight: scaleFont(22), // 27.5px
    letterSpacing: 0.1,
    color: "#212121",
  } as const,

  // Corpo de texto (body)
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(18), // 22.5px
    lineHeight: scaleFont(26), // 32.5px
    letterSpacing: 0.5,
    color: "#424242",
  } as const,

  bodyMedium: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(16), // 20px
    lineHeight: scaleFont(24), // 30px
    letterSpacing: 0.25,
    color: "#424242",
  } as const,

  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: scaleFont(14), // 17.5px
    lineHeight: scaleFont(20), // 25px
    letterSpacing: 0.4,
    color: "#616161",
  } as const,

  // Labels e botões
  labelLarge: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(16), // 20px
    lineHeight: scaleFont(20), // 25px
    letterSpacing: 0.1,
    color: "#212121",
  } as const,

  labelMedium: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(14), // 17.5px
    lineHeight: scaleFont(18), // 22.5px
    letterSpacing: 0.5,
    color: "#212121",
  } as const,

  labelSmall: {
    fontFamily: FontFamily.medium,
    fontSize: scaleFont(12), // 15px
    lineHeight: scaleFont(16), // 20px
    letterSpacing: 0.5,
    color: "#212121",
  } as const,

  // Específico para uso em campo (alto contraste)
  field: {
    // Para labels em formulários
    label: {
      fontFamily: FontFamily.medium,
      fontSize: scaleFont(18), // 22.5px
      lineHeight: scaleFont(24), // 30px
      letterSpacing: 0.5,
      color: "#1B5E20", // Verde escuro para melhor contraste
    } as const,

    // Para valores/dados inseridos
    value: {
      fontFamily: FontFamily.regular,
      fontSize: scaleFont(20), // 25px
      lineHeight: scaleFont(28), // 35px
      letterSpacing: 0.25,
      color: "#000000", // Preto puro para máxima legibilidade
      fontWeight: "500" as const,
    } as const,

    // Para instruções/placeholder
    instruction: {
      fontFamily: FontFamily.light,
      fontSize: scaleFont(16), // 20px
      lineHeight: scaleFont(22), // 27.5px
      letterSpacing: 0.4,
      color: "#757575",
      fontStyle: "italic" as const,
    } as const,
  } as const,

  // Para botões (grandes e legíveis)
  button: {
    large: {
      fontFamily: FontFamily.medium,
      fontSize: scaleFont(20), // 25px
      lineHeight: scaleFont(24), // 30px
      letterSpacing: 0.5,
      color: "#FFFFFF",
      textTransform: "uppercase" as const,
    } as const,

    medium: {
      fontFamily: FontFamily.medium,
      fontSize: scaleFont(18), // 22.5px
      lineHeight: scaleFont(22), // 27.5px
      letterSpacing: 0.25,
      color: "#FFFFFF",
    } as const,

    small: {
      fontFamily: FontFamily.medium,
      fontSize: scaleFont(16), // 20px
      lineHeight: scaleFont(20), // 25px
      letterSpacing: 0.1,
      color: "#FFFFFF",
    } as const,
  } as const,

  // Para feedback (erros, sucesso, alertas)
  feedback: {
    error: {
      fontFamily: FontFamily.regular,
      fontSize: scaleFont(15), // 18.75px
      lineHeight: scaleFont(20), // 25px
      letterSpacing: 0.25,
      color: "#D32F2F", // Vermelho
    } as const,

    success: {
      fontFamily: FontFamily.regular,
      fontSize: scaleFont(15), // 18.75px
      lineHeight: scaleFont(20), // 25px
      letterSpacing: 0.25,
      color: "#388E3C", // Verde
    } as const,

    warning: {
      fontFamily: FontFamily.regular,
      fontSize: scaleFont(15), // 18.75px
      lineHeight: scaleFont(20), // 25px
      letterSpacing: 0.25,
      color: "#F57C00", // Laranja
    } as const,
  } as const,
} as const;

// Helper para criar estilos de texto consistentes
export const createTextStyle = (
  baseStyle: (typeof Typography)[keyof typeof Typography],
  overrides?: Partial<(typeof Typography)[keyof typeof Typography]>,
) => ({
  ...baseStyle,
  ...overrides,
});

// Tipos para TypeScript
export type TypographyType = typeof Typography;
export type TextStyle = ReturnType<typeof createTextStyle>;

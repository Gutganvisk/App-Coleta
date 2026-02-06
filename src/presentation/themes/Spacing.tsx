// src/presentation/themes/Spacing.ts
/**
 * Sistema de espaçamento otimizado para tablets de 10"
 * Baseado em múltiplos de 4px para consistência visual
 */

export const Spacing = {
  // Espaçamentos base (múltiplos de 4)
  xxxs: 2,   // 2px - para separação mínima
  xxs: 4,    // 4px - espaçamento interno mínimo
  xs: 8,     // 8px - padding interno pequeno
  sm: 12,    // 12px - para tablets (um pouco maior)
  md: 16,    // 16px - espaçamento padrão
  lg: 24,    // 24px - espaçamento entre seções
  xl: 32,    // 32px - espaçamento grande
  xxl: 48,   // 48px - espaçamento muito grande
  xxxl: 64,  // 64px - para áreas de destaque
  
  // Espaçamentos específicos para tablets
  tablet: {
    // Botões grandes para toque fácil
    button: {
      vertical: 20,    // 20px vertical
      horizontal: 32,  // 32px horizontal
      height: 64,      // 64px altura mínima
    },
    
    // Inputs otimizados para tablets
    input: {
      height: 60,      // 60px altura
      padding: 16,     // 16px padding interno
    },
    
    // Cards e containers
    card: {
      padding: 24,     // 24px padding interno
      margin: 16,      // 16px margem externa
      borderRadius: 16, // 16px border radius
    },
    
    // Para elementos de navegação
    navigation: {
      headerHeight: 80,    // 80px altura do header
      tabBarHeight: 72,    // 72px altura da tab bar
    },
  },
  
  // Métodos utilitários
  /**
   * Retorna espaçamento responsivo baseado na densidade do dispositivo
   * @param base - Valor base para mobile
   * @param tabletMultiplier - Multiplicador para tablets (padrão: 1.25)
   */
  responsive: (base: number, tabletMultiplier: number = 1.25): number => {
    // Em uma implementação real, você detectaria se é tablet
    // Por enquanto, usamos sempre o multiplicador
    return base * tabletMultiplier;
  },
  
  /**
   * Retorna padding vertical e horizontal
   */
  padding: (vertical: number, horizontal: number) => ({
    paddingVertical: vertical,
    paddingHorizontal: horizontal,
  }),
  
  /**
   * Retorna margin vertical e horizontal
   */
  margin: (vertical: number, horizontal: number) => ({
    marginVertical: vertical,
    marginHorizontal: horizontal,
  }),
  
  /**
   * Espaçamento consistente entre elementos de formulário
   */
  form: {
    labelMargin: 8,     // 8px abaixo do label
    fieldMargin: 16,    // 16px entre campos
    groupMargin: 24,    // 24px entre grupos
    buttonMargin: 32,   // 32px acima do botão
  },
  
  /**
   * Espaçamento para listas e grids
   */
  list: {
    itemMargin: 12,     // 12px entre itens
    sectionMargin: 24,  // 24px entre seções
    headerMargin: 16,   // 16px abaixo do header
  },
  
  /**
   * Para layout de telas
   */
  screen: {
    safeArea: 24,       // 24px safe area padrão
    contentPadding: 20, // 20px padding do conteúdo
    sectionSpacing: 32, // 32px entre seções da tela
  },
} as const;

// Tipo para autocompletar
export type SpacingType = typeof Spacing;

// Helper para criar espaçamentos consistentes
export const createSpacing = (multiplier: number = 1) => {
  return {
    // Multiplica todos os valores base
    xxxs: Spacing.xxxs * multiplier,
    xxs: Spacing.xxs * multiplier,
    xs: Spacing.xs * multiplier,
    sm: Spacing.sm * multiplier,
    md: Spacing.md * multiplier,
    lg: Spacing.lg * multiplier,
    xl: Spacing.xl * multiplier,
    xxl: Spacing.xxl * multiplier,
    xxxl: Spacing.xxxl * multiplier,
  };
};

// Espaçamento específico para densidade alta (tablets pequenos)
export const CompactSpacing = createSpacing(0.875);

// Espaçamento específico para tablets grandes (10"+)
export const TabletSpacing = createSpacing(1.25);

// Espaçamento para uso em campo (botões maiores)
export const FieldSpacing = {
  ...Spacing,
  button: {
    ...Spacing.tablet.button,
    height: 72, // Botões ainda maiores para uso em campo
    vertical: 24,
  },
  input: {
    ...Spacing.tablet.input,
    height: 68, // Inputs maiores para toque fácil
  },
};

// Exemplo de uso:
/*
import { Spacing } from '../themes/Spacing';

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md, // 16px
    marginBottom: Spacing.lg, // 24px
  },
  
  button: {
    paddingVertical: Spacing.tablet.button.vertical, // 20px
    paddingHorizontal: Spacing.tablet.button.horizontal, // 32px
    minHeight: Spacing.tablet.button.height, // 64px
  },
  
  // Para formulários
  formField: {
    marginBottom: Spacing.form.fieldMargin, // 16px
  },
  
  // Para uso em campo (botões maiores)
  fieldButton: {
    minHeight: FieldSpacing.button.height, // 72px
  },
});
*/
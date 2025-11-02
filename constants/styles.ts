/**
 * CSS-in-JS style constants for consistent styling across components
 * These map to CSS variables defined in globals.css
 */

export const cssColors = {
  primary: "var(--color-primary)",
  textPrimary: "var(--color-text-primary)",
  textSecondary: "var(--color-text-secondary)",
  textTertiary: "var(--color-text-tertiary)",
  background: "var(--color-background)",
  backgroundSecondary: "var(--color-background-secondary)",
  backgroundTertiary: "var(--color-background-tertiary)",
  skill1: "var(--color-skill-1)",
  skill2: "var(--color-skill-2)",
  skill3: "var(--color-skill-3)",
} as const;

export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
} as const;

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
} as const;

export const fontSize = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "32px",
  "5xl": "40px",
  "6xl": "48px",
} as const;

/**
 * Common style objects for reuse
 */
export const commonStyles = {
  button: {
    primary: {
      backgroundColor: cssColors.primary,
      color: cssColors.background,
    },
    secondary: {
      backgroundColor: cssColors.textPrimary,
      color: cssColors.background,
    },
  },
  card: {
    backgroundColor: cssColors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  heading: {
    color: cssColors.textPrimary,
    fontWeight: "bold" as const,
  },
  text: {
    primary: { color: cssColors.textPrimary },
    secondary: { color: cssColors.textSecondary },
    tertiary: { color: cssColors.textTertiary },
  },
} as const;

/**
 * Page-specific layout styles
 */
export const layoutStyles = {
  interviewPage: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: spacing.xl,
  },
  interviewHeader: {
    fontSize: fontSize["4xl"],
    fontWeight: "bold",
    marginBottom: spacing.sm,
    color: "#2c3e50",
  },
  interviewDescription: {
    fontSize: fontSize.base,
    color: "#7f8c8d",
  },
  maxWidthContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
  },
} as const;

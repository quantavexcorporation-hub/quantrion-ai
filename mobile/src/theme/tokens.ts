/**
 * Quantrion design tokens — mirrored from web `app/globals.css` (dark-first).
 * Do not invent a new brand; keep parity with the web platform.
 */
export const colors = {
  background: "#070B14",
  foreground: "#F1F5F9",
  card: "#0E1524",
  cardForeground: "#F1F5F9",
  primary: "#3B82F6",
  primaryForeground: "#FFFFFF",
  secondary: "#151D2E",
  secondaryForeground: "#F1F5F9",
  muted: "#151D2E",
  mutedForeground: "#94A3B8",
  accent: "#38BDF8",
  accentForeground: "#0B1220",
  destructive: "#EF4444",
  border: "#1A2438",
  input: "#1A2438",
  ring: "#3B82F6",
  sidebar: "#0A101C",
  blue: "#3B82F6",
  purple: "#38BDF8",
  green: "#22C55E",
  yellow: "#F59E0B",
  red: "#EF4444",
  overlay: "rgba(7, 11, 20, 0.72)",
  glassBorder: "rgba(59, 130, 246, 0.18)",
  glassFill: "rgba(14, 21, 36, 0.85)",
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const

export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 16,
  full: 999,
} as const

export const typography = {
  brand: 28,
  h1: 24,
  h2: 20,
  h3: 17,
  body: 15,
  caption: 13,
  tiny: 11,
} as const

export const touch = {
  min: 44,
} as const

export type ColorToken = keyof typeof colors

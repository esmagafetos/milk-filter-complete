import { Platform } from "react-native";

export const MilkFilters = {
  milk1: {
    colors: ["#000000", "#66001F", "#890092"] as const,
    name: "Milk 1",
  },
  milk2: {
    colors: ["#000000", "#5C243C", "#CB2B2B"] as const,
    name: "Milk 2",
  },
};

export const Colors = {
  primary: "#890028",
  primaryHover: "#8b0a2f",
  primaryForeground: "#fef5f8",
  
  background: {
    light: "#ffffff",
    dark: "#121212",
  },
  card: {
    light: "#fafafa",
    dark: "#171717",
  },
  foreground: {
    light: "#171717",
    dark: "#f5f5f5",
  },
  
  secondary: "#e3dcde",
  secondaryDark: "#2f2729",
  muted: "#e7e3e4",
  mutedForeground: {
    light: "#423a3c",
    dark: "#bfb3b5",
  },
  
  border: {
    light: "#e8e8e8",
    dark: "#292929",
  },
  
  glass: {
    primary: "rgba(255, 255, 255, 0.15)",
    secondary: "rgba(255, 255, 255, 0.10)",
    tertiary: "rgba(255, 255, 255, 0.08)",
    border: "rgba(255, 255, 255, 0.20)",
  },
  
  text: {
    primary: "rgba(255, 255, 255, 0.95)",
    secondary: "rgba(255, 255, 255, 0.75)",
    tertiary: "rgba(255, 255, 255, 0.55)",
  },
  
  buttonText: "#FFFFFF",
  tabIconDefault: "rgba(255, 255, 255, 0.55)",
  tabIconSelected: "#890028",
  link: "#890028",
  backgroundRoot: "transparent",
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  input: 12,
  button: 16,
  card: 20,
  large: 24,
  xl: 30,
  "2xl": 40,
  full: 9999,
};

export const Typography = {
  hero: {
    fontSize: 36,
    fontWeight: "700" as const,
  },
  h1: {
    fontSize: 28,
    fontWeight: "600" as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: "500" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 12,
    fontWeight: "400" as const,
  },
};

export const FontFamily = {
  poppinsRegular: "Poppins_400Regular",
  poppinsMedium: "Poppins_500Medium",
  poppinsSemiBold: "Poppins_600SemiBold",
  poppinsBold: "Poppins_700Bold",
  robotoRegular: "Roboto_400Regular",
  inter: "Inter_400Regular",
  jetbrainsMono: "JetBrainsMono_400Regular",
};

export const Shadows = {
  card: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  button: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  floating: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const AnimationTimings = {
  fast: 150,
  normal: 300,
  slow: 400,
  pageTransition: 350,
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

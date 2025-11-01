// hero.ts
import { heroui } from "@heroui/theme";

export default heroui({
  themes: {
    light: {
      colors: {
        background: "#ffffff",
        foreground: "#212121",
        primary: {
          50: "#fbe9e7",
          100: "#ffccbc",
          200: "#ffab91",
          300: "#ff8a65",
          400: "#ff7043",
          500: "#dc6b4a",
          600: "#c5563a",
          700: "#bf360c",
          800: "#a52a2a",
          900: "#8b0000",
          DEFAULT: "#dc6b4a",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#757575",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#26a69a",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#ffa726",
          foreground: "#ffffff",
        },
        danger: {
          DEFAULT: "#eb1544",
          foreground: "#ffffff",
        },
        focus: "#ff8a65",
      },
    },
    dark: {
      colors: {
        background: "#1a1a1a",
        foreground: "#fafafa",
        primary: {
          50: "#fbe9e7",
          100: "#ffccbc",
          200: "#ffab91",
          300: "#ff8a65",
          400: "#ff7043",
          500: "#dc6b4a",
          600: "#c5563a",
          700: "#bf360c",
          800: "#a52a2a",
          900: "#8b0000",
          DEFAULT: "#dc6b4a",
          foreground: "#ffffff",
        },
        focus: "#dc6b4a",
      },
    },
  },
});

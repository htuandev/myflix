import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  corePlugins: { container: false, wordBreak: false },
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addBase({});
      addComponents({
        ".container": {
          maxWidth: "1536px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: theme("spacing.4"),
          "@media (min-width: 1024px)": {
            padding: theme("spacing.8"),
          },
          "@media (min-width: 1280px)": {
            padding: theme("spacing.12"),
          },
        },
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ".animate-skeleton": {
          background:
            "linear-gradient(90deg,rgba(237 237 237 / 0.12) 25%,rgba(237 237 237 / 0.24) 50%,rgba(237 237 237 / 0.12) 75%)",
          backgroundSize: "400% 100%",
          animation: "skeleton 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
        ".text-heading": {
          marginBottom: theme("spacing.4"),
          fontSize: theme("fontSize.2xl"),
          lineHeight: theme("spacing.8"),
          fontWeight: theme("fontWeight.bold"),
          "@media (min-width: 768px)": {
            fontSize: theme("fontSize.3xl"),
            lineHeight: theme("spacing.9"),
          },
        },
        ".max-screen": {
          maxWidth: "1536px",
          marginLeft: "auto",
          marginRight: "auto",
        },
      });
      addUtilities({
        ".aspect-poster": {
          aspectRatio: "2/3",
        },
        ".break-words": {
          wordBreak: "break-word",
        },
      });
    }),
  ],
} satisfies Config;

export default config;

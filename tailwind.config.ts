import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bronto: {
          orange: "var(--bronto-orange)",
          "orange-hover": "var(--bronto-orange-hover)",
          yellow: "var(--bronto-yellow)",
          "yellow-hover": "var(--bronto-yellow-hover)",
          storm: "var(--bronto-storm)",
          "storm-surface": "var(--bronto-storm-surface)",
          "storm-border": "var(--bronto-storm-border)",
          "storm-divider": "var(--bronto-storm-divider)",
          matte: "var(--bronto-matte-black)",
          "matte-card": "var(--bronto-matte-card)",
          "matte-elevated": "var(--bronto-matte-elevated)",
          carbon: "var(--bronto-carbon)",
          graphite: "var(--bronto-graphite)",
          surface: "var(--bronto-surface)",
          border: "var(--bronto-border)",
          gray: "var(--bronto-gray)",
          "gray-light": "var(--bronto-gray-light)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.04em",
        wider: "0.08em",
        widest: "0.15em",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ticker": "ticker 35s linear infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.75" },
        },
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;


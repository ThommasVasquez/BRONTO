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
        storm: {
          DEFAULT: "var(--storm-base)",
          panel: "var(--storm-panel)",
          elevated: "var(--storm-elevated)",
          border: "var(--storm-border)",
        },
        matte: {
          DEFAULT: "var(--matte-base)",
          deep: "var(--matte-deep)",
          border: "var(--matte-border)",
        },
        safety: {
          DEFAULT: "var(--safety-orange)",
          hover: "var(--safety-orange-hover)",
        },
        bronto: {
          orange: "var(--safety-orange)",
          "orange-hover": "var(--safety-orange-hover)",
          yellow: "var(--safety-orange)",
          "yellow-hover": "var(--safety-orange-hover)",
          storm: "var(--storm-base)",
          "storm-surface": "var(--storm-panel)",
          "storm-border": "var(--storm-border)",
          matte: "var(--matte-base)",
          "matte-card": "var(--matte-base)",
          carbon: "var(--matte-base)",
          graphite: "var(--storm-base)",
          surface: "var(--storm-panel)",
          border: "var(--storm-border)",
          gray: "var(--bronto-gray)",
          "gray-light": "var(--bronto-gray-light)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-heading)", "Impact", "sans-serif"],
        heading: ["var(--font-heading)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.015em",
        wide: "0.03em",
        wider: "0.06em",
      },
    },
  },
  plugins: [],
};
export default config;

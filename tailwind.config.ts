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
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

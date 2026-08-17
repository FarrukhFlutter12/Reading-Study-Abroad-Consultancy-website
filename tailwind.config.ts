import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B1F4E", light: "#132C63", dark: "#071638" },
        gold: { DEFAULT: "#F5A623", light: "#FFC15E", dark: "#D4881A" },
        cream: "#FDFBF7",
        ink: "#0F172A",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
        script: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,31,78,.06), 0 8px 24px -12px rgba(11,31,78,.18)",
        lift: "0 12px 32px -12px rgba(11,31,78,.28)",
        chip: "0 4px 14px -6px rgba(11,31,78,.35)",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(rgba(255,255,255,.14) 1px, transparent 1px)",
        "navy-gradient":
          "linear-gradient(135deg, #071638 0%, #0B1F4E 45%, #132C63 100%)",
      },
      backgroundSize: {
        "dot-16": "16px 16px",
      },
      keyframes: {
        "pulse-ring": {
          "0%": { transform: "scale(.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(.4,0,.6,1) infinite",
        "fade-up": "fade-up .5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

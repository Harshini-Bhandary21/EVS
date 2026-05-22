/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDeep: "var(--bg-deep)",
        bgCard: "var(--bg-card)",
        accentGreen: "var(--accent-green)",
        accentBlue: "var(--accent-blue)",
        accentPurple: "var(--accent-purple)",
        neutralText: "var(--neutral-text)",
        borderMuted: "var(--border-muted)",
        cardTextMuted: "var(--card-text-muted)",
        headerText: "var(--header-text)",
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        brand: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        premium: 'var(--shadow-premium)',
        glowGreen: 'var(--shadow-glow-green)',
        glowBlue: 'var(--shadow-glow-blue)',
        glowPurple: 'var(--shadow-glow-purple)',
      },
    },
  },
  plugins: [],
}

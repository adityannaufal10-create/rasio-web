/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#0f172a',
        surfaceCard: 'rgba(30, 41, 59, 0.7)',
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        emeraldGlow: '#10b981',
        cyanGlow: '#06b6d4',
        amberWarning: '#f59e0b',
        crimsonDanger: '#ef4444',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

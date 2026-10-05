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
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap, 1rem)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap, 1rem)))' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'border-beam': 'border-beam var(--duration, 14s) infinite linear',
        'marquee': 'marquee var(--duration, 30s) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration, 30s) linear infinite',
        'fade-in': 'fade-in 0.3s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

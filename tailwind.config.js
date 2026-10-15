/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#060709',
          900: '#0B0C0F',
          850: '#101216',
          800: '#16191E',
          700: '#22262D',
        },
        paper: '#EDEDE6',
        muted: '#8C9099',
        signal: '#C6FF3D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'fluid-hero': ['clamp(3.5rem, 13vw, 12rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'fluid-xl': ['clamp(2.25rem, 5.5vw, 4.75rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'fluid-lg': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

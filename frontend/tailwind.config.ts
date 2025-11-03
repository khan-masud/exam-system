import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          foreground: '#ffffff',
        },
        accent: '#34d399',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
      backdropBlur: {
        64: '64px',
      },
    },
  },
  plugins: [animate],
};

export default config;

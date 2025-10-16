/** @type {import('tailwindcss').Config} */
import tokens from './src/shared/theme/colors.json';

module.exports = {
  content: ['./App.{ts,tsx,js,jsx}', './src/**/*.{ts,tsx,js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: tokens.primary,
        surface: tokens.surface,
        line: tokens.line,
        text: tokens.text,
      },
      // 🧱 Radii (rounded cards & pill buttons)
      borderRadius: {
        xl: 16,
        '2xl': 20,
        '3xl': 28, // the card corners in your screenshot
        pill: 999, // for extra-round buttons if needed
      },

      // 📏 Spacing (fills common RN gaps)
      spacing: {
        13: 52, // py-13, etc.
        15: 60, // px-15
        18: 72,
      },

      // 🔤 Type scale (comfortable mobile sizes)
      fontSize: {
        display: 40,
        h1: 26,
        body: 18,
        label: 17,
        sm: 12,
        md: 16,
      },
      lineHeight: {
        display: '34px',
        h1: '28px',
        body: '22px',
        label: '18px',
        sm: '16px',
      },

      // ☁️ Subtle elevation similar to your card
      boxShadow: {
        card: '0 6px 24px rgba(17, 24, 39, 0.08)',
      },
    },
  },
  plugins: [],
};

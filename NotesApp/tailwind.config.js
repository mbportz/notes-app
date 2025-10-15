/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx,js,jsx}', './src/**/*.{ts,tsx,js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#853ced', // main brand
          400: '#ac8bfa',
          500: '#925cf6',
          600: '#853ced',
        },
        surface: {
          // backgrounds
          50: '#F7F6FB', // page bg tint
          100: '#FFFFFF', // cards
        },
        line: {
          // borders / hairlines
          200: '#E7E4F1',
          300: '#D9D6E6',
        },
        text: {
          // copy
          DEFAULT: '#111827', // headings
          muted: '#6B7280', // subtitles / helper
          inverse: '#FFFFFF', // on brand
        },
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

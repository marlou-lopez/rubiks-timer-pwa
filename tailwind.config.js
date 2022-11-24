/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // mobile landscape
        'mobile-ls': { raw: '(max-height: 450px)' },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

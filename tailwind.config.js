/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#14213D',
      },
    },
  },
  plugins: [],
  variants: {
    textColor: ['group-hover', 'hover'],
  },
};

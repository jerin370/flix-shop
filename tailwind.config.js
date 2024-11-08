/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix': {
          red: '#E50914',
          black: '#141414',
          'dark-gray': '#181818',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class', // class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: '#0d5c5c',
        brand: '#214F78',
        muted: '#c7adab'

      }
    }
  },
  plugins: []
}


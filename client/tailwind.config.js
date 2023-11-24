/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'comingsoon': ['Coming Soon', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        'primary': '#f5f6fa'
      }
    },
  },
  plugins: [],
}


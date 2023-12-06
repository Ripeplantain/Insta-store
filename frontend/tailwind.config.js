/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
        comingSoon: ["Coming Soon", "cursive"],
      },
      colors: {
        primary: "#ffffff",
      }
    },
  },
  plugins: [],
}


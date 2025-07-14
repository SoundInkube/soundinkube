/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix-black': '#000000',
        'netflix-dark': '#141414',
        'netflix-red': '#E50914',
        'netflix-gray': '#757575',
      },
    },
  },
  plugins: [],
}

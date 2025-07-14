/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // COMPLETELY OVERRIDE ALL COLORS WITH NETFLIX THEME
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      gray: {
        50: '#000000',
        100: '#141414',
        200: '#2a2a2a',
        300: '#333333',
        400: '#555555',
        500: '#757575',
        600: '#757575',
        700: '#333333',
        800: '#141414',
        900: '#000000',
      },
      red: {
        500: '#E50914',
        600: '#b8070f',
        700: '#b8070f',
      },
      // FORCE ALL OTHER COLORS TO NETFLIX THEME
      green: {
        500: '#E50914',
        600: '#b8070f',
        700: '#b8070f',
      },
      blue: {
        500: '#E50914',
        600: '#b8070f',
        700: '#b8070f',
      },
      yellow: {
        500: '#E50914',
        600: '#b8070f',
        700: '#b8070f',
      },
      purple: {
        500: '#E50914',
        600: '#b8070f',
        700: '#b8070f',
      },
      pink: {
        500: '#E50914',
        600: '#b8070f',
        700: '#b8070f',
      },
      indigo: {
        500: '#E50914',
        600: '#b8070f',
        700: '#b8070f',
      },
      netflix: {
        black: '#000000',
        dark: '#141414',
        red: '#E50914',
        gray: '#757575',
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      mono: ['Inter', 'monospace'],
      serif: ['Inter', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}

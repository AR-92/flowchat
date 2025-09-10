/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./partials/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#030204',
          900: '#0a0a0f',
          800: '#121218',
          700: '#1a1a24',
          600: '#2d2d3a',
        },
        accent: {
          900: '#4a26b0',
          700: '#6b3cff',
          500: '#9b5cff',
          400: '#a770ff',
          300: '#b485ff',
        },
        light: {
          900: '#f0f2f5',
          700: '#c9cccf',
          500: '#a0a5aa',
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(155, 92, 255, 0.2)',
        'glow-lg': '0 0 40px rgba(155, 92, 255, 0.3)',
        'card': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-fast': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'twinkle': 'twinkle 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
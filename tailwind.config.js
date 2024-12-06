/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        finger: ['Finger Paint', 'cursive'],
      },
      fontWeight: {
        'extrabold': 900,
      },
    },
  },
  plugins: [],
}


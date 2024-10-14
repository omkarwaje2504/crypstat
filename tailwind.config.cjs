/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      'montserrat': ['Montserrat'],
      'lato': ['Lato'],
      'garamond': ['Garamond'],
      'mono': ['Playfair Display']
  },
    extend: {
      colors: {
        // blue shades
        'blue-primary': '#04031e',
        'blue-secondary': '#010504',
        'blue-tertiary': '#3B5998',
        // green shades
        'green-primary': '#185E36',
        'green-secondary': '#389E6A',
        'green-tertiary': '#2D882D',
        // purple shades
        'purple-primary': '#5C2E91',
        'purple-secondary': '#7C3AED',
        'purple-tertiary': '#692CC6',
      },
    },
  },
  plugins: [],
}

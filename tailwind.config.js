/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // "primary": "#0A192F",
        "primary": "#0A192F",
        // "secondary":"#0A192F",
        "secondary":"#C84B31",
        // "tertiary":"#96E9C6"
        "tertiary":"#03C988"
      }
    },
    screens: {
      'lg': {'max': '2023px'},

      'sm': {'max': '1000px'},
      
    }
  },
  plugins: [],
}

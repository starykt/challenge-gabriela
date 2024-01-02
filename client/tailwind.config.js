/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-dark': '#0F0F0F',
        'label-geography': '#C26719',
        'label-biology': '#CC4090',
        'label-art': '#05A2C2',
        'label-sociology': '#9B19C2',
        'button-confirm': '#efff54',
        'button-confirmed': '#E9FF1A'
      },
    },
  },
  plugins: [],
}
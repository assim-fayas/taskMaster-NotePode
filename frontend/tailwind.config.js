/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    colors: {

      'base': '#240A34',
      'customcard': '#faedcd'


    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


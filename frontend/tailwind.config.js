/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily:{
        ubuntu:['Ubuntu', 'system-ui']
      }
    },
  },
  plugins: [],
}


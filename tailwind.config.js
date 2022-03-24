module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'background': '#F9F9F9'
      },
      fontFamily: {
        content: ['Lora']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

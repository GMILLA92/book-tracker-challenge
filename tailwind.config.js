// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#4D869C',
        secondary: '#7AB2B2',
        accent: '#EEF7FF',
        neutral: '#CDE8E5',
        base: '#003C43' // Added base color as well
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

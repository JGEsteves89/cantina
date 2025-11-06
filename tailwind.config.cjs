const theme = require('./src/client/theme.config.js');
/** @type {import('tailwindcss').Config} */
module.exports = {
  ...theme,
  plugins: [require('tailwindcss-animate')],
};



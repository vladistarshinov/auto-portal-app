const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      xs: '1rem',
      sm: '1.1rem',
      tiny: '1.19rem',
      base: '1.27rem',
      lg: '1.4rem',
      xl: '1.64rem',
      '2xl': '1.825rem',
      '3xl': '2.2rem',
      '4xl': '2.7rem',
      '5xl': '3.25rem',
      '6xl': '4.3rem',
      '7xl': '5.8rem'
    },
    extend: {
      colors: {
        primary: '#5F3DF7'
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      },
      transitionDuration: {
        DEFAULT: '350ms'
      }
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.flex-center-between': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        },
        '.flex-center-center': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      })
    })
  ],
}

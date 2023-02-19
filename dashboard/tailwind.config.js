const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      xs: '.85rem',
      sm: '1rem',
      tiny: '1.15rem',
      base: '1.25rem',
      lg: '1.5rem',
      xl: '1.75rem',
      '2xl': '1.85rem',
      '3xl': '2.25rem',
      '4xl': '2.5rem',
      '5xl': '3rem',
      '6xl': '4.25rem',
      '7xl': '5.5rem'
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
    plugin(({ addUtilities, addComponents }) => {
      addComponents({
        '.shadow-icon': {
          display: 'flex',
          padding: '0.4rem',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          transition: 'box-shadow .4s ease-in-out',
          boxShadow: '0 4px 10px rgba(45, 8, 125, 0.2)',
          color: '#353538',
          borderRadius: '50%',
          backgroundColor: '#fff',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(45, 8, 125, 0.26)'
          }
        }
      }),
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

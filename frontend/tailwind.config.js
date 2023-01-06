const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const primary = "#A5A6F6"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary,
      dark: colors.dark,
      white: colors.white,
      transparent: colors.transparent,
      gray: {
        500: '#999AA5',
        600: '#66676E',
        900: '#191B1F'
      }
    },
    extend: {
      fontSize: {
        "lg": "1rem",
      },
      transitionTimingFunction: {
        DEFAULT: 'ease-in-out'
      },
      transitionDuration: {
        DEFAULT: '500ms'
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4'
      },
      keyFrames: {
        fade: {
          from: {opacity: 0},
          to: {opacity: 1}
        },
        scaleIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.75)'
          },
          '50%': {
            opacity: 0.25,
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        fade: 'fade .5s ease-in-out',
        scaleIn: 'scaleIn .4s ease-in-out',
      }
    },
  },
  plugins: [
      plugin(({ addComponents, theme, addUtilities }) => {
        addComponents({
          '.btn-primary': {
            backgroundColor: primary,
            borderRadius: '0.8rem',
            boxShadow: "none",
            textTransform: "uppercase",
            fontSize: "0.75rem",
            transition: "background-color .3s ease-in-out",
            "&:hover": {
              backgroundColor: theme.colors.dark,
              color: "#fff",
            },
            "&:focus": {
              outline: "none",
            },
          },
          ".text-link": {
            textUnderlineOffset: 4,
            color: "rgba(255, 255, 255, .9)",
            transition: "text-decoration-color .3s ease-in-out",
            textDecorationLine: "underline",
            textDecorationColor: "rgba(255, 255, 255, 0.2)",
            "&:hover": {
              textDecorationColor: "rgba(255, 255, 255, 0.9)",
            },
          },

          ".air-block": {
            borderRadius: theme("borderRadius.layout"),
            backgroundColor: theme("colors.gray.950"),
            color: theme("colors.white"),
            boxShadow: theme("boxShadow.lg"),
          },
        }),
        addUtilities({
          ".text-shadow": {
            textShadow: "1px 1px rgba(0, 0, 0, 0.4)",
          },

          ".outline-border-none": {
            outline: "none",
            border: "none",
          },

          ".flex-center-between": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          },

          ".image-like-bg": {
            objectPosition: "center",
            objectFit: "cover",
            pointerEvents: "none",
          },
        });
      }),
  ],
};

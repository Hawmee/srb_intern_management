import defaultTheme from 'tailwindcss/defaultTheme'
import { nextui } from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        'dark-100':'#4B5563'
      },
      fontFamily:['system-ui', ...defaultTheme.fontFamily.sans] ,
    },
  },
  plugins: [ nextui({
    themes: {
      light: {
        colors: {
          dark: {
            DEFAULT: "#4B5563",
            foreground: "#FFFFFF", // Assuming you want white text on dark background
          },
          // ... other colors
        },
      },
      dark: {
        colors: {
          dark: {
            DEFAULT: "#4B5563",
            foreground: "#FFFFFF",
          },
          // ... other colors
        },
      },
    },
  })],
}


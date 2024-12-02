/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../libs/ui/**/*.{js,ts,jsx,tsx}', // Add the ui package
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1720px',
    },
    extend: {
      // fontFamily: {
      //   sans: ['Inter', ...defaultTheme.fontFamily.sans],
      // },
      colors: {
        primary: {
          DEFAULT: '#0e82fd', // You can adjust this color
          foreground: '#FFFFFF',
          darkforeground: '#0049ff',
          50: '#e9e9ef',
          100: '#d2d4df',
          200: '#a5a9c0',
          300: '#787da0',
          400: '#4b5281',
          500: '#1e2761',
          600: '#181f4e',
          700: '#12173a',
          800: '#0c1027',
          900: '#060813',
        },
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

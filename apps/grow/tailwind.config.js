/** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: 'class',
//   content: [
//     './pages/**/*.{js,ts,jsx,tsx}',
//     './components/**/*.{js,ts,jsx,tsx}',
//     './app/**/*.{js,ts,jsx,tsx}',
//     './src/**/*.{js,ts,jsx,tsx}',
//     '../../libs/ui/**/*.{js,ts,jsx,tsx}', // Add the ui package
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           DEFAULT: '#1e2761', // You can adjust this color
//           foreground: '#FFFFFF',
//           darkforeground: '#4759cd',
//           50: '#e9e9ef',
//           100: '#d2d4df',
//           200: '#a5a9c0',
//           300: '#787da0',
//           400: '#4b5281',
//           500: '#1e2761',
//           600: '#181f4e',
//           700: '#12173a',
//           800: '#0c1027',
//           900: '#060813',
//         },
//       },
//     },
//   },
//   plugins: [],
// };

//ref https://github.com/cvrlnolan/turborepo-tailwindcss/blob/main/packages/config/tailwind.config.js

// const a = require('@grow/config');
// const { tailwindConfig } = require('@grow/config');

const tailwindConfig = require('../../libs/config/src/lib/tailwind.config');

module.exports = { ...tailwindConfig };

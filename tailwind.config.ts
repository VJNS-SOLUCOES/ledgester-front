/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: '',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}',
  ],
  theme: {
    colors: {
      ...colors,
      primary: '#0078FF',
      secondary: '#000000',
      white: '#FFFFFF',
      alert: '#FFA217',
      orange: '#FD4F00',
      green: '#005D63',
      'w-high': '#DDDDDD',
      red: '#B70B0B',
      blue: '#135D99',
      'light-green': '#54B21A',
    },
    extend: {
      keyframes: {
        toRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(1.5rem)' },
        },
        ripple: {
          '0%': { width: '96px' },
          '100%': { width: '204px' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        opacityCustom: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        timeToReload: {
          '0%': { width: 0, opacity: 0 },
          '100%': { width: '100%', opacity: 0.6 },
        },
        update: {
          '30%': {
            opacity: 0.3,
          },
          '0%, 100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        ripple: 'ripple 0.3s ease 1 forwards',
        toRight: 'toRight 0.3s ease 1 forwards',
        wiggle: 'wiggle 1s ease-in-out infinite',
        opacityCustom: 'opacityCustom 0.5s ease-in-out',
        timeToReload: 'timeToReload 20s ease infinite',
        update: 'update 1s ease-in-out',
      },
    },
  },
  plugins: [],
};

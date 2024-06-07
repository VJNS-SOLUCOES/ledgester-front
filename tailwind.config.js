/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
   colors: {
      ...colors,
      alert: '#FFA217',
      orange: '#FD4F00',
      green: '#005D63',
      primary: '#0D245E',
      'primary-variant': '#FFA889',
      secondary: '#0051A8FF',
      'w-high': '#DDDDDD',
      'w-t30': 'rgba(255, 255, 255, 0.3)',
      'w-t60': 'rgba(255, 255, 255, 0.6)',
      white: '#FFFFFF',
      red: '#B70B0B',
      blue: '#135D99',
      'light-green': '#54B21A',
    },
  extend: {
     keyframes: {
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
        wiggle: 'wiggle 1s ease-in-out infinite',
        opacityCustom: 'opacityCustom 0.5s ease-in-out',
        timeToReload: 'timeToReload 20s ease infinite',
        update: 'update 1s ease-in-out',
      },
  },
};
export const plugins = [];


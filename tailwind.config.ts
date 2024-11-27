module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      boxShadow: {
        card: '0px 4px 14px 0px rgba(0, 0, 0, 0.10);',
      },
      maxWidth: {
        '8xl': '82.5rem',
      },
      colors: {
        main: {
          DEFAULT: '#0077FF',
          200: '#0048D9',
          300: '#989898',
          400: '#D9D9D9',
        },
        secondary_light: {
          DEFAULT: '#FFFFFF',
          200: '#F5F5F5',
        },
        secondary_dark: {
          DEFAULT: '#333333',
          200: '#121212',
        },
        tertiary_light: {
          DEFAULT: '#585858',
          300: '#A5A5AE',
          200: '#FAFBFF',
        },
        tertiary_dark: {
          DEFAULT: '#DEDEDE',
        },
        main_red: {
          DEFAULT: '#FF3B30',
        },
      },
      keyframes: {
        toRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(1.5rem)' },
        },
        open: {
          '0%': { width: '96px' },
          '100%': { width: '300px' },
        },
        retract: {
          '0%': { width: '300px' },
          '100%': { width: '96px' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        timeToReload: {
          '0%': { width: 0, opacity: 0 },
          '100%': { width: '100%', opacity: 0.6 },
        },
        appear: {
          '0%': {
            opacity: 0.1,
          },
          '100%': {
            opacity: 1,
          },
        },
        disappear: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
      },
      animation: {
        open: 'open 0.3s ease 1 forwards',
        retract: 'retract 0.3s ease 1 forwards',
        toRight: 'toRight 0.3s ease 1 forwards',
        wiggle: 'wiggle 1s ease-in-out infinite',
        timeToReload: 'timeToReload 20s ease infinite',
        appear: 'appear 0.3s ease-in-out forwards',
        disappear: 'disappear 0.1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};

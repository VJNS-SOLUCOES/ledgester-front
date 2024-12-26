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
        card: '0px 0px 15px 1px rgba(0, 0, 0, 0.15)',
        card_bold:
          ' rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;',
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
        open: {
          '0%': { width: '80px' },
          '100%': { width: '300px' },
        },
        retract: {
          '0%': { width: '300px' },
          '100%': { width: '80px' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        timeToReload: {
          '0%': { width: 0, opacity: 0 },
          '100%': { width: '100%', opacity: 0.6 },
        },
        spin: {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(180deg)',
          },
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
        'fly-in': {
          '0%': {
            opacity: '0',
            transform: 'scale3d(0.3, 0.3, 0.3)',
            transitionTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },
          '20%': {
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          '40%': {
            transform: 'scale3d(0.9, 0.9, 0.9)',
          },
          '60%': {
            opacity: '1',
            transform: 'scale3d(1.03, 1.03, 1.03)',
          },
          '80%': {
            transform: 'scale3d(0.97, 0.97, 0.97)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
        },
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
        'zoom-in': {
          '0%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },
          '80%': {
            opacity: 0.8,
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        open: 'open 0.2s ease 1 forwards',
        retract: 'retract 0.3s ease 1 forwards',
        wiggle: 'wiggle 1s ease-in-out infinite',
        spin: 'spin 0.6s ease forwards',
        timeToReload: 'timeToReload 20s ease infinite',
        appear: 'appear 0.3s ease-in-out forwards',
        disappear: 'disappear 0.2s ease-in-out forwards',
        flyin: 'fly-in 0.4s ease-in-out 1 forwards',
        shake: 'shake 0.5s ease-in-out forwards',
        zoomIn: 'zoom-in 0.5s ease-out 1 forwards',
      },
    },
  },
  plugins: [],
};

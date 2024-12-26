// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@nuxt/ui', { global: true }],
    '@sidebase/nuxt-pdf',
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],

  ssr: false,

  app: {
    head: {
      title: 'Ledgester',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/LEDGESTER_Simbolo-Azul.png' }],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Ledgester',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  },

  // @ts-ignore
  target: 'static',

  css: ['~/assets/css/global.css'],
  plugins: ['~/plugins/plugins.ts'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    app: {
      baseUrl: process.env.BASE_URL,
    },
    public: {
      baseUrl: process.env.BASE_URL,
    },
  },

  build: {
    transpile: ['@vuepic/vue-datepicker'],
  },

  compatibilityDate: '2024-08-01',
});

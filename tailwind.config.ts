module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
          boxShadow: {
            card: "0px 4px 14px 0px rgba(0, 0, 0, 0.10);",
          },
          maxWidth: {
            "8xl": "82.5rem",
          },
          colors: {
            main: {
              DEFAULT: "#262626",
              500: "#262626",
              600: "#171717",
            },
            secondary: {
              DEFAULT: "#FFFFFF",
              200: "#FFFFFF",
              300: "#FFFFFF",
              400: "#FFFFFF",
              500: "#FFFFFF",
              600: "#FFFFFF",
              700: "#FFFFFF",
              800: "#FFFFFF",
            },
          },
        },
      },
    plugins: [],
}
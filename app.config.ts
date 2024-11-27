export default defineAppConfig({
  ui: {
    primary: 'main',
    gray: 'neutral',
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 right-0',
    },
    input: {
      color: {
        white: {
          outline:
            'shadow-sm bg-tertiary_light-200 dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-main-200 dark:focus:ring-primary-400',
        },
      },
    },
  },
});

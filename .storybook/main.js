module.exports = {
  webpackFinal(config, options) {
    config = options.nuxtStorybookConfig.webpackFinal(config, options)
    return config;
  },

  addons: [
    /**
     * Accessibility
     * https://github.com/storybookjs/storybook/tree/master/addons/a11y
     */
    '@storybook/addon-a11y',

    /**
     * Designs (Figma)
     * https://github.com/pocka/storybook-addon-designs
     */
    'storybook-addon-designs',

    {
      name: '@storybook/addon-essentials',
      options: {
        /**
         * TODO: Resolve path issues with aliases in docs add-on.
         * Uncommenting the next line turns the log errors off by deactivating
         * the docs add-on.
         */
        // docs: false,
      }
    },
  ],

  stories: ['../components/**/*.stories.ts'],

  typescript: {
    check: false,
    checkOptions: {},
  },
}

const path = require('path');

module.exports = {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
    '../lib/**/*.stories.mdx',
    '../lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-designs',
    'storybook-css-modules-preset',
    'storybook-addon-next-router',
    // 'storybook-addon-css-user-preferences',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },

  webpackFinal: async (config, { configType }) => {
    // Add the following lines
    config.resolve.alias = {
      ...config.resolve.alias,
      $components: path.resolve(__dirname, '../components'),
      $lib: path.resolve(__dirname, '../lib'),
      $utils: path.resolve(__dirname, '../utils'),
      $hooks: path.resolve(__dirname, '../hooks'),
      $context: path.resolve(__dirname, '../context'),
      $styles: path.resolve(__dirname, '../styles'),
      $public: path.resolve(__dirname, '../public'),
    };
    // Return the updated config
    return config;
  },
};

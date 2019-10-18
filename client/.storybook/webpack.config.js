module.exports = function ({ config }) {
    config.module.rules.push({
        test: /\.stories\.tsx?$/,
        loaders: [require.resolve('@storybook/source-loader')],
        enforce: 'pre',
    });

    return config;
};
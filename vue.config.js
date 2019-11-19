module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      disableHostCheck: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          // pathRewrite: { '^/api': '' },
        },
      },
    },
  },
};

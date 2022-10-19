const config = {
  // 是否在儲存時lint
  lintOnSave: false,
  // 公用路徑
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  // 建置前端靜態檔案時要擺放的目錄
  outputDir: process.env.VUE_APP_OUTPUT_DIR,
  devServer: {
    // 本地提供https憑證
    https: {
      key: process.env.VUE_APP_DEV_SSL_KEY,
      cert: process.env.VUE_APP_DEV_SSL_CERT,
    },
    // 開發server的domain和port
    host: process.env.VUE_APP_DEV_HOST,
    port: process.env.VUE_APP_DEV_PORT,
    // API請求代理
    // proxy: {
    //   '/api': {
    //     target: 'https://coolbe-dev.coolbe.com.tw/',
    //     pathRewrite: { '^/api': '' },
    //     changeOrigin: true,
    //     ws: true,
    //     cookieDomainRewrite: {
    //       'https://coolbe-dev.coolbe.com.tw/': 'localhost:8090'
    //     }
    //   },
    // },
    // disableHostCheck: process.env.NODE_ENV === "development" ? true : false,
  },
  // 打包時不生成.map文件
  productionSourceMap: process.env.NODE_ENV === "development" ? true : false,
  css: {
    // extract: true,
    // 引入全局sass變量檔
    loaderOptions: {
      sass: {
        prependData: `@import "~@/style/_variables.sass"`,
      },
    },
  },
  chainWebpack: (config) => {
    // if(process.env.NODE_ENV === "development") config.plugins.delete("preload");
    // 將小於10kb的資源內聯
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 10240 }));
  },
};

if (process.env.VUE_APP_DEV_HTTPS === "false") delete config.devServer.https;

module.exports = config;

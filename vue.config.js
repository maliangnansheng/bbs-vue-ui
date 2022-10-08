const CompressionPlugin = require('compression-webpack-plugin');
const createThemeColorReplacerPlugin = require('./src/config/config');

const env = process.env;
const vueConfig = {
  publicPath: env.BASE_URL,
  // 开发环境的跨域配置
  devServer: {
    before(app) {
      // TODO: 临时拦截全局配置请求，后续后台开发好配置功能再删除(因为当前vue-router使用的是history模式，所以在开发服务器层面做一下拦截，如果是hash模式，那就不需要这一步)
      app.get('/config', function (req, res) {
        // 由于cmd的缓存机制，修改配置后需要重启项目才能生效
        const configJSON = require('./public/config.json');
        res.json(configJSON);
      });
    },
    proxy: {
      '/api': {
        target: env.VUE_APP_PROXY_URL || 'http://bbs.localhost.com',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
    disableHostCheck: true,
    port: 8082,
  },
  // css样式配置（为了实现动态切换主题），教程 https://blog.csdn.net/Joey_Tribiani/article/details/117420207?spm=1001.2014.3001.5501
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
  },
  assetsDir: 'static',
  productionSourceMap: false,
  // configureWebpack里面是webpack配置项
  configureWebpack: {
    optimization: {},
    plugins: [
      // 使用gzip压缩
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|\.css$/, // 匹配文件名
        filename: '[path].gz[query]', // 压缩后的文件名(保持原文件名，后缀加.gz)
        minRatio: 1, // 压缩率小于1才会压缩
        threshold: 10240, // 对超过10k的数据压缩
        deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
      }),
      // 动态切换主题插件
      createThemeColorReplacerPlugin(),
    ],
    // 外链cdn引入
    externals: {
      // vue: "Vue",
      'vue2-leaflet': 'Vue2Leaflet',
      leaflet: 'L',
    },
  },
};
module.exports = vueConfig;

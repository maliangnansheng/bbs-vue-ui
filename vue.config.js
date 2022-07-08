const UglyfyJsPlugin = require("uglifyjs-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const createThemeColorReplacerPlugin = require("./src/config/config");
const vueConfig = {
    // 开发环境的跨域配置
    devServer: {
        proxy: "http://bbs.localhost.com",
        disableHostCheck: true,
        port: 8082
    },
    // css样式配置（为了实现动态切换主题），教程 https://blog.csdn.net/Joey_Tribiani/article/details/117420207?spm=1001.2014.3001.5501
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {},
                    javascriptEnabled: true
                }
            }
        }
    },
    assetsDir: "static",
    productionSourceMap: false,
    // configureWebpack里面是webpack配置项
    configureWebpack: {
        optimization: {
            minimizer: [
                // 压缩js文件
                new UglyfyJsPlugin({
                    test: /\.js(\?.*)?$/i
                })
            ]
        },
        plugins: [
            // 使用gzip压缩
            new CompressionPlugin({
                algorithm: "gzip",
                test: /\.js$|\.html$|\.css$/, // 匹配文件名
                filename: "[path].gz[query]", // 压缩后的文件名(保持原文件名，后缀加.gz)
                minRatio: 1, // 压缩率小于1才会压缩
                threshold: 10240, // 对超过10k的数据压缩
                deleteOriginalAssets: false // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
            }),
            // 动态切换主题插件
            createThemeColorReplacerPlugin()
        ],
        // 外链cdn引入
        externals: {
            // vue: "Vue",
            "vue2-leaflet": "Vue2Leaflet",
            leaflet: "L"
        }
    }
};
module.exports = vueConfig;

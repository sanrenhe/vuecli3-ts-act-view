const path = require("path");
const sprites = require("./sprite.config.js");
const webpack = require('webpack');

process.env.VUE_APP_EDIT_HOST = "https://raw.githubusercontent.com/sanrenhe";

// 图片域名
process.env.VUE_APP_IMG_HOST = "https://hdimg.kerlala.com";

// css图片域名
let scssData = `$img-root: "${process.env.VUE_APP_IMG_HOST}";`;

module.exports = {
    publicPath: "./",
    outputDir: 'dist',// "dist"
    productionSourceMap: false,
    // indexPath: 'index.html',
    // 去掉文件名中的 hash
    filenameHashing: false,
    // 删除 HTML 相关的 webpack 插件
    chainWebpack: config => {
        // config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
        }
        return {
            resolve: {
                // extensions: ['.js', '.vue', '.json', '.ts'],
                alias: {
                    "@base": path.resolve(__dirname, "src/base"),
                }
            },
            plugins: [
                // 雪碧图
                ...sprites.generate(),
                new webpack.ProvidePlugin({
                    $: "jquery",
                    jQuery: "jquery"
                })
            ]
        }
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            postcss: {
                plugins: (function () {
                    // 生产环境转rem
                    if (process.env.NODE_ENV === 'production') {
                        return [require("postcss-plugin-px2rem")({
                            rootValue: 100, // html font-size
                            unitPrecision: 5,
                            // propList: ["*"], //原来 postcss-px2rem 的配置
                            // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                            // propBlackList: [], //黑名单
                            exclude: /(node_module|views)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                            // selectorBlackList: [], //要忽略并保留为px的选择器
                            // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                            replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                            mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                            minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                        })]
                    }
                })()
            },
            sass: {
                prependData: scssData
            },
        },
        // 启用 CSS modules for all css / pre-processor files.
        // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
        modules: false
    },
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === "darwin",
        host: process.env.HOST,
        port: process.env.PORT || 8080,
        https: false,
        hotOnly: false,
        open: false,
        before: app => { },
        disableHostCheck: true
    }
};
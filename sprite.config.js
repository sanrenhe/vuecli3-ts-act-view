const fs = require('fs');
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');
// spritesmith样式
const generateSpritePX = function (data) {
    let sheet = data.spritesheet;
    // 拼接class名
    let basename = 'sprite-' + path.basename(sheet.escaped_image, '.png');

    let mArr = basename.match(/-(\d+)x$/);
    let x = mArr ? mArr[1] : 1;

    console.log('sprite生成中 ...',basename, x + 'x');

    let shared = `@charset "utf-8";
    /* res..com/resources/rem.js */
    @function srem($px){
        @return $px*.5px
    }
    $root-sprite:'' !default;
    .${basename} {
        display: inline-block;
        background-image: url($root-sprite+'${sheet.escaped_image}');
        background-repeat: no-repeat;
        background-size:srem(${sheet.width / x}) auto;
    }`;
    let perSprite = data.sprites.map(function (sprite) {
        return `.${basename}-${sprite.name} {
            @extend .${basename};
            width: srem(${sprite.width / x + 8});
            height: srem(${sprite.height / x + 8});
            background-position: srem(${sprite.offset_x / x + 4}) srem(${sprite.offset_y / x + 4});
        }`;
    }).join('\n');
    return (shared + '\n' + perSprite).replace(/ {4}/g, '');
};
exports.generate = function (devPwd = './src/assets') {
    if (!fs.existsSync(path.join(devPwd, 'sprites'))) {
        return [];
    }
    let list = fs.readdirSync(path.join(devPwd, 'sprites'));
    let plugins = [];
    list.forEach((pwd) => {
        let cwd = path.join(devPwd, 'sprites', pwd);
        let stat = fs.statSync(cwd);
        if (stat && stat.isDirectory()) {
            let notEmpty = fs.readdirSync(cwd).some((dir) => {
                let stat = fs.statSync(path.join(cwd, dir));
                return stat && stat.isFile();
            });
            if (!notEmpty) return;
            let css = [];
            css.push(
                // rpx wxss
                [path.resolve(devPwd, 'sprites/' + pwd + '.scss'), {
                    format: 'generateSpritePX'
                }],
            );

            let conf = {
                // 目标小图标
                src: {
                    // 图片所在文件夹（无视子文件夹）
                    cwd: cwd,
                    // 匹配 png 文件，可以用glob语法
                    // 但png和jpg拼一起，有时候图片无法正常显示
                    glob: '*.png'
                },
                // 输出雪碧图文件及样式文件
                target: {
                    // 这个是打包前的目录，不要输出到 dist 目录下
                    image: path.resolve(devPwd, 'sprites/' + pwd + '.png'),
                    // 可以是字符串、或者数组
                    css
                },
                customTemplates: {
                    generateSpritePX
                },
                apiOptions: {
                    // generateSpriteName: function () {
                    //     var fileName = arguments[0].match(/[^\\]+$/)[0].replace(/\.[a-zA-Z]+/, '')
                    //     return fileName
                    // },
                    // 简单来说，这个就是雪碧图的 css 文件怎么找到 雪碧图的 png 文件
                    cssImageRef: '~@/assets/sprites/' + pwd + '.png'
                },
                spritesmithOptions: {
                    algorithm: 'top-down',
                    // 雪碧图里，图片和图片的距离，单位是px
                    padding: 8,
                    algorithmOpts: {
                        // placeItems,
                        sort: false
                    }
                },
            };
            plugins.push(new SpritesmithPlugin(conf));
        }
    });
    return plugins;
}
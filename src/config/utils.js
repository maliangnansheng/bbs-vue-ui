// 按照教程配置动态切换主题方法 https://blog.csdn.net/Joey_Tribiani/article/details/117420207?spm=1001.2014.3001.5501
import client from "webpack-theme-color-replacer/client";
import generate from "@ant-design/colors/lib/generate";

function getAntdSerials(color) {
    // 淡化（即less的tint）
    const lightens = new Array(9).fill().map((t, i) => {
        return client.varyColor.lighten(color, i / 10);
    });
    // colorPalette变换得到颜色值
    const colorPalettes = generate(color);
    const rgb = client.varyColor.toNum3(color.replace("#", "")).join(",");
    return lightens.concat(colorPalettes).concat(rgb);
}

function changeColor(newColor) {
    var options = {
        newColors: getAntdSerials(newColor), // new colors array, one-to-one corresponde with `matchColors`
        changeUrl(cssUrl) {
            return `/${cssUrl}`; // while router is not `hash` mode, it needs absolute path
        },
    };
    return client.changer.changeColor(options, Promise);
}

export default {
    updateTheme: (newPrimaryColor) => {
        changeColor(newPrimaryColor)
    },
};


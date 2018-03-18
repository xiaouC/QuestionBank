
import {
    Dimensions,
} from 'react-native';

// 像素密度
const DEFAULT_DENSITY = 2;

// 以 iphone 6 为基准,如果以其他尺寸为基准的话,请修改下面的 750 和 1334 为对应尺寸即可.
// px 转换成 dp
const w2 = 750 / DEFAULT_DENSITY;
const h2 = 1334 / DEFAULT_DENSITY;

var screen_width = Dimensions.get('window').width;
var screen_height = Dimensions.get('window').height;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

var scale = Math.min(screen_width / w2, screen_height / h2);

module.exports = {
  convert_size: function(size) {
    size = Math.round((size * scale + 0.5));
    return size / DEFAULT_DENSITY;
  },
};

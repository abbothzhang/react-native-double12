/**
 * Created by albert on 15/11/7.
 */

'use strict';
var {scaleW,scaleH}  = require('../rn/Util/Scale');

if (typeof UIConstants == "undefined") {
    var UIConstants = {
        //字体大小
        FONT_SIZE_BIG18: 18*scaleW,
        FONT_SIZE_BIG: 16*scaleW,
        FONT_SIZE_NORMAL14:14*scaleW,
        FONT_SIZE_NORMAL12: 12*scaleW,
        FONT_SIZE_SMALL: 11*scaleW,

        //color
        COLOR_RED: '#ff303c',
        COLOR_GREEN: '#1aaa6b',
        COLOR_WHITE: '#fff',

        COLOR_GRAY_LIGHTeee:'#eee',
        COLOR_GRAY_LIGHTddd: '#ddd',
        COLOR_GRAY999: '#999',
        COLOR_GRAY_DARK666:'#666',


        COLOR_ORANGEf50:'#ff5500',
        COLOR_ORANGE_DARK:'#fff600',



        COLOR_BG_LISTVIEW: '#fc3342',


    }
}

module.exports = UIConstants;
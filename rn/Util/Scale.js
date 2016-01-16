'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var dimensions = Dimensions.get('window');

var Scale = {
    //this.vw = dimensions.width / 100;
    //this.vh = dimensions.height / 100;
    //this.scaleW = dimensions.width / 375;
    //this.scaleH = dimensions.height/667;
    scaleW:dimensions.width / 375,
    scaleH:dimensions.height / 667,
}

module.exports = Scale;
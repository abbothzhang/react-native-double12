/**
 * Created by albert on 15/11/14.
 */

'use strict';
var UIConstants = require('../../Constants/UIConstants');
var Dimensions = require('Dimensions');
var dimensions = Dimensions.get('window');
var {scaleW,scaleH}  = require('../Util/Scale');
var TBSKActions = require('../../actions/TBSKActions')

var React = require('react-native');
var {
    Image,
    Text,
    View,
    StyleSheet,
    TouchableOpacity
    } = React;


var ErrorPage = React.createClass({

    propTypes: {
        // required
        value: React.PropTypes.string.isRequired,
    },
    getDefaultProps: function () {
        //只有在这个模块里会用到的才在这里定义默认值
        return {
            value: 'default value'
        };
    },

    State(){
        return {
            value: this.props.value
        };
    },

    getInitialState: function () {
        return this.State();
    },

    componentWillMount: function () {

    },

    componentWillUnmount: function () {

    },

    _onBtnClick(){
        TBSKActions.mtopRequest();
    },


    render: function () {
        var errorImageUrl = 'http://10.2.42.125:8081/src/h5rnCommon/img/errorImage.png';
        errorImageUrl = 'http://g-assets.daily.taobao.net/taobao-open/double12/0.1.20/image/header_banner.jpg';
        var marginTop = dimensions.height*1/4-66*scaleH;
        return (
            <View style={{flex:1,backgroundColor:UIConstants.COLOR_GRAY_LIGHTeee}}>
                <View style={{flexDirection:'column',alignItems:'center',marginTop:marginTop}}>
                    <Image source={{uri: errorImageUrl}} style={{height:195*scaleH,width:195*scaleH}}></Image>
                    <Text style={{marginTop:39*scaleH,fontSize:UIConstants.FONT_SIZE_BIG18}}>亲~人太多，被挤爆了!</Text>
                    <Text style={{marginTop:12*scaleH,fontSize:UIConstants.FONT_SIZE_NORMAL14,color:UIConstants.COLOR_GRAY999}}>点击刷新用力挤</Text>

                    <TouchableOpacity onPress={()=>{this._onBtnClick()}}>
                        <View style={[styles.btnBase]}>
                            <Text style={{textAlign:'center',
                                color:UIConstants.COLOR_WHITE,
                                fontSize:UIConstants.FONT_SIZE_NORMAL14
                                }}>刷新</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>

        );
    },


});

var styles = StyleSheet.create({
    btnBase: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:15*scaleH,
        backgroundColor:UIConstants.COLOR_ORANGEf50,
        width: 111 * scaleW,
        height: 33 * scaleH,
        marginBottom: 6 * scaleH,
        borderRadius: 3,

    },
});

module.exports = ErrorPage;
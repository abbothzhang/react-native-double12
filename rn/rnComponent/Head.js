/**
 * Created by albert on 15/10/21.
 */

'use strict';
var TBWindvane = require('../../commonComponent/TBSKWindvane');
var {scaleW,scaleH}  = require('../Util/Scale');
    //scaleW = Scale.scaleW,
    //scaleH = Scale.scaleH;

var React = require('react-native');
var{
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    PixelRatio,
    }=React;

var Head = React.createClass({


//<View style={[{alignItems:'center', justifyContent:'center',height:140,backgroundColor:'#5f646e'}]}>
//    <Text style={[{fontSize:24,color:'#fff',marginTop:10}]}>有伴侣 不孤单</Text>
//    <Text style={[{marginTop:5,color:'#ccc'}]}>最佳手机伴侣 双12大放价</Text>
//    <Text style={[{marginTop:5,color:'#ccc',fontSize:12}]}>12月12日10点、12点、17点、20点开抢</Text>
//</View>

    turnToActivityDetailPage(){
        console.log('turnToActivityDetailPage pressed');
        var url = 'http://huodong.m.taobao.com/hd/8a33.html?spm=a1z3i.69.0.0.2QFwGz';
        TBWindvane.openUrl(url);
    },


    render:function(){


        var self = this;
        var bannerImgUrl = 'http://g-assets.daily.taobao.net/taobao-open/double12/0.1.20/image/header_banner.jpg';
        bannerImgUrl = 'http://10.2.42.125:8081/src/h5rnCommon/img/banner.jpg';

        return(
            <View >
                <Image source={{uri: bannerImgUrl}} style={[{top:0,flex:1,height:192*scaleH,resizeMode: Image.resizeMode.stretch}]}></Image>
                <TouchableOpacity onPress={()=>this.turnToActivityDetailPage()}>
                    <View style={[styles.pressView,{}]}></View>
                </TouchableOpacity>

            </View>
        );
    },
});

var styles = StyleSheet.create({
    pressView:{
        flex: 1,
        opacity: 0.1,
        position: 'absolute',
        top: 0,
        right: 0,
        width:100,
        height: 50,
        backgroundColor: '#f00'
    },
});




module.exports = Head;
/**
 * Created by albert on 15/10/28.
 */
'use strict';

var SeckillCellBottom = require('./SeckillCellBottom');
var UIConstants = require('../../Constants/UIConstants');
var TBSKWindvane = require('../../commonComponent/TBSKWindvane');
var TBSKStatus = require('../../Constants/TBSKStatus');

var {scaleW,scaleH}  = require('../Util/Scale');

var React = require('react-native');

var {
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View
    } = React;

var CELL_HEIGHT = 120 * scaleW;



var SeckillCell = React.createClass({

    propTypes: {
        // required
        seckillCellDic: React.PropTypes.object.isRequired
    },
    getDefaultProps: function () {
        //只有在这个模块里会用到的才在这里定义默认值
        return {
            seckillCellDic: {
                goodsId: 1,//用于排序及秒杀标识
                iconUrl: '',
                imgUrl: 'http://10.2.42.125:8081/src/h5rnCommon/img/cover.png',
                title: '优酷Vip黄金会员',
                desc: '一年仅有一次，提前免费看大片，全程无广告',
                limitTip: '仅售100件',
                priceTips: '1212专享价',
                priceKill: '0',
                price: '200',
                type: 'kill',//seckill秒杀，robCode抢码模块
            }
        };
    },

    State(){
        return {
            seckillCellDic: this.props.seckillCellDic
        };
    },

    getInitialState: function () {
        return this.State();
    },

    onCellPress(){
        console.log('click cell');
        var currentStatus = this.props.seckillCellDic.currentStatus;
        var url = 'http://h5.m.taobao.com/awp/core/detail.htm?id='+this.props.seckillCellDic.itemId;
        if(currentStatus == TBSKStatus.killIn){
            url = this.props.seckillCellDic.killLink;
        }
        var type = this.props.seckillCellDic.type;
        if(type == 'kill'){
            TBSKWindvane.openUrl(url);
        }

    },


    render: function () {

        var imgUrl = this.props.seckillCellDic.imgUrl;
        var title = this.props.seckillCellDic.title;
        var desc = this.props.seckillCellDic.desc;

        var hasQuantity = this.props.seckillCellDic.hasQuantity;
        var currentStatus = this.props.seckillCellDic.currentStatus;
        var inventory0ViewOpacity = 0;
        var inventory0ViewWidth = CELL_HEIGHT*2/3;
        var inventory0ViewLeft = 1/4*inventory0ViewWidth;//1/4通过数学计算计算出来，为了让invertory0View位于image的中间
        var type = this.props.seckillCellDic.type;
        if(!hasQuantity && currentStatus == TBSKStatus.killIn && type == 'kill'){
            inventory0ViewOpacity = 0.5;
        }

        var bottomItemData = {
            currentStatus: this.props.seckillCellDic.currentStatus,
            priceTips: this.props.seckillCellDic.priceTips,
            priceKill: this.props.seckillCellDic.priceKill,
            price: this.props.seckillCellDic.price,
            limitTip: this.props.seckillCellDic.limitTip,
            type: this.props.seckillCellDic.type,
            hasQuantity: this.props.seckillCellDic.hasQuantity,
            isTaken: this.props.seckillCellDic.isTaken,
            itemId: this.props.seckillCellDic.itemId,
            environmentInfo:this.props.environmentInfo,
            killLink:this.props.seckillCellDic.killLink,
            itemUrl:this.props.seckillCellDic.itemUrl,

        };


        var CellBottom = SeckillCellBottom;


        return (
            <View>
                <TouchableWithoutFeedback onPress={()=>this.onCellPress()}>
                    <View style={styles.row}>
                        {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
                         * omit a property or set it to undefined if it's inside a shape,
                         * even if it isn't required */}
                        <Image
                            source={{uri: imgUrl}}
                            style={styles.cellImage}
                            />

                        <View style={{position:'absolute',left:inventory0ViewLeft,top:inventory0ViewLeft,
                        height:inventory0ViewWidth,width:inventory0ViewWidth,opacity:inventory0ViewOpacity,
                        backgroundColor:'#000',borderRadius:inventory0ViewWidth/2,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'#fff',fontWeight:'bold',fontSize:UIConstants.FONT_SIZE_BIG18}}>已秒光</Text>

                        </View>

                        <View style={styles.textContainer}>
                            <Text style={styles.title} numberOfLines={1}>
                                {title}
                            </Text>
                            <Text style={styles.desc} numberOfLines={1}>
                                {desc}
                            </Text>

                            <CellBottom
                                data={bottomItemData}
                                navigator={this.props.navigator}
                                ></CellBottom>


                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
});


var styles = StyleSheet.create({


    textContainer: {
        flex: 1,//使自己充满剩余的父控件
        height: CELL_HEIGHT,
        backgroundColor: 'white',
        marginLeft: 8
    },
    title: {
        fontSize: UIConstants.FONT_SIZE_BIG,
        fontWeight: '200',
        color: '#051b28',
        marginTop: 12*scaleH,
    },
    desc: {
        color: UIConstants.COLOR_GRAY999,
        fontSize: UIConstants.FONT_SIZE_NORMAL12,
        marginTop: 6*scaleH,
    },


    row: {
        alignItems: 'center',//水平居中
        backgroundColor: 'white',
        flexDirection: 'row',//横向排列
        height: CELL_HEIGHT,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 6*scaleH
    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: CELL_HEIGHT,
        width: CELL_HEIGHT,
    },

});

module.exports = SeckillCell;

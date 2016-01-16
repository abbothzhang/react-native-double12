/**
 * Created by albert on 15/10/28.
 */
'use strict';
var React = require('react-native');
var TBSKStatus = require('../../Constants/TBSKStatus');
var UIConstants = require('../../Constants/UIConstants');
var TBSKUtil = require('../../commonComponent/TBSKUtil');
var TBSKWindvane = require('../../commonComponent/TBSKWindvane');
var TBSKStores = require('./../../stores/TBSKStores');
var RCTAlertManager = require('NativeModules').AlertManager;
var {scaleW,scaleH}  = require('../Util/Scale');

var {
    Image,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ActivityIndicatorIOS
    } = React;


var FONT_SIZE_BIG = 14;
var FONT_SIZE_NORMAL12 = 10;
var FONT_SIZE_SMALL = 8;

//var remindMeBtnStatus = RemindMeBtnStatus.btnStatusUnRemind;

var priceLength = 16;

var SeckillCellBottom = React.createClass({
    timeCountData: TBSKStores.getTimeCountData(),
    propTypes: {
        // required
        data: React.PropTypes.object.isRequired,
    },
    //getDefaultProps: function () {
    //    return {
    //        bottomItemData: 'default value'
    //    };
    //},

    State(){
        return {
            currentStatus: this.props.data.currentStatus,
            priceTips: this.props.data.priceTips,
            priceKill: this.props.data.priceKill,
            price: this.props.data.price,
            limitTip: this.props.data.limitTip,
            type: this.props.data.type,
            //不需要父节点传
            hasGetAddTaoCalendarStatus: false,//是否获取到添加淘日历状态，如果没有获取到，显示loading
            hasAddTaoCalendar: false,//是否添加淘日历

        };
    },

    getInitialState: function () {
        return this.State();
    },

    componentDidMount: function () {

        var self = this;
        var eventId = self.props.data.itemId + self.timeCountData.currentPartTime;
        TBSKWindvane.isAddTaoCalendar(eventId, function (data) {
            self.setState({
                hasGetAddTaoCalendarStatus: true,
                hasAddTaoCalendar: true
            });
        }, function (data) {
            self.setState({
                hasGetAddTaoCalendarStatus: true,
                hasAddTaoCalendar: false
            });
        });


    },

    componentWillUnmount: function () {

    },

    _onBtnClick(){
        console.log('onBtnClick');
        var type = this.props.data.type;
        var hasQuantity = this.props.data.hasQuantity;
        hasQuantity = TBSKUtil.Boolean(hasQuantity);
        var isTaken = this.props.data.isTaken;
        isTaken = TBSKUtil.Boolean(isTaken);
        if(type == 'code'){
            switch (this.props.data.currentStatus){
                case TBSKStatus.killWillBegin:
                    this.doTaoCalendar();
                    break;
                case TBSKStatus.killIn:
                case TBSKStatus.killEnd:

                    var getCodeUrl = 'http://g-assets.daily.taobao.net/taobao-open/double12/0.1.16/sendcode.html';

                    if(hasQuantity&&!isTaken){
                        TBSKWindvane.openUrl(getCodeUrl);
                    }


                    break;
            }
        }else{
            switch (this.props.data.currentStatus) {
                case TBSKStatus.killWillBegin:
                    this.doTaoCalendar();
                    break;
                case TBSKStatus.killIn:
                    if(!hasQuantity){
                        TBSKWindvane.toast('已经被秒光啦');
                    }else{
                        this.kill();
                    }

                    break;
                //目前看来seckillEnd和seckillWillBeginBefore状态一致
                case TBSKStatus.killEnd:
                    this.buy();
                    break;

            }
        }




    },

    _onChange(){
        this.setState(this.State());
    },

    //TODO
    buy(){
        var itemUrl = 'http://h5.m.taobao.com/awp/core/detail.htm?id='+this.props.data.itemId;
        TBSKWindvane.openUrl(itemUrl);
    },

    doTaoCalendar(){
        var self = this;
        var eventId = self.props.data.itemId + self.timeCountData.currentPartTime;
        TBSKWindvane.isAddTaoCalendar(eventId, function (data) {
            self.setState({
                hasGetAddTaoCalendarStatus: true,
                hasAddTaoCalendar: true
            });

            TBSKWindvane.cancelCalendar(eventId, function (data) {
                self.setState({hasAddTaoCalendar: false});
                TBSKWindvane.toast('取消提醒成功');
            }, function (e) {
                console.log(JSON.stringify(e));
            });


        }, function (data) {
            self.setState({
                hasGetAddTaoCalendarStatus: true,
                hasAddTaoCalendar: false
            });

            var beginTime = self.timeCountData.currentPartTime;
            beginTime = beginTime.replace(/\//g, '');
            beginTime = beginTime.replace(/:/g, '');
            beginTime = beginTime.replace(/\s/g, '');
            var title = self.timeCountData.currentPartTime + '场秒杀还有3分钟开始';
            var link = TBSKStores.getAllData().environmentInfo.originURL;
            TBSKWindvane.addTaoCalendar(eventId, beginTime, title,link, function (e) {
                self.setState({hasAddTaoCalendar: true});
                var alertMsg = '设置成功!' + '秒杀开始前3' + '分钟将收到手机提醒，您也可以前往我的淘宝-日历 查看所有订阅';
                var alertOpts = {
                    title: '添加提醒成功',
                    message: '' + alertMsg,
                    buttons: [{'cancel': '确定'}],
                };
                RCTAlertManager.alertWithArgs(alertOpts, null);

            }, function (e) {
                console.log(JSON.stringify(e));
                if (e.error.code == '6001') {
                    TBSKWindvane.toast("马上就要开始，不用添加提醒啦");
                } else {
                    TBSKWindvane.toast(e.error.msg);
                }
            });
        });


    },

    kill(){
        TBSKWindvane.openUrl(this.props.data.killLink);
    },

getStrSize(str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength;
},

    render: function () {

        var price = '￥' + this.props.data.price;
        var priceSeckill = this.props.data.priceKill;
        var limitTip = '限量'+this.props.data.limitTip+'件';

        priceLength = (''+this.props.data.price).length*8*scaleW+6*scaleW;
        if(price.indexOf('.') != -1){
         priceLength = priceLength-8;
        }

        var btnTitle;
        var btnTextColor = UIConstants.COLOR_WHITE;//mock
        var btnTextOpacity = 1;
        var btnStyle = styles.btnRemind;
        btnStyle = styles.btnUnReMind;
        btnStyle = styles.btnKillIn;
        btnStyle = styles.btnHasKill;
        btnStyle = styles.btnKillEnd;

        var status = this.props.data.currentStatus;
        //status = TBSKStatus.killEnd;

        var type = this.props.data.type;
        var hasQuantity = this.props.data.hasQuantity;
        hasQuantity = TBSKUtil.Boolean(hasQuantity);
        var isTaken = this.props.data.isTaken;
        isTaken = TBSKUtil.Boolean(isTaken);



        switch (status) {
            case TBSKStatus.killWillBegin:
                if (!this.state.hasAddTaoCalendar) {
                    btnTitle = '提醒我';
                    btnStyle = styles.btnRemind;
                } else {
                    btnTitle = '取消提醒';
                    btnTextColor = UIConstants.COLOR_GREEN;
                    btnStyle = styles.btnUnReMind;
                }

                break;
            case TBSKStatus.killIn:

                btnTitle = '立即秒杀';
                btnStyle = styles.btnKillIn;
                if(!hasQuantity){
                    btnTitle = '已秒光';
                    btnStyle = styles.btnHasKill;
                }

                if (type == 'code') {
                    btnTitle = '免费领取';
                    btnStyle = styles.btnKillIn;

                    if (!hasQuantity) {
                        btnTitle = '已领完';
                        btnStyle = styles.btnHasKill;
                    }

                    if (isTaken) {
                        btnTitle = '已领取';
                        btnStyle = styles.btnHasKill;
                    }
                }
                break;
            //目前看来seckillEnd和seckillWillBeginBefore状态一致
            case TBSKStatus.killEnd:
                btnTitle = '查看双12价';
                if (type == 'code') {
                    btnTitle = '免费领取';
                    btnStyle = styles.btnKillIn;

                    if (!hasQuantity) {
                        btnTitle = '已领完';
                        btnStyle = styles.btnHasKill;
                    }

                    if (isTaken) {
                        btnTitle = '已领取';
                        btnStyle = styles.btnHasKill;
                    }
                }
                break;

        }

        var btn = <ActivityIndicatorIOS/>;
        //if (this.state.hasGetAddTaoCalendarStatus) {
        btn = this.renderBtn(btnStyle, btnTextColor, btnTextOpacity, btnTitle);
        //}


        return (
            <View style={styles.container}>

                <View style={[{backgroundColor:'#fff',marginTop:6*scaleH,flexDirection: 'row',}]}>
                    <Text style={{fontSize:UIConstants.FONT_SIZE_SMALL,
                    color:UIConstants.COLOR_ORANGEf50,textAlign:'center',
                    marginTop:7*scaleH,
                    }}>秒杀价</Text>
                    <Text style={{fontSize:UIConstants.FONT_SIZE_NORMAL12,
                    color:UIConstants.COLOR_ORANGEf50,marginTop:6*scaleH,}}> ￥</Text>
                    <Text
                        style={{fontSize:UIConstants.FONT_SIZE_BIG18,color:UIConstants.COLOR_ORANGEf50}}>{priceSeckill}</Text>

                    <View style={{justifyContent: 'center',alignItems:'center',marginTop:6,marginLeft:6*scaleW,backgroundColor:'#fff'}}>
                        <Text style={{fontSize:UIConstants.FONT_SIZE_NORMAL12,
                        textAlign:'center',color:UIConstants.COLOR_GRAY999,backgroundColor:'#fff'}}>
                            {price}
                        </Text>
                        <View
                            style={[styles.float,{width:priceLength,backgroundColor:UIConstants.COLOR_GRAY999}]}></View>
                    </View>

                </View>


                <View style={{flex:1,backgroundColor:'#fff'}}></View>

                <View style={styles.bottomContainer}>
                    <View style={styles.bottomLeftContainer}>
                        <Text
                            style={[{fontSize:UIConstants.FONT_SIZE_SMALL,color:UIConstants.COLOR_GRAY_DARK666}]}>{limitTip}</Text>
                    </View>

                    <View style={styles.bottomRightContainer}>
                        {btn}
                    </View>
                </View>
            </View>



        );
    },

    renderBtn(btnStyle, btnTextColor, btnTextOpacity, btnTitle){
        return (
            <TouchableOpacity onPress={()=>{this._onBtnClick()}}>
                <View style={[styles.btnBase,btnStyle]}>
                    <Text style={{textAlign:'center',
                                color:btnTextColor,
                                opacity:btnTextOpacity,
                                fontSize:UIConstants.FONT_SIZE_NORMAL12
                                }}>{btnTitle}</Text>
                </View>
            </TouchableOpacity>
        );
    },


});

var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    float: {
        flex: 1,
        opacity: 1,
        position: 'absolute',
        top: 7 * scaleH,
        left: 0,
        height: 1,
        backgroundColor: '#000'
    },

    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2 * scaleH,
        backgroundColor: '#fff',
    },

    bottomLeftContainer: {
        flexDirection: 'row',
        flex: 6,
        alignItems: 'center',
        height: 30,
        //backgroundColor: 'white'
    },

    bottomRightContainer: {
        flexDirection: 'row',
        flex: 4, alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },

    btnBase: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 81 * scaleW,
        height: 30 * scaleH,
        marginBottom: 12 * scaleH,
        borderRadius: 3,
        marginRight: 12 * scaleW
    },

    btnRemind: {
        backgroundColor: UIConstants.COLOR_GREEN,
    },

    btnUnReMind: {
        borderColor: UIConstants.COLOR_GREEN,
        borderWidth: 1,
    },

    btnKillIn: {
        backgroundColor: UIConstants.COLOR_RED,
    },

    btnHasKill: {
        backgroundColor: UIConstants.COLOR_RED,
        opacity: 0.7,
    },

    btnKillEnd: {
        backgroundColor: UIConstants.COLOR_ORANGEf50,
    },


});

module.exports = SeckillCellBottom;
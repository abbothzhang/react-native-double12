/**
 * Created by albert on 15/10/26.
 */
'use strict';

//<script type="text/javascript" src="http://g.tbcdn.cn/mtb/lib-countdown/1.0.0/countdown.js"></script>
//require('http://g.tbcdn.cn/mtb/lib-countdown/1.0.0/countdown.js');

var TBSKStatus = require('../../Constants/TBSKStatus');
var CountDown = require('../../commonComponent/CountDown');
var TBSKUtil = require('../../commonComponent/TBSKUtil');
var TBSKActions = require('../../actions/TBSKActions');
var UIConstants = require('../../Constants/UIConstants');
var TBSKStores = require('../../stores/TBSKStores');
var {scaleW,scaleH}  = require('../Util/Scale');


var endTime;
var killTime = 15*60*1000;//秒杀时间为开始时间加上15分钟15*60*1000
var remindTime = 15*60*1000;//秒杀已结束的状态为开始时间加上45分钟45*60*1000
var nextPartTime;


var React = require('react-native');
var {
    View,
    Image,
    Text,
    ScrollView,
    StyleSheet,
    }=React;

var TBSKTimeCountView = React.createClass({
    timeCountData: TBSKStores.getTimeCountData(),
    propTypes: {
        // required
        currentStatus: React.PropTypes.string.isRequired,//目前所处的秒杀状态
        killBeginTime: React.PropTypes.string.isRequired,

    },


    timeCountViewState(){
        return {
            roundTipsString: '秒杀尚未开始',
            timeCountTipsString: '距开始还有:',//倒计时时间旁边的说明文字
            countDownTime: null,//倒计时时间

        };
    },

    getInitialState: function () {
        return this.timeCountViewState();
    },

    componentDidMount: function () {

        this.setTimeCount();
    },

    componentWillUnmount(){
    },

    componentWillReceiveProps: function(nextProps) {
        console.log('componentWillReceiveProps');
        this.setTimeCount();

    },


    setTimeCount(){
        if(this.timeCountData.nextPartTime == 'DONE'){
            return;
        }

        console.log('setTimeCount()');
        //倒计时
        var currentStatus = this.timeCountData.currentStatus;
        var currentPartTime = this.timeCountData.currentPartTime;
        var nextPartTime = this.timeCountData.nextPartTime;


        switch (currentStatus) {
            case TBSKStatus.killWillBegin:
                endTime = currentPartTime;
                this.state.roundTipsString = '秒杀尚未开始';
                this.state.timeCountTipsString = '距开始还有:';
                break;
            case TBSKStatus.killIn:
                var endDate = new Date(currentPartTime);
                endDate.setTime(endDate.getTime() + killTime);
                endTime = TBSKUtil.formatDate(endDate);


                this.state.roundTipsString = '秒杀进行中';
                this.state.timeCountTipsString = '距结束还有:';

                break;
            case TBSKStatus.killEnd:
                var endDate = new Date(nextPartTime);
                endDate.setTime(endDate.getTime() - remindTime);
                endTime = TBSKUtil.formatDate(endDate);


                break;

        }

        
        var self = this;
        var options = {
            endDate: endTime,
            stringFormatter: 'd天hh小时mm分ss秒',
            that: this,
            onUpdate: function (data) {
                //console.log('countdown add->'+JSON.stringify(data));
                //TODO:data.stirngValue校验
                self.setState({countDownTime: data.stringValue});

            },

            onEnd: function () {
                console.log('countdown ended,currentStatus->' + currentStatus);
                TBSKActions.timeCountEnd();
            }
        };

        //alert(options+'');
        var countDown = new CountDown(options);
        countDown.start();
    },

    renderContent(){
        var currentPartTime = this.timeCountData.currentPartTime;
        currentPartTime = currentPartTime.split(' ')[1];
        return (
            <View style={[styles.container]}>
                <View style={[styles.center,styles.firstLineContainer]}>
                    <Text
                        style={[styles.currentPartTime]}>{currentPartTime}</Text>
                    <Text
                        style={[{fontSize:UIConstants.FONT_SIZE_BIG18,color:'#fff',marginTop:2}]}>{this.state.roundTipsString}</Text>

                </View>

                <View style={[styles.center,styles.secondLineContainer]}>
                    <Text style={[styles.timeCountTips]}>{this.state.timeCountTipsString} </Text>
                    <Text
                        style={[styles.countDownTime]}>{this.state.countDownTime}</Text>
                </View>
            </View>
        );
    },

    renderFinishedView(line1WhiteTips1,line1GoldTips,line1WiteTips2,line2nextPartTimeTips,line2nextPartTime){

        return (
            <View style={[styles.container]}>
                <View style={[styles.center,styles.firstLineContainer]}>
                    <Text
                        style={[{fontSize:UIConstants.FONT_SIZE_NORMAL12,color:UIConstants.COLOR_WHITE}]}>{line1WhiteTips1}</Text>
                    <Text
                        style={[{fontSize:UIConstants.FONT_SIZE_NORMAL12,color:UIConstants.COLOR_ORANGE_DARK}]}>{line1GoldTips}</Text>
                    <Text
                        style={[{fontSize:UIConstants.FONT_SIZE_NORMAL12,color:UIConstants.COLOR_WHITE}]}>{line1WiteTips2}</Text>

                </View>

                <View style={[styles.center,styles.secondLineContainer]}>
                    <Text
                        style={[{fontSize:UIConstants.FONT_SIZE_BIG18,color:'#fff'}]}>{line2nextPartTimeTips}</Text>
                    <Text
                        style={[{fontSize:UIConstants.FONT_SIZE_BIG18,color:UIConstants.COLOR_ORANGE_DARK,fontWeight:'bold'}]}>{line2nextPartTime}</Text>
                </View>
            </View>);
    },

    render(){

        var content = this.renderContent();
        if (this.timeCountData.currentStatus == TBSKStatus.killEnd) {
            var currentPartTime = this.timeCountData.currentPartTime;
            var nextPartTime = this.timeCountData.nextPartTime;
            currentPartTime = currentPartTime.split(' ')[1];
            nextPartTime = nextPartTime.split(' ')[1];
            var line1WhiteTips1 = currentPartTime+'秒杀已经结束 可';
            var line1GoldTips = '5折优惠价';
            var line1WiteTips2 = '购买';
            var line2nextPartTimeTips = '下一场开抢:';
            var line2nextPartTime = nextPartTime;


            content = this.renderFinishedView(line1WhiteTips1,line1GoldTips,line1WiteTips2,line2nextPartTimeTips,line2nextPartTime);
            //展示全场结束View
            if(this.timeCountData.nextPartTime == 'DONE'){
                var line1WhiteTips1 = '全部秒杀已结束';
                var line1GoldTips = '';
                var line1WiteTips2 = '';
                var line2nextPartTimeTips = '';
                var line2nextPartTime = '全场5折 仅限今天';

                content = this.renderFinishedView(line1WhiteTips1,line1GoldTips,line1WiteTips2,line2nextPartTimeTips,line2nextPartTime);
            }
        }

        return (
            <View>{content}</View>
        );
    },


});

var styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        flexDirection: 'column',
        backgroundColor: UIConstants.COLOR_BG_LISTVIEW,

    },

    firstLineContainer:{
        flex:5,
        flexDirection:'row',
        marginTop:9*scaleH
    },

    secondLineContainer:{
        flex:5,
        flexDirection:'row',
        marginTop:9*scaleH,
        marginBottom:9*scaleH
    },

    currentPartTime:{
        fontSize:UIConstants.FONT_SIZE_BIG18,
        fontWeight:'bold',
        color:UIConstants.COLOR_ORANGE_DARK,
    },

    timeCountTips: {
        fontSize: UIConstants.FONT_SIZE_NORMAL12,
        color: '#fff'
    },
    countDownTime:{
        fontSize:UIConstants.FONT_SIZE_NORMAL12,
        color:UIConstants.COLOR_ORANGE_DARK
    },

});

module.exports = TBSKTimeCountView;
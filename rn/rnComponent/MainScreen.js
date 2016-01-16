/**
 * Created by albert on 15/10/20.
 */

'use strict';

var React = require('react-native');

//data
var SystemInfo = require('../Util/SystemInfo');

//my view
var Head = require('./Head');
var TBSKTimeCountView = require('./TBSKTimeCountView');
var GoodsList = require('./GoodsList');
var ErrorPage = require('./ErrorPage');
var LoadingView = require('../Util/LoadingView');
var TBSKWindvane = require('../../commonComponent/TBSKWindvane');
var LoginManager = require("NativeModules").LoginManager;
//flux
var TBSKActions = require('./../../actions/TBSKActions');
var TBSKStores = require('./../../stores/TBSKStores');
var TBSKStatus = require('../../Constants/TBSKStatus');


var {
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,

    } = React;


function mainScreenState() {
    return {
        testHeadTitle: TBSKStores.getTestHeadTitle(),
        data: TBSKStores.getAllData(),
    };
}

var MainScreen = React.createClass({

    getInitialState: function () {
        return mainScreenState();
    },

    componentWillMount: function () {
        TBSKWindvane.setTitle('1212特色会场');
        TBSKStores.addChangeListener(this._onChange);
        //TBSKStores.requestAllData();
        SystemInfo.getEnvironmentInfo().then(function (data) {
            console.log('bundlUrl->' + data.bundlUrl + ' \ndata.originURL->' + data.originURL);
            TBSKWindvane.setNavShareBtn(data.originURL);
            TBSKActions.getEnvionmentInfoSuccess(data);
            //先拉起登录，如果取消登录也拉数据，用户还可以看到页面，但是秒杀抢购优惠码接口必须要强登陆
            // 因为每个用户只能一次
            //1.只走autoLogin 2.先走AutoLogin，失败再拉登录页面
            //mock
            LoginManager.loginWithOption(2, function (isSuccessful, result) {
                //console.log('登录成功:' + JSON.stringify(result));

            }, function () {
                //alert('登录取消');
                console.log('登录取消');
                TBSKWindvane.toast('请先登录');

            });

        },function(data){
            //获取url数据失败
            //TODO
        });
    },

    componentWillUnmount: function () {
        TBSKStores.removeChangeListener(this._onChange);
    },


    render: function () {

        //判断this.state.data是否为空
        // 如果为空，那么显示ActivityIndicatorIOS就可以了
        var renderView;
        var data = this.state.data;
        if (data == null) {
            renderView = <LoadingView></LoadingView>;
        }

        // else if(!data.success){
        //    renderView = <ErrorPage></ErrorPage>;
        //}

        else {
            renderView = this.getContent();
        }



        return (
            <View style={[styles.contentContainer]}>
                {renderView}
            </View>
        );
    },


    getContent(){

        return (
            <View style={[styles.contentContainer]}>
                <TouchableOpacity onPress={()=>{this._onHeadClick()}}>
                    <View>
                        <Text style={{height:0}}>{this.state.testHeadTitle}</Text>
                    </View>
                </TouchableOpacity>

                <GoodsList listData={this.state.data.items}
                           navigator={this.props.navigator}
                           renderHeader={this.renderHeader}
                           renderSectionHeader={this.renderSectionHeader}
                           mRenderRow={this.mRenderRow}
                    />
            </View>
        );
    },


    renderHeader(refreshingIndicator){
        return (
            <View>

                <Head bannerImgUrl={this.state.data.headImgUrl}/>

            </View>

        );
    },

    renderSectionHeader(){
        var currentStatus = this.state.data.currentStatus;
        var killBeginTime = this.state.data.currentPartTime;
        return (
            <View>
                <TBSKTimeCountView currentStatus={currentStatus} killBeginTime={killBeginTime}/>
            </View>

        );
    },



    _onHeadClick(){
        //console.log('headers click');
        TBSKActions.testTextClick("headers click--text from flux");

    },

    _onChange(){
        this.setState(mainScreenState());
        //TBSKActions.parentDataChange(this.state.data);
    },


});


var styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },



});

module.exports = MainScreen;

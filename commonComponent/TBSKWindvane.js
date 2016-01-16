/**
 * Created by albert on 15/10/26.
 */
'use strict';

var React = require('react-native');
var TBSKActions = require('../actions/TBSKActions');
var TBSKStatus = require('../Constants/TBSKStatus');
var TBSKUtil = require('../commonComponent/TBSKUtil');
var {
    DeviceEventEmitter,
    } = React;


var TBSKWindvane = {
    windvane: require("NativeModules").WindVaneBridge,

    setH5Windvane(widvane){
        this.windvane = widvane;
    },

    setTitle(title){
        var params = {
            // 要设置的页面标题
            title: title
        };

        this.windvane.call('WebAppInterface', 'setCustomPageTitle', params, function (e) {
            //alert('succeed: ' + JSON.stringify(e));
        }, function (e) {
            //alert('failure: ' + JSON.stringify(e));
        });
    },

    setNavShareBtn(linkUrl){
        var NativeModules = require("NativeModules");
        //alert(NativeModules);
        var params = {
            // 要设置的图标
            icon: 'share',
            // 图标是否从 native 中获取
            fromNative: 'true',
            // 客户端中预置的图标是否是 iconFont
            iconFont: 'true'
        };

        this.windvane.call('WebAppInterface', 'setNaviBarRightItem', params, function (e) {
        }, function (e) {
            //alert('failure: ' + JSON.stringify(e));
        });


        var subscription = DeviceEventEmitter.addListener(
            'TBNaviBar.rightItem.clicked',
            (info) => {
                this.taobaoShare(linkUrl);
            }
        );

    },


    taobaoShare(linkUrl){
        var params = {
            // 分享内容的标题
            title: '1212特色会场',
            // 要分享的内容
            text: '天了噜，我刚1元钱抢了台手机！这种好事必须告诉你！',
            // 要分享的图片地址
            //image: 'http://img0.bdstatic.com/img/image/4359213b07eca806538f43aff0495dda144ac3482d1.jpg',
            // 要分享的 URL
            url: linkUrl,
            targets:[0,1,2,3,4,5,6,7,8,9,10,11],
        };

        //var windvane = require("NativeModules").WindVaneBridge;
        this.windvane.call('TBSharedModule', 'showSharedMenu', params, function (e) {
            //alert('success: ' + JSON.stringify(e));
        }, function (e) {
            //alert('failure: ' + JSON.stringify(e));
        });
    },


    hookBack(navigator){
        var NavigatorHook = require("NativeModules").NavigatorBarHook;
        NavigatorHook.hookBack();
        //监听返回键按钮，做出相应的pop操作
        DeviceEventEmitter.addListener('NativeBack', function (e) {
            //var navigator = this.props.navigator;
            if (navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                this.setTitle('双十二优惠秒杀');
            } else {
                this.windvane.call('WebAppInterface', 'pop', {}, null, null);
            }
        }.bind(this));
    },


    //淘日历
    //是否添加了淘日历，无回调参数，如果淘日历提醒存在，则进入 success 回调，否则进入 failure 回调
    isAddTaoCalendar(eventId,success,fail){
        var params = {
            eventId: eventId,
            sourceId: '12121'
        };

        this.windvane.call('TBURLCache', 'checkCalendarPlanIsExist', params, function (e) {
            success(e);
        }, function (e) {
            fail(e);

        });




    },

    addTaoCalendar(eventId,beginTime,title,link,success,fail){

        var params = {
            eventId: eventId,
            sourceId: '12121',
            title: title,
            startTime: beginTime,
            endTime: beginTime,
            link: link,
            remind: '180',//180
            description: 'xxxx'
        };
        this.windvane.call('TBURLCache', 'addCalendarPlan', params,success, fail);
    },

    cancelCalendar(eventId,success,fail){
        var params = {
            eventId: eventId,
            sourceId: '12121'
        };
        this.windvane.call('TBURLCache', 'cancelCalendarPlan', params, success, fail);
    },


    openUrl(url){
        var params = {
            // 要打开的页面地址
            url: url
        };
        this.windvane.call('Base', 'openWindow', params, function (e) {
        }, function (e) {
            locaiton.href = 'http://www.taobao.com';
        });
    },

    //toast
    toast(msg){
        var params = {
            // Toast 要显示的消息
            message: msg,
            // Toast 的持续时间
            duration: 1
        };
        // 或者也可以直接使用 Toast 要显示的信息作为参数
        // var params = 'Toast information';
        this.windvane.call('WVUIToast', 'toast', params, function(e) {
        }, function(e) {
            //alert('failure: ' + JSON.stringify(e));
        });
    },

    toastLong(msg){
        var params = {
            // Toast 要显示的消息
            message: msg,
            // Toast 的持续时间
            duration: 10
        };
        // 或者也可以直接使用 Toast 要显示的信息作为参数
        // var params = 'Toast information';
        this.windvane.call('WVUIToast', 'toast', params, function(e) {
        }, function(e) {
            //alert('failure: ' + JSON.stringify(e));
        });
    },


    //
    mtopRequest(params){
        var self = this;
        var allData;



        this.windvane.call('MtopWVPlugin', 'send', params, function (e) {
            allData = e.data;
            //mock
            //allData = self.allDataMock();
            allData.success = true;
            console.log('allData->'+JSON.stringify(allData));
            TBSKActions.mtopDataReturn(true, allData);

        }, function (e) {

            allData = e.data;
            //mock
            //allData = self.allDataMock();
            allData.success = false;
            console.log('allData->'+JSON.stringify(allData));
            TBSKActions.mtopDataReturn(false, allData);

        });
    },

    allDataMock(){
        //mock
        var allData = {
            success: true,
            errorCode:'-1',
            currentStatus:TBSKStatus.killEnd, //killWillBegin-秒杀将要开始 killIn-秒杀进行中 killEnd-秒杀结束
            currentPartTime:"2015/11/12 16:53:40",//2015-12-12 10:0:00
            nextPartTime:'',
            environmentInfo: {},//本地从url中获取
            timestamp:'2015/11/15 09:00:00',//服务器端返回的当前时间
            //headImgUrl:'http://10.2.42.125:8081/src/h5rnCommon/img/banner.jpg',//本地
            items: [],//items

        };


        var now = new Date();
        now.setTime(now.getTime()+100*50*1000);
        allData.currentPartTime = TBSKUtil.formatDate(now);
        now.setTime(now.getTime()+15*60*1000);
        allData.nextPartTime = TBSKUtil.formatDate(now);

        for (var i = 0; i < 100; i++) {
            var itemDic = {};
            itemDic.itemId = '523740869240';//
            itemDic.imgUrl = 'http://10.2.42.125:8081/src/h5rnCommon/img/cover.png';
            itemDic.title = '优酷vip会员2优酷';
            itemDic.desc = '一年仅有一次，提前免费看大片一年仅有一次一年仅有一次，提前免费看大片一年仅有一次，';//desc
            itemDic.limitTip = '100';//limitTip
            itemDic.priceKill = i + 1;//priceKill，单位为分，需要除以100得到元
            itemDic.price =  1000001;//price
            itemDic.hasQuantity = true,//库存
            itemDic.killLink = 'https://item.taobao.com/item.htm?spm=a219r.lm869.14.58.ZeUmoW&id=523286189680&ns=1&abbucket=2#detail';//点击立即秒杀时跳转的url
            itemDic.type = 'kill';// kill/code
            itemDic.appKey='123456';
            if (i % 2 == 1) {
                itemDic.type = 'code';//code
                itemDic.title = '优酷抢码';
                itemDic.hasQuantity = false;//库存
                itemDic.isTaken=true;//是否已经领取优惠码，是否已秒杀服务器端无法判断，所以没有同样的这个字段
            }

            allData.items.push(itemDic);
        }

        return allData;
    },

};

module.exports = TBSKWindvane;


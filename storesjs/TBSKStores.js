/**
 * Created by albert on 15/10/27.
 */

var TBSKDispatcher = require('../dispatcher/TBSKDispatcher');
//var TBSKDispatcher = require('flux').Dispatcher;
//var EventEmitter = require('events').EventEmitter;
//var events = require('events');
//var EventEmitter = require('EventEmitter');
var EventEmitter = require('events').EventEmitter;
var ActionsConstants = require('../actions/ActionsConstants');
//var TBSKWindvane = require('./../commonComponent/TBSKWindvane');
var TBSKStatus = require('../Constants/TBSKStatus');
var TBSKUtil = require('../commonComponent/TBSKUtil');

var CommonUtils = require('../../h5/manager/double12utils');

var emt = new EventEmitter();
var CHANGE_EVENT = 'change';
var TIME_END_REFRESH_EVENT = 'TIME_END_REFRESH_EVENT';


var allData = null;
var environmentInfo;
var userId;//这个变量暂时没有用

var currentEndTime = undefined;

var isWillBeginNow = false;

var timeCountData = {
    currentPartTime: '',
    nextPartTime: '',
    currentStatus: ''
}

var img=lib.img({
    'class':'lib-img',//图片class
    'dataSrc':'data-src',//图片真实src 的data字段
    'size': '240x240',//cdn尺寸
    'sharpen': 's150',//锐化参数
    'q': ['q75', 'q50'],//图片质量[非弱网，弱网],
    'enableLazyload':true,//是否开启懒加载功能，默认true
    'lazyHeight': window.innerHeight/2,//[可选]，预加载当前屏幕以下lazyHeight内的图片，默认0
    'lazyWidth': 0,//[可选]，预加载当前屏幕右边lazyWidth内的图片，默认0
    'enableIOSWebp':false,//ios系统下，图片添加是否webp后缀，默认false,
    'enalbeIOSWifiLoadMore':false,//ios&&wifi情况下 是否关闭懒加载,默认false
});

var TBSKStores = {

    PARENT_DATA_CHANGE: 'PARENT_DATA_CHANGE',

    getTestHeadTitle(){
        return testString;
    },
    getImgLoad(){
      return img;
    },
    getAllData(){
        return allData;
    },
    fireLazyload(){
        img.fireLazyload();
    },
    getTimeCountData(){
        return timeCountData;
    },
    getCurrentEndTime(){
        return currentEndTime;
    },
    setCurrentEndTime(endTime){
        currentEndTime = endTime;
    },
    IsWillBeginNow(){
        return isWillBeginNow;
    },
    setIsWellBeginNow(flag){
        isWillBeginNow = flag;
    },
    requestAllData(){
        var mtopRequstParams = {
            // 请求的 API 名称
            api: 'mtop.kds.microShop.index',
            // 版本号
            v: '1.0',
            // 是否使用 POST 方式请求
            post: '1',
            // 做自动登录，登录失败则拉起登录界面
            //TODO:mock，先用AutoLoginOnly，防止每次刷新时候都弹登陆框出来，正式时候改成AutoLoginAndManualLogin
            sessionOption: 'AutoLoginOnly',//AutoLoginAndManualLogin/AutoLoginOnly
            // 请求的参数
            param: {
                f: 'detail'
            }
        };

        //TBSKWindvane.mtopRequest(mtopRequstParams);
    },


////////////////////////////////////////////////////////
    emitDataChange: function () {
        emt.emit(this.PARENT_DATA_CHANGE);
    },
    emitChange: function () {
        emt.emit(CHANGE_EVENT);
    },
    emitTimeOutDataRefresh: function(){
        emt.emit(TIME_END_REFRESH_EVENT);
    },
    /**
     * @param {function} callback
     */
    addChangeListener: function (event, callback) {

        emt.addListener(event, callback);
    },

    addChangeListener: function (callback) {

        emt.addListener(CHANGE_EVENT, callback);
    },
    addTimeOutDataRefresh: function(callback){
        emt.addListener(TIME_END_REFRESH_EVENT, callback);
    },
    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        emt.removeListener(CHANGE_EVENT, callback);
    },

    removeTimeOutDataRefresh: function(callback){
        emt.removeListener(TIME_END_REFRESH_EVENT, callback);
    }
}

//Register callback to handle all updates
TBSKDispatcher.register(function (action) {
    var text;

    switch (action.actionType) {
        case ActionsConstants.PAGE_REFRESH:

            TBSKStores.emitChange();
            return;
        case ActionsConstants.TEST_HEAD_CLICK:
            text = action.text.trim();
            if (text !== '') {
                testString = text;
                TBSKStores.emitChange();
            }
            break;
        case ActionsConstants.MTOP_DATA_RETURN:
            var success = action.success;
            allData = action.allData;
            allData.environmentInfo = environmentInfo;

            timeCountData.currentPartTime = allData.currentPartTime;
            timeCountData.currentStatus = allData.currentStatus;
            timeCountData.nextPartTime = allData.nextPartTime;
            //switch (timeCountData.currentPartTime){
            //    case SeckillTime.partOne:
            //        timeCountData.nextPartTime = SeckillTime.partTwo;
            //        break;
            //    case SeckillTime.partTwo:
            //        timeCountData.nextPartTime = SeckillTime.partThree;
            //        break;
            //    case SeckillTime.partThree:
            //        timeCountData.nextPartTime = SeckillTime.partFour;
            //        break;
            //}


            for (var i = 0; i < allData.items.length; i++) {
                allData.items[i].currentStatus = allData.currentStatus;
            }

            TBSKStores.emitChange();
            break;
        case ActionsConstants.GET_ENVIONMENT_INFO_SUCCESS:
            environmentInfo = action.data;
            userId = action.data.userId;
            TBSKStores.requestAllData();
            break;

        //计时结束
        case ActionsConstants.TIME_COUNT_END:
            //var nextStatus;
            var currentStatus = timeCountData.currentStatus;
            var currentPartTime = timeCountData.currentPartTime;
            var nextPartTime = timeCountData.nextPartTime;
            switch (currentStatus) {
                case TBSKStatus.killWillBegin:
                    currentStatus = TBSKStatus.killIn;
                    break;
                case TBSKStatus.killIn:
                    currentStatus = TBSKStatus.killEnd;

                    break;
                case TBSKStatus.killEnd:

                    //window.location.reload();
                    //CommonUtils._doGetListData();
                    TBSKStores.emitTimeOutDataRefresh();
                    return;
            }

            allData.currentStatus = currentStatus;
            allData.currentPartTime = currentPartTime;
            allData.nextPartTime = nextPartTime;

            timeCountData.currentStatus = allData.currentStatus;
            timeCountData.currentPartTime = allData.currentPartTime;
            timeCountData.nextPartTime = allData.nextPartTime;
            

            for (var i = 0; i < allData.items.length; i++) {
                allData.items[i].currentStatus = allData.currentStatus;
            }

            testString = 'timeCountEnd->' + allData.currentStatus;
            TBSKStores.emitChange();

            break;
        case ActionsConstants.PARENT_DATA_CHANGE:

            TBSKStores.emitDataChange();
            break;

        default:
        // no op
    }
    

});


module.exports = TBSKStores;
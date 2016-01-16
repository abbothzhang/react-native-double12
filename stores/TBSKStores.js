/**
 * Created by albert on 15/10/27.
 */

var TBSKDispatcher = require('../dispatcher/TBSKDispatcher');
var EventEmitter = require('EventEmitter');
//var EventEmitter = require('events').EventEmitter;
var ActionsConstants = require('../actions/ActionsConstants');
var TBSKWindvane = require('./../commonComponent/TBSKWindvane');
var TBSKStatus = require('../Constants/TBSKStatus');
var TBSKUtil = require('../commonComponent/TBSKUtil');

var emt = new EventEmitter();
var CHANGE_EVENT = 'change';


var testString = '点击这里开启mock特效';
var debug = false;
var allData = null;
var environmentInfo;
var originURL;//这个变量暂时没有用

var timeCountData = {
    currentPartTime: '',
    nextPartTime: '',
    currentStatus: ''
}


var TBSKStores = {

    PARENT_DATA_CHANGE: 'PARENT_DATA_CHANGE',

    getTestHeadTitle(){
        return testString;
    },

    getAllData(){
        return allData;
    },

    getTimeCountData(){
        return timeCountData;
    },

    isDebug(){
        return debug;
    },

//------------------------
    requestAllData(){
        var mtopRequstParams = {
            // 请求的 API 名称
            api: 'mtop.kds.inflow.itemList',//mtop.kds.inflow.itemList/com.taobao.windvane.waplugin
            // 版本号
            v: '1.0',
            // 是否使用 POST 方式请求
            post: '1',
            // 做自动登录，登录失败则拉起登录界面
            //TODO:mock，先用AutoLoginOnly，防止每次刷新时候都弹登陆框出来，正式时候改成AutoLoginAndManualLogin
            sessionOption: 'AutoLoginOnly',//AutoLoginAndManualLogin/AutoLoginOnly
            // 请求的参数
            param: {
                f:'detail',
                appKey:'1000'
            }
        };

        TBSKWindvane.mtopRequest(mtopRequstParams);
    },


////////////////////////////////////////////////////////
    emitDataChange: function () {
        emt.emit(this.PARENT_DATA_CHANGE);
    },
    emitChange: function () {
        emt.emit(CHANGE_EVENT);
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

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        emt.removeListener(CHANGE_EVENT, callback);
    }


}

//Register callback to handle all updates
TBSKDispatcher.register(function (action) {
    var text;

    switch (action.actionType) {
        case ActionsConstants.TEST_HEAD_CLICK:
            text = action.text.trim();
            if (text !== '') {
                testString = text;
                TBSKStores.emitChange();
            }
            break;
        case ActionsConstants.GET_ENVIONMENT_INFO_SUCCESS:
            environmentInfo = action.data;
            originURL = action.data.originURL;
            TBSKStores.requestAllData();
            break;

        case ActionsConstants.MTOP_REQUEST:
            TBSKStores.requestAllData();
            break;

        case ActionsConstants.MTOP_DATA_RETURN:
            var success = action.success;
            allData = action.allData;
            allData.environmentInfo = environmentInfo;
            allData.headImgUrl='http://10.2.42.125:8081/src/h5rnCommon/img/banner.jpg';//本地


            timeCountData.currentPartTime = allData.currentPartTime;
            timeCountData.currentStatus = allData.currentStatus;
            timeCountData.nextPartTime = allData.nextPartTime;

            if(!allData.items){
                return;
            }

            for (var i = 0; i < allData.items.length; i++) {
                allData.items[i].currentStatus = allData.currentStatus;
            }

            TBSKStores.emitChange();
            break;


        //计时结束
        case ActionsConstants.TIME_COUNT_END:
            var currentStatus = timeCountData.currentStatus;
            switch (currentStatus) {
                case TBSKStatus.killWillBegin:
                    currentStatus = TBSKStatus.killIn;
                    break;
                case TBSKStatus.killIn:
                    currentStatus = TBSKStatus.killEnd;
                    break;
                case TBSKStatus.killEnd:
                    allData = null;
                    TBSKStores.requestAllData();
                    TBSKStores.emitChange();
                    return;
                    break;
            }

            allData.currentStatus = currentStatus;
            timeCountData.currentStatus = allData.currentStatus;


            for (var i = 0; i < allData.items.length; i++) {
                allData.items[i].currentStatus = allData.currentStatus;
            }

            testString = 'timeCountEnd->' + allData.currentStatus;
            TBSKStores.emitChange();

            break;

        default:
        // no op
    }


});


module.exports = TBSKStores;
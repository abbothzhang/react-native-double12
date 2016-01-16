/**
 * Created by albert on 15/10/26.
 */

var TBSKDispatcher = require('../dispatcher/TBSKDispatcher');
//var TBSKDispatcher = require('flux').Dispatcher;
var ActionsConstants = require('./ActionsConstants');


var TBSKActions = {

    /**
     * @param  {string} text
     */
    testTextClick: function(text) {
        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.TEST_HEAD_CLICK,
            text: text
        });
    },

    timeCountEnd: function() {
        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.TIME_COUNT_END,
        });
    },
    pageRefresh: function() {
        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.PAGE_REFRESH,
        });
    },

    //
    parentDataChange(data){

        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.PARENT_DATA_CHANGE,
            data: data
        });
    },


    //click
    cellClick:function(data){
        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.CELL_CLICK,
            text: text
        });
    },

    btnClick:function(data){
        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.BTN_CLICK,
            text: text
        });
    },

    mtopRequest(){
        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.MTOP_REQUEST,
        });
    },

    getEnvionmentInfoSuccess(data){
        TBSKDispatcher.dispatch({
            actionType:ActionsConstants.GET_ENVIONMENT_INFO_SUCCESS,
            data:data
        });
    },

    //windvane mtopData
    mtopDataReturn: function(success,allData) {
        TBSKDispatcher.dispatch({
            actionType: ActionsConstants.MTOP_DATA_RETURN,
            success:success,
            allData: allData
        });
    },



};

module.exports = TBSKActions;
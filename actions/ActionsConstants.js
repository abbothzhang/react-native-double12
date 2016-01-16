/**
 * Created by albert on 15/10/28.
 */

//flux事件名
if(typeof ActionsConstants == "undefined"){
    var ActionsConstants = {
        TEST_HEAD_CLICK: 'HEAD_CLICK',
        LOADING:'LOADING',
        CELL_CLICK:'CELL_CLICK',
        BTN_CLICK:'BTN_CLICK',
        MTOP_REQUEST:'MTOP_REQUEST',
        MTOP_DATA_RETURN:'MTOP_DATA_RETURN',//获取到mtop请求
        GET_ENVIONMENT_INFO_SUCCESS:'GET_ENVIONMENT_INFO_SUCCESS',//获取到url等信息
        TIME_COUNT_END:'TIME_COUNT_END',//计时结束
        PARENT_DATA_CHANGE:'PARENT_DATA_CHANGE',
        PAGE_REFRESH:'PAGE_REFRESH',
    }
}

module.exports = ActionsConstants;
/**
 * Created by albert on 15/10/21.
 */



//秒杀状态
if(typeof TBSKStatus == "undefined"){
    var TBSKStatus = {
        currentStatus:'',
        killWillBeginBefore: 'killWillBeginBefore',//半小时前
        killWillBegin: 'killWillBegin',//秒杀将要开始，按钮变成提醒我
        killIn: 'killIn',//秒杀进行中，持续15分钟
        killEnd: 'killEnd'//秒杀结束
    }
}

module.exports = TBSKStatus;

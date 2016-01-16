/**
 * Created by albert on 15/11/5.
 */

var TBSKUtil = {

    Boolean(str){
        if(Object.prototype.toString.call(str) === "[object String]"){
            if(str == 'false'){
                str = false;
            }else{
                str = true;
            }
        }
        return str;
    },

    formatDate (date) { //author: meizz
        var fmt = "yyyy/MM/dd hh:mm:ss";
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },

    addMinute(){

    },

    //function
    //当前时间所处的秒杀状态
    nowTimeStatus(){
        ////TODO:根据当前时间设置秒杀状态
        //var result = this.isNowTimeBeforeTargetTime(SeckillTime.partTest);
        //console.log(result);
        ////mock
        //return TBSKStatus.killIn;
    },


    isNowTimeBeforeTargetTime(targetTimes){

        var now = new Date(),
            nowyear = now.getFullYear(),
            nowmonth = now.getMonth() + 1,
            nowday = now.getDate(),
            nowHour = now.getHours(),
            nowMinute = now.getMinutes(),
            nowSecond = now.getSeconds();

        var today = nowyear + "-" + nowmonth + "-" + nowday + " " + nowHour + ":" + nowMinute + ":" + nowSecond;
        console.log(today);

        var targetDate = targetTimes.split(' ')[0],
            targetTime = targetTimes.split(' ')[1];

        var targetYear = targetDate.split('-')[0],
            targetMonth = targetDate.split('-')[1],
            targetDay = targetDate.split('-')[2];

        var targetHour = targetTime.split(':')[0],
            targetMinute = targetTime.split(':')[1],
            targetSecond = targetTime.split(':')[2];

        if (targetYear > nowyear) {
            return true;
        }
        if (targetMonth > nowmonth) {
            return true;
        }
        if (targetDay > nowday) {
            return true;
        }

        if (targetHour > nowHour) {
            return true;
        }
        if (targetMinute > nowMinute) {
            return true;
        }
        if (targetSecond > nowSecond) {
            return true;
        }

        return false;
    },
}

module.exports = TBSKUtil;
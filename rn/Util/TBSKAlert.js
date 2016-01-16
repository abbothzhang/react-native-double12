/**
 * Created by albert on 15/11/5.
 */

var RCTAlertManager = require('react-native').AlertManager;

var TBSKAlert={
    alertTips(title,msg){
        var alertOpts = {
            title: title || '提示',
            message: '' + msg,
            buttons: [{'cancel': 'OK'}],
        };
        RCTAlertManager.alertWithArgs(alertOpts, null);
    },
};

alert = function (title,msg) {
    var alertOpts = {
        title: title,
        message: '' + msg,
        buttons: [{'cancel': 'OK'}],
    };
    RCTAlertManager.alertWithArgs(alertOpts, null);
};


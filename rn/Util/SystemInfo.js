/**
 * Created by albert on 15/11/4.
 */
/**
 * @class SystemInfo
 *
 * @classdesc
 * AliReactNative bridge - SystemInfo
 *
 * @providesModule AliReactNative/SystemInfo
 * @flow
 */

'use strict';
var TBSKActions = require('../../actions/TBSKActions');
var React = require('react-native'),
    NativeModules = React.NativeModules;


var SystemInfo = {
    getEnvironmentInfo: function() {
        return new Promise(function(resolve, reject){
            if(NativeModules && NativeModules.SystemInfo && NativeModules.SystemInfo.environment) {
                NativeModules.SystemInfo.environment(function(data){

                    //console.log('bundlUrl->'+data.bundlUrl+' \ndata.originURL->'+data.originURL);
                    //TBSKActions.getEnvionmentInfo(data);
                    // alert(JSON.stringify(data));  //所有的环境变量
                    // alert('bundlUrl:' + data.bundlUrl); //应用的bundle URL地址
                    // alert('systemVersion:' + data.systemVersion); //ios系统版本
                    // alert('model:' + data.model); //设备model
                    // alert('localizedModel:' + data.localizedModel); //国际化区域名称
                    // alert('appName:' + data.appName); //应用名称
                    // alert('appVersion:' + data.appVersion); //应用版本
                    // alert('appBuildVersion:' + data.appBuildVersion);//应用build版本号
                    // alert('rnVersion:' + data.rnVersion);//React Native版本
                    // alert('miniOSVersion:' + data.rnVersion);//应用支持的最小版本号
                    // alert('OSVersionString:' + data.rnVersion);//当前设备OS版本字符串
                    // alert('systemUpTime:' + data.rnVersion);//应用从启动运行的总时间，重启会置0
                    return resolve(data);
                });
            }else {
                return reject({
                    msg: 'Can not using NativeModules.SystemInfo.environment method'
                });
            }
        });
    }
};

module.exports = SystemInfo;
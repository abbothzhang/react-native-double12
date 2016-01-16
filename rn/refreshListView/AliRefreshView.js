/**
 * Created by albert on 15/11/15.
 */

'use strict';

var React = require('react-native');
var RCTUIManager = require('NativeModules').UIManager;

var {
    View,
    ScrollView,
    Platform,
    requireNativeComponent
    } = React;

var Iface = {
    name: 'RefreshView',
    propTypes: {}
};

// fixed for android's non proptype error.t
if(Platform.OS === "android") Iface.propTypes.elfin = React.PropTypes.string;

var RCTRefreshView = requireNativeComponent('RCTRefreshView', Iface);


var AliRefreshView = React.createClass({

    stopRefreshing() {
        var id = React.findNodeHandle(this.refs.RefreshView);
        if(Platform.OS === "android") {
            RCTUIManager.dispatchViewManagerCommand(
                id,
                RCTUIManager.RCTRefreshView.Commands.stopRefreshing,
                null
            );
        }
        else if(Platform.OS === "ios") {
            RCTUIManager.stopRefreshing(id);
        }
    },

    render() {
        return (<RCTRefreshView ref={"RefreshView"} {...this.props} />)
    }


});

module.exports = AliRefreshView;
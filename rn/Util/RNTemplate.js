/**
 * Created by albert on 15/10/28.
 */
'use strict';
var React = require('react-native');
var {
    Image,
    Text,
    View,
    StyleSheet,
    } = React;


var RNTemplate = React.createClass({

    propTypes: {
        // required
        value: React.PropTypes.string.isRequired,
    },
    getDefaultProps: function () {
        //只有在这个模块里会用到的才在这里定义默认值
        return {
            value: 'default value'
        };
    },

    State(){
        return {
            value: this.props.value
        };
    },

    getInitialState: function () {
        return this.State();
    },

    componentWillMount: function () {

    },

    componentWillUnmount: function () {

    },


    render: function () {
        return (
            <View></View>

        );
    },


});

var styles = StyleSheet.create({});

module.exports = RNTemplate;
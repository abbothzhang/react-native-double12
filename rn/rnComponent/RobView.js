/**
 * Created by albert on 15/11/3.
 */
'use strict';
var React = require('react-native');
var TBSKWindvane = require('../../commonComponent/TBSKWindvane');

var {
    Image,
    ListView,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    } = React;


var RobView = React.createClass({

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

    componentDidMount: function () {
        TBSKWindvane.setTitle('领取优惠码');
    },

    componentWillUnmount: function () {

    },


    render: function () {
        return (
            <View style={styles.container}></View>

        );
    },


});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

});

module.exports = RobView;
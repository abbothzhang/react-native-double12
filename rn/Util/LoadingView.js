/**
 * Created by albert on 15/11/2.
 */

'use strict';
var React = require('react-native');
var UIConstants = require('../../Constants/UIConstants');
var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    ActivityIndicatorIOS
    } = React;


var LoadingView = React.createClass({

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

    },

    componentWillUnmount: function () {

    },


    render: function () {
        return (
            <View style={[styles.center,styles.contentContainer]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicatorIOS style={[styles.loading]} />
                    <Text style={styles.loadingText}>正在加载</Text>
                </View>

            </View>

        );
    },


});

var styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    loadingContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:UIConstants.COLOR_GRAY_LIGHTddd,
        height:100,
        width:120,
        borderRadius:5,

    },

    loadingText:{
        marginTop:10,
        color:UIConstants.COLOR_WHITE

    },

});

module.exports = LoadingView;
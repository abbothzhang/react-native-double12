/**
 * Created by albert on 15/10/28.
 */
'use strict';

var React = require('react-native');
var SeckillCell = require('./SeckillCell');
var UIConstants = require('../../Constants/UIConstants');
var LoadingView = require('../Util/LoadingView');
var RefreshableListView = require('react-native-refreshable-listview')
var AliRefreshView = require('../refreshListView/AliRefreshView')

var TBSKActions = require('../../actions/TBSKActions')

var {
    RefresherListView,
    LoadingBarIndicator,
    LoadingActivityIndicatorIOS
    } = require('react-native-refresher');

var {
    Image,
    ListView,
    TouchableHighlight,
    StyleSheet,
    Text,
    View,
    } = React;

var listSize;
var mCellListData;

var GoodsList = React.createClass({

    propTypes: {
        // required
        listData: React.PropTypes.object.isRequired,
        renderHeader:React.PropTypes.object.isRequired,
        renderSectionHeader:React.PropTypes.object.isRequired,
        mRenderRow:React.PropTypes.object.isRequired,
        //unrequired
        navigator:React.PropTypes.object,
    },
    getDefaultProps: function () {
        //只有在这个模块里会用到的才在这里定义默认值
        return {};
    },

    State(){
        var mL = this.props.listData;
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        return {
            listData: this.props.listData,
            //dataSource: ds.cloneWithRows(this.props.listData),
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            renderHeader:this.props.renderHeader,
            renderSectionHeader:this.props.renderSectionHeader,
            mRenderRow:this.props.mRenderRow
        };
    },


    getInitialState: function () {
        return this.State();
    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },

    onRefresh(){
        console.log('onRefresh');
        TBSKActions.mtopRequest();
    },


    render: function () {

        var dataSource = this.state.ds.cloneWithRows(this.props.listData);

        return (
                <RefreshableListView
                    stickyHeaderIndices={[0]}
                    ref="listview"
                    dataSource={dataSource}
                    renderSectionHeader={this.props.renderSectionHeader}
                    renderHeaderWrapper={this.state.renderHeader}
                    renderRow={this.mRenderRow}
                    showsVerticalScrollIndicator={false}
                    style={{backgroundColor:UIConstants.COLOR_BG_LISTVIEW}}
                    loadData={this.onRefresh}
                    refreshDescription="Refreshing articles"
                    //refreshingIndictatorComponent={<RefreshableListView.RefreshingIndicator stylesheet={indicatorStylesheet} />}
                    minPulldownDistance='1'
                    minBetweenTime='1000'
                    ></RefreshableListView>




        );
    },



    mRenderRow(seckillCellDic, sectionID, rowID){
        return (
            <SeckillCell
                seckillCellDic={seckillCellDic}
                rowID={rowID}
                navigator={this.props.navigator}
                ></SeckillCell>
        );
    },


});

var indicatorStylesheet = StyleSheet.create({
    wrapper: {
        backgroundColor: 'red',
        height: 60,
        marginTop: 10,
    },
    content: {
        backgroundColor: 'blue',
        marginTop: 10,
        height: 60,
    },
})

module.exports = GoodsList;
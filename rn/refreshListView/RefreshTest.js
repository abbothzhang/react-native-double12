/**
 * Created by albert on 15/11/15.
 */

var React = require('react-native');
// Loading the refresher ListView and Indicator
var {
    RefresherListView,
    LoadingBarIndicator,
    LoadingActivityIndicatorIOS
    } = require('react-native-refresher');

var {
    AppRegistry,
    Text,
    View,
    ListView,
    } = React;


class RefreshTest extends React.Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(["Row 1", "Row 2"]),
        };
    }
    onRefresh() {
        // You can either return a promise or a callback
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({dataSource:this.ds.cloneWithRows(["Row 1", "Row 2", "Row 3", "Row 4"])});
    }
    render() {

        return (
            <View style={{flex:1}}>
                <RefresherListView
                    dataSource={this.state.dataSource}
                    onRefresh={()=>this.onRefresh()}
                    indicator={<LoadingActivityIndicatorIOS />}
                    renderRow={(rowData) => <View style={{padding:10,borderBottomColor: '#CCCCCC', backgroundColor: 'white',borderBottomWidth: 1}}><Text>{rowData}</Text></View>}
                    />
            </View>
        );
    }
};

AppRegistry.registerComponent('RefreshTest', () => RefreshTest);
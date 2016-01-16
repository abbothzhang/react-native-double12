var React = require('react-native')
var {Text, View, ListView,AppRegistry} = React
var RefreshableListView = require('../lib/RefreshableListView')

var renderHeaderWrapper = React.createClass({
    renderHeaderWrapper(refreshingIndicator) {
        return (
            <View>
                <Text>My custom header</Text>
                {/*  you MUST render the refreshingIndicator (which is passed in as the first argument) */}
                {refreshingIndicator}
            </View>
        )
    },
    render() {
        return (
            <RefreshableListView
                renderHeaderWrapper={this.renderHeaderWrapper}
                />
        )
    }
})

AppRegistry.registerComponent('renderHeaderWrapper', () => renderHeaderWrapper);

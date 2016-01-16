var React = require('react-native')
var {Text, View} = React
var RefreshableListView = require('react-native-refreshable-listview')

var {AppRegistry}=React;

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


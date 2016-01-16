/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *

 * @flow
 */
'use strict';

var React = require('react-native');
var MainScreen = require('./rnComponent/MainScreen');
var TBSKWindvane = require('../commonComponent/TBSKWindvane');
var RobView = require('./rnComponent/RobView');

var {
  AppRegistry,
  StyleSheet,
    View,
    DeviceEventEmitter,
    AlertIOS,
    Navigator
} = React;

var seckillApp = React.createClass({

    componentDidMount: function () {

    },

    configureScene(route){
        return Navigator.SceneConfigs.FadeAndroid;
    },

    renderScene(router, navigator){
        var Component = null;
        this._navigator = navigator;
        switch(router.name){
            case "index":
                Component = MainScreen;
                break;
            case "RobView":
                Component = RobView;
                break;
            default: //default view
                Component = MainScreen;
        }

        return <Component navigator={navigator} />
    },


    render: function () {

        return (
            <Navigator
                initialRoute={{name: 'index'}}
                configureScene={this.configureScene}
                renderScene={this.renderScene} />
        );

        //return (
        //    <View style={styles.container}>
        //        <MainScreen />
        //    </View>
        //
        //);


    }

});



var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

AppRegistry.registerComponent('seckillApp', () => seckillApp);

module.exports = seckillApp;

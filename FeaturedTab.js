'use strict';

var React = require('react-native');
var EntryList = require('./EntryList');

var {
  StyleSheet,
  NavigatorIOS,
} = React;

var FeaturedTab = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Featured Entlies',
          component: EntryList
        }} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = FeaturedTab;

'use strict';

var React = require('react-native');
var EntryList = require('./EntryList');

var {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} = React;

var SearchEntry = React.createClass({
  getInitialState: function() {
    return (
      {
        tagName: '',
        errorMessage: ''
      }
    );
  },
  tagInput: function(e) {
    this.setState(
      {
        tagName: e.nativeEvent.text,
      }
    );
  },
  searchEntry: function() {
    this.fetchData();
  },
  fetchData: function() {
    var baseURL = 'https://qiita.com/api/v2/tags/' + this.state.tagName + '/items';
    fetch(baseURL)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.title !== '') {
        this.props.navigator.push({
          title: 'Search Results',
          component: EntryList,
          passProps: {entries: responseData}
        });
      } else {
        this.setState({ errorMessage: 'No Result found'});
      }
    })
    .catch(error => this.setState({errorMessage: error}))
    .done();
  },
  viewLoadingData: function() {
    return (
      <View style={styles.activityIndicators}>
        <ActivityIndicatorIOS
          animating={true}
          size={'large'}
        />
        <View>
          <Text style={styles.loadingMessage}>Please wait a second ...</Text>
        </View>
      </View>
    );
  },
  render: function() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.instructions}>Search by tags</Text>
          <View>
            <TextInput style={styles.searchInput} onChange={this.tagInput}/>
          </View>
        </View>
        <TouchableHighlight style={styles.button} underLayColor='#f1c40f'>
          <Text style={styles.buttonText} onPress={this.searchEntry}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    padding: 10,
  },
  description: {
    fontSize: 18,
    backgroundColor: '#FFFFFF'
  },
  instructions: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 15
  },
  searchInput: {
    height: 36,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    padding: 5
  },
  button: {
    height: 36,
    backgroundColor: '#6495ED',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  errorMessage: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
    color: '#FF4500'
  },
});

module.exports = SearchEntry;

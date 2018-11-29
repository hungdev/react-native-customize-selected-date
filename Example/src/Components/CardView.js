import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    padding: 20,
    backgroundColor: '#24181c',
    borderColor: 'transparent',
    borderWidth: 1
  }
});

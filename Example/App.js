
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import DateTime from './src/Components/dateTime'
import CardView from './src/Components/CardView'
import _ from 'lodash'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: ''
    }
  }

  onChangeDate(date) {
    alert(date)
  }

  renderChildDay(day) {
    if (_.includes(['2018-11-15', '2018-12-10', '2018-12-20'], day)) {
      return <Image source={require('./src/Images/ic_lock_green.png')} style={styles.icLockRed} />
    }
    if (_.includes(['2018-11-16', '2018-12-12', '2018-12-21', '2018-12-18'], day)) {
      return <Image source={require('./src/Images/ic_lock_red.png')} style={styles.icLockRed} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 50, backgroundColor: '#201216', height: 350, paddingVertical: 20 }}>
          <DateTime
            date={this.state.time}
            changeDate={(date) => this.onChangeDate(date)}
            format='YYYY-MM-DD'
            renderChildDay={(day) => this.renderChildDay(day)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 5
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
});

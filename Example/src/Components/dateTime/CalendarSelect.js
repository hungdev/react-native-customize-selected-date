import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native'
import CommonFn from './commonFn'
import moment from 'moment'
import styles from './styles/CalendarSelectStyles'
import _ from 'lodash'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewMode: 'day'
    }
  }

  renderDay(day) {
    const { calendarMonth, date, renderChildDay } = this.props
    const isCurrentMonth = calendarMonth === CommonFn.ym()
    const isCurrent = isCurrentMonth && CommonFn.ymd() === day
    const dateSelected = date && CommonFn.ymd(date) === day
    const notCurrentMonth = day.indexOf(calendarMonth) !== 0
    return (
      <TouchableOpacity onPress={() => this.selectDate(day)}
        style={[styles.warpDay, dateSelected ? { backgroundColor: '#2C1F23' } : {}]}
      >
        <View>
          {renderChildDay(day)}
          <Text style={[styles.day, isCurrent ? { color: 'red' } : {}, notCurrentMonth ? { color: '#493D40' } : {}]}>
            {day.split('-')[2]}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  selectDate(date) {
    if (this.isDateEnable(date)) {
      this.props.selectDate(date)
    }
  }

  yearMonthChange(type, unit) {
    let { viewMode, currentYear } = this.state
    if (viewMode === 'day') {
      this.props.calendarChange(type, unit)
    } else {
      this.setState({
        currentYear: currentYear + (type < 0 ? -12 : 12)
      })
    }
  }

  isDateEnable(date) {
    const { minDate, maxDate } = this.props
    return date >= minDate && date <= maxDate
  }

  render() {
    const weekdays = ['Sun', 'Mon', 'Tus', 'Wes', 'Thu', 'Fri', 'Sat']
    const {
      calendarMonth,
      date,
      event
    } = this.props
    const data = CommonFn.calendarArray(calendarMonth)
    var dayOfWeek = []
    _.forEach(weekdays, element => {
      dayOfWeek.push(<Text key={element} style={styles.warpDayHeader}>{element}</Text>)
    })

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <MCIcons name='chevron-double-left' size={30} color='#ff2121' onPress={() => this.yearMonthChange(-1, 'year')} />
          <MCIcons name='chevron-left' size={30} color='#ff2121' onPress={() => this.yearMonthChange(-1, 'month')} />
          <Text style={styles.txtHeaderDate}>{calendarMonth.split('-')[1]}</Text>
          <Text style={styles.txtHeaderDate}>{calendarMonth.split('-')[0]}</Text>
          <MCIcons name='chevron-right' size={30} color='#ff2121' onPress={() => this.yearMonthChange(1, 'month')} />
          <MCIcons name='chevron-double-right' size={30} color='#ff2121' onPress={() => this.yearMonthChange(1, 'year')} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {dayOfWeek}
        </View>
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => this.renderDay(item)}
          extraData={this.state}
          numColumns={7}
        />
      </View>
    )
  }
}

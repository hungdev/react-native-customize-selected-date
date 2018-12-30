
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import CalendarSelect from './CalendarSelect'
import CommonFn from './commonFn'
import moment from 'moment'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      format: props.format || 'x',
      date: moment(props.date || undefined),
      minDate: CommonFn.ymd(props.minDate || '1900-01-01'),
      maxDate: CommonFn.ymd(props.maxDate || '2200-01-01'),
      yearMonth: CommonFn.ym(props.date)
    }
  }

  calendarChange(type, unit) {
    this.setState({
      yearMonth: moment(this.state.yearMonth).add(type, unit).format('YYYY-MM')
    })
  }

  selectDate(val) {
    const { date, needTime } = this.state
    const yearMonthDayArr = val.split('-')
    this.setState({
      date: moment(date).set({
        year: parseInt(yearMonthDayArr[0], 10),
        month: parseInt(yearMonthDayArr[1], 10) - 1,
        date: parseInt(yearMonthDayArr[2], 10)
      })
    }, () => {
      this.dateCallback()
    })
  }

  dateCallback() {
    const { changeDate, format } = this.props
    const { date } = this.state
    changeDate && changeDate(moment(date).set('millisecond', 0).format(format))
    // this.setState({
    //   showCalendar: false,
    // });
  }

  render() {
    const {
      minDate,
      maxDate,
      date,
      yearMonth
    } = this.state
    const { containerStyle } = this.props
    return (
      <View style={[styles.container, containerStyle]}>
        <CalendarSelect
          {...this.props}
          calendarMonth={yearMonth}
          date={date.format('YYYY-MM-DD')}
          minDate={minDate}
          maxDate={maxDate}
          selectDate={(item) => this.selectDate(item)}
          calendarChange={(type, unit) => this.calendarChange(type, unit, 'start')}
          redEvent={this.props.redEvent}
          greenEvent={this.props.greenEvent}
          renderChildDay={(day) => this.props.renderChildDay(day)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#201216',
    height: 350,
    paddingVertical: 20
  }
})

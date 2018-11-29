import { StyleSheet, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height

export default StyleSheet.create({
  day: {
    margin: 10,
    color: '#fff'
  },
  txtHeaderDate: {
    color: '#fff',
    fontSize: 18,

  },
  warpDayHeader: {
    margin: 10,
    color: 'white',
    width: screenWidth / 7 - 8,
    textAlign: 'center'
  },
  warpDay: {
    width: screenWidth / 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25171A',
    borderColor: '#201216',
    borderWidth: 1,
  },
  icLockRed: {
    width: 13 / 2,
    height: 9,
    position: 'absolute',
    top: 2,
    left: 1
  }
})

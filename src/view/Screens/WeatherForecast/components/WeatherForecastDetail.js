import React from 'react'
import { 
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'
// lay out of the forecast list
const renderLayout = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>
          {props.ForecastList.Date.substring(8, 10)}
          {'/'}
          {props.ForecastList.Date.substring(5, 7)}
        </Text>
      </View>

      <View style={styles.icon}>
        <Text style={styles.text}>
          {props.ForecastList.Day.IconPhrase}
        </Text>
      </View>

      <View style={styles.temp}>
        <Text style={styles.text}>
          {props.ForecastList.Temperature.Minimum.Value}
          {'\u00b0'}{' '}{props.ForecastList.Temperature.Minimum.Unit}
          {' '}{'~'}{' '}
          {props.ForecastList.Temperature.Maximum.Value}
          {'\u00b0'}{' '}{props.ForecastList.Temperature.Maximum.Unit}
        </Text>

      </View>

      <View style={styles.phrase}>
        <Text style={styles.text}>
          {props.ForecastList.Day.IconPhrase}
        </Text>
      </View>
    </View>
  )
}

const ForecastDetail = props => {
  return (
    renderLayout(props)
  )
}

export default ForecastDetail

const WIDTH = (Dimensions.get('window').height / 10) * 3
// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: 'yellow',
    borderWidth: 10,
    borderRadius: 20,
    borderColor: 'white',
    alignItems: 'center'
  },
  header: {
    justifyContent: 'center',
    flexGrow: 1
  },
  icon: {
    flexGrow: 5
  },
  temp: {
    justifyContent: 'center',
    flexGrow: 2
  },
  phrase: {
    justifyContent: 'center',
    flexGrow: 2
  },
  text: {
    fontFamily: 'sans-serif',
    fontSize: 20
  }
})

// react imports
import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'

// IMPORTS FOR TESTING PURPOSES
import WeatherForecast from '../../../controller/WeatherForecast'
import WeatherForecastDetail from './components/WeatherForecastDetail'
// main class
class WeatherForecastViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LocationKey: 0,
      ForecastList: [],
      lat: 21,
      long: 105
    }
    this.myForecast = new WeatherForecast()
  }

  componentDidMount () {
    this.myForecast.get5DaysForecast(this.state.lat, this.state.long)
      .then((response) => {
        this.setState({
          ForecastList: response.data.DailyForecasts
        })
        console.log('state', this.state.ForecastList)
      })
      .catch(err => console.log('MapForecastViewer :', err))
  }

  // Helper function
  renderForecast () {
    return this.state.ForecastList.map(ForecastList => (
      <ForecastDetail key={ForecastList.Date} ForecastList={ForecastList} />
    ))
  }

  // MAIN RENDER
  render () {
    return (
      <View>
        <Text>aaaa</Text>
        <Text> {console.log('inside render', this.state.ForecastList.DailyForecasts)} </Text>
        { this.renderForecast() }
      </View>
    )
  }
}

export default WeatherForecastViewer

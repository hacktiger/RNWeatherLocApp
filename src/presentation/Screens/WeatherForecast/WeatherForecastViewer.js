// react imports
import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'

// IMPORTS FOR TESTING PURPOSES
import WeatherForecast from '../../../controller/WeatherForecast'
import WeatherForecastDetail from './components/WeatherForecastDetail'
import ForecastViewModel from '../../../services/models/view_models/ForecastViewModel'
// main class
class WeatherForecastViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LocationKey: -9999,
      ForecastList: [],
      lat: -9999,
      long: -9999,
      status: '',
      err: ''
    }
    this.myForecast = new ForecastViewModel()
  }
  //
  async componentWillReceiveProps (props) {
    await this.setState({
      lat: props.lat,
      long: props.long
    })
    await this.setForecastList()
  }

  // set Forecast
  async setForecastList () {
    await this.myForecast.get5DaysForecastList(this.state.lat, this.state.long)
    var kkk = await this.myForecast.getData()
    console.log('forecastlist', kkk)
  }

  // Helper function
  renderForecast () {
    if (this.state.ForecastList && this.state.ForecastList.length !== 0) {
      return this.state.ForecastList.map(ForecastList => (
        <WeatherForecastDetail key={ForecastList.Date} ForecastList={ForecastList} />
      ))
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Something went wrong !</Text>
        </View>
      )
    }
  }

  // MAIN RENDER
  render () {
    return (
      <ScrollView
        style={{ flex: 1 }}
        horizontal={true}
        alwaysBounceHorizontal={true}
        showsHorizontalScrollIndicator={true}
      >
        { this.renderForecast() }
      </ScrollView>
    )
  }
}

export default WeatherForecastViewer

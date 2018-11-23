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
// main class
class WeatherForecastViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LocationKey: -9999,
      ForecastList: [],
      lat: -9999,
      long: -9999
    }
    this.myForecast = new WeatherForecast()
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
  setForecastList = () => {
    this.myForecast.get5DaysForecast(this.state.lat, this.state.long)
      .then((response) => {
        this.setState({
          ForecastList: response.data.DailyForecasts
        })
      })
      .catch(err => console.log('MapForecastViewer :', err))
  }

  // Helper function
  renderForecast () {
    if (this.state.ForecastList && this.state.ForecastList.length !== 0){
      return this.state.ForecastList.map(ForecastList => (
        <WeatherForecastDetail key={ForecastList.Date} ForecastList={ForecastList} />
      )) 
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
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

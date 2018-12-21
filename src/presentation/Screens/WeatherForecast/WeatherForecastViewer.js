/* eslint-disable no-unused-vars */
// react imports
import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'

// IMPORTS FOR TESTING PURPOSES
import WeatherForecastDetail from './components/WeatherForecastDetail'
import ForecastViewModel from '../../../viewmodel/ForecastViewModel'
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
    this.mforecastViewModel = new ForecastViewModel()
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
    // get data from model
    this.mforecastViewModel.get5DaysForecast(this.state.lat, this.state.long)
      .then((response) => {
        console.log('reSSSS', response)
        this.setState({
          ForecastList: response
        })
      })
  }

  // Helper function
  renderForecast () {
    let forecastListArray = []
    forecastListArray = this.state.ForcastList
    if (forecastListArray != null && forecastListArray.length !== 0) {
      return this.state.ForecastList.map(ForecastList => ( // TODO: something still not right here
        <WeatherForecastDetail key={ForecastList.index} ForecastList={ForecastList} />
      ))
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'red' }}>{/* {this.state.ForecastList.code} */} ERR</Text>
          <Text style={{ color: 'red' }}>{/* {this.state.ForecastList.message} */} MESS </Text>
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

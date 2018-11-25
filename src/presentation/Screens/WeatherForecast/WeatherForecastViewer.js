/* eslint-disable no-unused-vars */
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
import WeatherForecastModel from '../../../services/models/view_models/WeatherForecastModel'
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
    this.forecastModel = new WeatherForecastModel()
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
    this.forecastModel.getForecastModel(this.state.lat, this.state.long)
      .then((response) => {
        this.setState({
          ForecastList: response
        })
      })
  }

  // Helper function
  renderForecast () {
    if (this.state.ForecastList.status == null && this.state.ForecastList.length !== 0) {
      return this.state.ForecastList.map(ForecastList => (
        <WeatherForecastDetail key={ForecastList.index} ForecastList={ForecastList} />
      ))
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'red' }}>{this.state.ForecastList.code}</Text>
          <Text style={{ color: 'red' }}>{this.state.ForecastList.message}</Text>
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

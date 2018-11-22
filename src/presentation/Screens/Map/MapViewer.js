/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {
  StyleSheet,
  View
} from 'react-native'
// my c
import { Navigation } from 'react-native-navigation'
import MapController from '../../../controller/MapController'
import WeatherForecastViewer from '../WeatherForecast/WeatherForecastViewer'
/**
 *main class map view
 */
class MapViewer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      LATITUDE: -9999,
      LONGITUDE: -9999
    }
    this.myMapController = new MapController()
  }
  //
  componentDidMount () {
    this.setLatLong()
  }
  //
  async setLatLong () {
    let coords = await this.myMapController.retrieveMyCurrentPosition()
    this.setState({
      LATITUDE: coords.LATITUDE,
      LONGITUDE: coords.LONGITUDE
    })
  }
  //
  renderMap () {
    return (
      <MapView
        // LOAD MAP
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: this.state.LATITUDE,
          longitude: this.state.LONGITUDE,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        }}
      >
        {/* Map Marker */}
        <MapView.Marker
          coordinate={{
            latitude: this.state.LATITUDE,
            longitude: this.state.LONGITUDE
          }}
          title={'Current Location'}
          description={'This is your current position'}
        />
      </MapView>
    )
  }

  renderForecast () {
    return <WeatherForecastViewer lat={this.state.LATITUDE} long={this.state.LONGITUDE} />
  }

  // MAIN RENDER
  render () {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.5 }}>
          { this.renderMap() }
        </View>
        <View style={styles.forecastContainer}>
          { this.renderForecast() }
        </View>
      </View>
    )
  }
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  forecastContainer: {
    flex: 0.5,
    elevation: 10
  },
  map: {
    flex: 1,
    marginTop: 35
  }
})

// EXPORT !!important
export default MapViewer

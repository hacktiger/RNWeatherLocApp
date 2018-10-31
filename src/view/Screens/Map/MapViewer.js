import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import {
  StyleSheet,
  YellowBox
} from 'react-native'
// my c
// import Spinner from './src/components/Spinner';
import MapController from '../../../controller/MapController'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])
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
  async componentDidMount () {
    let coords = await this.myMapController.retrieveMyCurrentPosition()
    this.setState({
      LATITUDE: coords.LATITUDE,
      LONGITUDE: coords.LONGITUDE
    })
    console.log(this.state)
  }

  //
  renderMap () {

  }
  // MAIN RENDER
  render () {
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
}

// STYLES
const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})

// EXPORT !!important
export default MapViewer

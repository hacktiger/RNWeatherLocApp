import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  StyleSheet,
  View 
} from 'react-native';
// my c
// import Spinner from './src/components/Spinner';
import MapController from '../../../controller/MapController';

/**
 *main class map view
 */
class MapViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      LATITUDE: -9999,
      LONGITUDE: -9999,
      LocationKey: 0
    }
    this.myMapController = new MapController()
  }
  //
  async componentDidMount () {
    let coords = await this.myMapController.retrieveMyCurrentPosition();
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
  // MAIN RENDER
  render () {
    return (
      <View style={styles.container}>
        { /* render map with renderMap() */ }
        {this.renderMap()}
      </View>
    )
  }
}

// STYLES
const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, elevation: 1 },
  map: { ...StyleSheet.absoluteFillObject }
});

// EXPORT !!important
export default MapViewer

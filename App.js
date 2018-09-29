/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { View, StyleSheet,PermissionsAndroid ,Text, Button } from 'react-native'


async function requestGPSPermission() {
    console.log('Activated func');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
                     'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
}
export default class App extends Component {

  
  render() {
    return (
      <View style={styles.container}>

        <Button
          onPress={() => {
            console.log('Pressed');
            requestGPSPermission();
            navigator.geolocation.getCurrentPosition(
              (position) => console.log(position),
              (err) => console.log(err),
               {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );

            //Alert.alert('You tapped the button!');
          }}
          title="Display GPS"
        />
      </View>
    );
  }
}


 class MapTest extends Component {

  render () {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 21.026416,
            longitude: 105.851541,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <MapView.Marker
            coordinate = {{
              latitude: 21.026416,
              longitude: 105.851541,
            }}
            title = {'Title'}
            description = {'description'}
          />
        </MapView>
      </View>
    )   
  }
}

const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject },
  map: { ...StyleSheet.absoluteFillObject }
})


/**
*   STYLESHEET
*/

import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { 
	Text,
	View, 
	StyleSheet,
	PermissionsAndroid
} from 'react-native'

/**
*	main class map view
*/
class MapViewer extends Component {


	//myLatitude = this.getCurrentPosition();
	//myLongitude = this.getCurrentPosition();
	render(){
		return(	
			<View style={styles.container}>
				<Text>
            	</Text>
		        <MapView
		        //LOAD MAP
		          provider={PROVIDER_GOOGLE}
		          style={styles.map}
		          region={{
		            latitude:  21.026446999999997,
		            longitude:  105.8257094,
		            latitudeDelta: 0.1,
		            longitudeDelta: 0.1,
		          }}
		        >
		        
		        <MapView.Marker
		        // CURRENT LOCATION MARKER
		            coordinate = {{
		              latitude:21.026446999999997,
		              longitude:  105.8257094,
		            }}
		            title = {'My Location'}
		            description = {'description'}
		          />
		        </MapView>
      		</View>
		)
	}

}

//STYLES
const styles = StyleSheet.create({
  container: { ... StyleSheet.absoluteFillObject , elevation : 1},
  map: { ...StyleSheet.absoluteFillObject }
})

//EXPORT !!important
export default MapViewer;
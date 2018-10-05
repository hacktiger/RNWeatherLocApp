import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { 
	View, 
	StyleSheet,
} from 'react-native'
//
//import Spinner from './src/components/Spinner';

/**
*	main class map view
*/
class MapViewer extends Component {
	constructor(props){
		super(props);
        this.state = {
			LATITUDE : -9999,
			LONGITUDE :  -9999 ,
			LocationKey : 0,
		};


	}
	////
	UNSAFE_componentWillMount(){
		console.log("Mounting");
		navigator.geolocation.getCurrentPosition(
        (position) => 	{ this.setState  ({ LATITUDE : position.coords.latitude,
        								LONGITUDE : position.coords.longitude  }) 
    					},
        (err) => console.log(err),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
	}


	///////
	renderMap(){
			return (
				<MapView
			        //LOAD MAP
			          provider={PROVIDER_GOOGLE}
			          style={styles.map}
			          region={{
			            latitude:  this.state.LATITUDE,
			            longitude:  this.state.LONGITUDE,
			            latitudeDelta: 0.1,
			            longitudeDelta: 0.1,
			          }}
			        >
			        
			        <MapView.Marker
			        // CURRENT LOCATION MARKER
			            coordinate = {{
			              latitude: this.state.LATITUDE,
			              longitude:  this.state.LONGITUDE,
			            }}
			            title = {'My Location'}
			            description = {'description'}
			          />
			        </MapView>
			);
	}
	////MAIN RENDER
	//myLatitude = this.getCurrentPosition();
	//myLongitude = this.getCurrentPosition();
	render(){
		return(	
			<View style={styles.container}>
		        {this.renderMap()}
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
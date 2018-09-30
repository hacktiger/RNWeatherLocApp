// Libaries
import React from 'react';
import {
 	AppRegistry, 
	View, 
	StyleSheet, 
	Button,
	TouchableOpacity,
	Text
} from 'react-native';

//My Components
//import App from './App';
import Header from './src/components/header';
import MapViewer from './src/components/MapViewer';

//Create comp
const App = () => (
	<View style = {styles.container}>
		<View style = {styles.headerContainer}>
			<Header headerText = "HEADER2" />
		</View>

		<View style = {styles.body}>
			<MapViewer />
		</View>

		<View style = {styles.footerContainer }>
			<TouchableOpacity
         		style={styles.button}
         		onPress={console.log('aaa')}
       		>
        		 <Text style = {{color : '#FFFFFF'}}> 2Touch Here </Text>
       		</TouchableOpacity>
		</View>

	</View>
);

//Styles
const styles = StyleSheet.create({
  	container: { 
	  	... StyleSheet.absoluteFillObject,
	  	flex: 1,
	  	flexDirection : 'column',
  	},
	headerContainer:{
		flex : 0.1
	},
	body:{
		flex : 1.6
	},
	footerContainer:{
		flex: 0.2,   
		justifyContent: 'center',	
	},  
	button : {
		borderRadius : 2,
		height : 60,
		justifyContent: 'center',
		alignItems: 'center',
    	backgroundColor: '#3b5998',
	},
})


//Render
AppRegistry.registerComponent('WorkingApp', () => App);

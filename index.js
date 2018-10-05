// Libaries
import React, { Component } from 'react';
import {
 	AppRegistry, 
	View, 
	StyleSheet, 
	TouchableOpacity,
	Text
} from 'react-native';

//My Components
//import App from './App';
import Header from './src/components/header';
import MapViewer from './src/components/MapViewer';
import WeatherList from './src/components/WeatherList';
import Spinner from './src/components/Spinner';

// mayba later : import { Header, MapViewer } from './src/components/index';

//Create comp
class App extends Component { 
	//State
	state = { loading : false , region : 'unknown'};

	//TouchOpacity(button) on press => execute this func
	onButtonPress() {
		this.setState({ loading : true });
	}
	// Render touchOp or Spinner ( if loading )
	renderButton(){
		if ( this.state.loading ){
			return <Spinner />
		} 
		return (
			<TouchableOpacity 
		        style={styles.button}
		        //bind onpress to helper func
		        //func will happen in future -> bind this
		        onPress={this.onButtonPress.bind(this)}
		    >
		        <Text style = {{color : '#FFFFFF'}}> Get Weather Stats </Text>
		    </TouchableOpacity>
		);
	}
	/*
	72.  2p50
	onStatsLoadingSuccess(){
		
	}

	onStatsLoadingFail(){
	

	}
	*/

	//MAIN RENDER <MapViewer />
	render(){
		return (
			<View style = {styles.container}>
				<View style = {styles.headerContainer}>
					<Header headerText = "MAP PAGE" />
				</View>
				<View style = {styles.body} /* MAIN MAP */>
					
					<WeatherList />
				</View>
				<View style = {styles.footerContainer } >
					{ this.renderButton() /* return touchOpacity JSX */}
				</View>
			</View>
		)
	}


};


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
		marginTop:25,
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

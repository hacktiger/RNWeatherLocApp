// Libaries
import React, { Component } from 'react';
import {
 	AppRegistry, 
	View, 
	StyleSheet, 
	TouchableOpacity,
	Text,
	Dimensions 
} from 'react-native';
//My Components
//import App from './App';
import Header from './src/view/common/Header';
import Spinner from './src/view/common/Spinner';
import WeatherForecastViewer from './src/view/Screens/WeatherForecast/WeatherForecastViewer' ;
import MapViewer from './src/view/Screens/Map/MapViewer';
import UserViewer from './src/view/Screens/User/UserViewer';

// Create comp
class App extends Component { 
	//State
	state = { 
		loading : false , 
		region : 'unknown'
	};

	//TouchOpacity(button) on press => execute this func
	onButtonPress() {
		this.setState({ 
			loading : true 
		});
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
		        <Text style = {{color : '#FFFFFF'}}> Bottom Tab Nav </Text>
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
				{/* Header */}
				<View style = {styles.headerContainer}>
					<Header headerText = "UserPAGE" />
				</View>
				{/* main body */}
				<View style = {styles.body} >
					{/* <MapViewer /> */}
					{/* <WeatherForecastViewer /> */} 
					<UserViewer />
				</View>
				{/* Footer */}
				<View style = {styles.footerContainer } >
					{ this.renderButton()}
				</View> 
			</View>
		)
	}


};

//Styles
const styles = StyleSheet.create({
  container: { 
	  flex: 1,
		backgroundColor:'#b642f4'
  },
	headerContainer:{
		width: Dimensions.get('window').width,
		flexGrow:0.14
		,backgroundColor:'green'
	},
	body:{
		width: Dimensions.get('window').width,
		flexGrow: 0.76
		,backgroundColor:'red'
	},
	footerContainer:{  
		width: Dimensions.get('window').width,
		flexGrow:0.1
	},  
	button : {
		flexGrow:1,
		justifyContent: 'center',
		alignItems: 'center',
    backgroundColor: '#3b5998',
	},
})

// App registry
AppRegistry.registerComponent('WorkingApp', () => App);

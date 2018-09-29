// Libaries
import React from 'react';
import { AppRegistry } from 'react-native';

//My Components
//import App from './App';
import Header from './src/components/header'

//Create comp
const App = () => (
	<Header headerText = { ' INDEX PAGE ' } />
);

//Render
AppRegistry.registerComponent('WorkingApp', () => App);

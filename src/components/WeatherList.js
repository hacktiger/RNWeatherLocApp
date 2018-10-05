import React, { Component } from 'react'
import { 
	Text,
	View, 
	StyleSheet,
} from 'react-native'
///
import ForecastDetail from './ForecastDetail';
///

export default class WeatherList extends Component{
	state = {
		LocationKey : 0,
		ForecastList : [],
	}
	/*
	fetch(`http://dataservice.accuweather.com/locations/v1/cities
			/geoposition/search?apikey=JHgkYrYxh6FNUAfzQfDZWnlPPcJjl5GR
			&q=${this.state.LATITUDE}%2C${this.state.LONGITUDE}
			&language=en&details=false&toplevel=true`)

						.then( (response) => response.json())
			.then( (responseJson) => {
				this.setState({ LocationKey : responseJson.Key,});
			})
			.catch((err) => {
				console.error(err);
			});

	*/
	componentDidMount(){
		const APIkey = "ZJ0m9fUoAyMyW8YYwuLKDFGbs0LLYNp1";

		fetch("http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=ZJ0m9fUoAyMyW8YYwuLKDFGbs0LLYNp1&q=21.0264415%2C105.82569989999999")
			.then( (response) => response.json())
			.then( (responseJson) => {
				this.setState({ LocationKey : responseJson.Key,});
			})
			.catch((err) => {
				console.error(err);
			});

		//fetch 2nd
		fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/353412?apikey=ZJ0m9fUoAyMyW8YYwuLKDFGbs0LLYNp1")
			.then((response) => response.json())
			.then((responeWeather) => {
				this.setState( { ForecastList: responeWeather.DailyForecasts } )
			})
			.catch((err) => {
				console.error(err);
			});
	}

	//Helper function
	renderForecast(){
		return this.state.ForecastList.map( ForecastList => 
			<ForecastDetail key={ForecastList.Date}  ForecastList={ForecastList}  /> 
		);
	}
	

	render(){
		return(
			<View>
				{this.renderForecast()}
			</View>
		)
	}
}
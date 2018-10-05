import React from 'react';
import {View, Text} from 'react-native';

const ForecastDetail = (props) =>{
	return (
		<View>
		{		console.log(JSON.stringify(props.ForecastList))}

			<Text> {props.ForecastList.Date} </Text>


			<View>
				<Text>Day</Text>
				<Text>{props.ForecastList.Day.IconPhrase}</Text>
			</View>

			<View>
				<Text>Minimum Temp</Text>
				<Text>{ props.ForecastList.Temperature.Minimum.Value}</Text>
			</View>
		</View>
	);
};

export default ForecastDetail;
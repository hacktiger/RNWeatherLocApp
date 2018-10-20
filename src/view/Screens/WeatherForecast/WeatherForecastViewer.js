// react imports
import React, { Component } from 'react';
import { 
  Text,
  View 
} from 'react-native';
// my imports
// import ForecastDetail from './components/WeatherForecastDetail' ;
// import WeatherForecastController from '../../../controller/WeatherForecastController' ;
//

class WeatherForecastViewer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      LocationKey: 0,
      ForecastList: [],
    };
    // this.myForecast = new WeatherForecastController();
  }
  //
  setForecastList () {
    // let k = this.myForecast.get5DaysWeatherForecast();
    // console.log(k);
  }

  // Helper function
  renderForecast () {
    return this.state.ForecastList.map(ForecastList => (
      <ForecastDetail key={ForecastList.Date} ForecastList={ForecastList} />
    ));
  }

  // MAIN RENDER
  render () {
    return (
      <View>
        <Text>aaaa</Text>
        <Text>aaaa</Text>
        <Text>aaaa</Text>
        <Text>aaaa</Text>
        <Text>aaaa</Text>
      </View>
    );
  }
}

export default WeatherForecastViewer ;
// add {this.renderForecast()} in view later

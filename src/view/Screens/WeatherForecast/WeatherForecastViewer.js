// react imports
import React, { Component } from 'react';
import { 
  Text,
  View 
} from 'react-native';
// my imports
// import ForecastDetail from './components/WeatherForecastDetail' ;
import WeatherForecastController from '../../../controller/WeatherForecastController' ;

// IMPORTS FOR TESTING PURPOSES
import { WeatherGateway } from '../../../configs/myApi';
// import { createCloudConfigs } from '../../../configs/configs';
// import environment from '../../../configs/environment/index';
// import createCloudConfigs from '../../../configs/configs';
// import ApiGateway from '../../../services/models/ApiGateway' ; 


// main class
class WeatherForecastViewer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      LocationKey: 0,
      ForecastList: []
    };
    this.myForecast = new WeatherForecastController();
  }
  //
  async setForecastList () {
    await this.myForecast.getLocationKey()
    let forecast = await this.myForecast.get5DaysForecast()
    // temp
    console.log('gg')
    if (forecast) {
      console.log('ok')
    } else {
      console.log('not ok')
    }
  }

  async test () {
    let test = await this.myForecast.getLocationKey()
    console.log(this.state)
  }
  componentDidMount () {
    // this.setForecastList()
    this.test()
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

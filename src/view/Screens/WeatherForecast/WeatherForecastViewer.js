import React, { Component } from 'react';
import { 
  Text,
  View 
} from 'react-native';
///
import ForecastDetail from './components/WeatherForecastDetail';
import WeatherGateway from '../../../configs/myApi';
///

class WeatherForecastViewer extends Component {
  constructor (props) {
    super(props);
    this.state = {
      LocationKey: 0,
      ForecastList: [],
      // temporary put api key herre
      APIkey: "ZJ0m9fUoAyMyW8YYwuLKDFGbs0LLYNp1"
    };
  }

  /// latitude and longitude will come from state of other
  getLocationKey () {
    WeatherGateway.get(
      "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.state.APIkey}&q=21.0264415%2C105.82569989999999"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ LocationKey: responseJson.Key });
      })
      .then(this.fetchForecastData())
      .catch(err => {
        console.error(err);
      });
  }

  fetchForecastData (locationKey) {
    WeatherGateway.get(
      `http://dataservice.accuweather.com/forecasts/v1/daily/5day/353412?apikey=${locationKey}`
    )
      .then(response => response.json())
      .then(responeWeather => {
        this.setState({ ForecastList: responeWeather.DailyForecasts });
      });
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

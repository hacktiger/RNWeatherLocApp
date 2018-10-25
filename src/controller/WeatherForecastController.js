//
import WeatherDataService from '../services/models/WeatherDataService';

export default class WeatherForecastController {
  constructor () {
    this.WeatherDataServices = new WeatherDataService()
  }
  getLocationKey (latitude, longitude) {
    this.WeatherDataServices.getLocationKey(latitude, longitude)
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          LocationKey: responseJson.Key
        })
      )
      .catch(err => console.log('LOC_KEY ERR : ', err));
  }

  get5DaysForecast (locationKey) {
    this.WeatherDataServices.forecast(locationKey)
      .then(response => response.json())
      .then(responseJson =>
        this.setState({
          ForecastList: responseJson.DailyForecasts
        })
      )
      .catch(err => console.log("FORE_ERROR : ", err));
  }
  // end class
}

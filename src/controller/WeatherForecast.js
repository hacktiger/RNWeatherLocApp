// my imports
import WeatherDataService from '../services/models/WeatherDataService';
// init WeatherDataService as  WeatherDataServices
const WeatherDataServices = new WeatherDataService()
export default class WeatherForecast {
  get5DaysForecast (lat, long) {
    return WeatherDataServices.getLocationKey(lat, long)
      .then(response => this._handleSuccess(response))
      .catch(err => this._handleError(err))
  }

  _handleSuccess (response) {
    // console.log('forecast.js', response)
    return WeatherDataServices.forecast(response.data.Key)
  }

  _handleError (error) {
    console.log('WeatherForecast.js:', error)
  }
}

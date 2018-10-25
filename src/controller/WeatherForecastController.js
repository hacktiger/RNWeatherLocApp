//
import WeatherDataService from '../services/models/WeatherDataService';

export default class WeatherForecastController {
  constructor () {
    this.WeatherDataServices = new WeatherDataService()
  }

  get5DaysForecast (lat, long) {
    WeatherDataService.getLocationKey(lat, long)
      .then(response => this.handleSuccess(response))
      .catch(err => this.handleError(err))
  }

  handleSuccess (response) {
    return WeatherDataService.forecast(response.locationKey)
  }

  handleError (error) {
    console.log(error)
  }
}

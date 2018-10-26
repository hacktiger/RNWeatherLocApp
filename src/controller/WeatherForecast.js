//
import WeatherDataService from '../services/models/WeatherDataService';

export default class WeatherForecast {
  constructor () {
    this.WeatherDataServices = new WeatherDataService()
  }

  get5DaysForecast (lat, long) {
    return this.WeatherDataServices.getLocationKey(lat, long)
      .then(response => this.handleSuccess(response))
      .catch(err => this.handleError(err))
  }

  handleSuccess (response) {
    console.log('controller handle : ', response)
    return this.WeatherDataServices.forecast(response.data.Key)
  }

  handleError (error) {
    console.log(error)
  }
}

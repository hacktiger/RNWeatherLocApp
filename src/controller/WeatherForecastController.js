//
import {
  promiseAccuWeatherLocationKey,
  promiseAccuWeather5DaysForecast
} from '../model/WeatherForecast'; 

class WeatherForecastController {
  getLocationKey (latitude, longitude) {
    promiseAccuWeatherLocationKey(latitude, longitude)
      .then(response => response.json())
      .then(
        responseJson => this.setState({
          LocationKey: responseJson.Key
        })
      )
      .catch(err => console.log('LOC_KEY ERR : ', err))
  }

  get5DaysForecast (locationKey) {
    promiseAccuWeather5DaysForecast(locationKey)
      .then(response => response.json())
      .then(responseJson => this.setState({
        ForecastList: responseJson.DailyForecasts
      }))
      .catch(err => console.log('FORE_ERROR : ', err))
  }
// end class
}

// export as default
export default WeatherForecastController ;

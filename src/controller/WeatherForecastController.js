//
import {
  getAccuWeatherLocationKey,
  get5DaysForecast
} from '../model/WeatherForecast'; 

class WeatherForecastController {
  async get5DaysWeatherForecast (latitude, longitude) {
    const locationKey = await getAccuWeatherLocationKey(latitude, longitude) ;
    // console.log('key :', locationKey) ;
    if (locationKey) {
      const forecast = await get5DaysForecast();
      if (!forecast.error) {
        return forecast ;
      }
    } else {
      return console.log('error');
    }
  }
}

export default WeatherForecastController ;
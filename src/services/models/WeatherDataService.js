import { WeatherGateway } from '../configs/myApi';
import { WEATHER_API_KEY } from '../configs/environment/index';
//
const PATH_LOCATION_KEY = '/locations/v1/cities/geoposition';
const PATH_5DAYS_FORECAST = '/forecasts/v1/daily/5day';
// 21.0264415%2C105.82569989999999
// loc : `${PATH_LOCATION_KEY}/search?apikey=${WEATHER_API_KEY}&q=${lat},${long}`
// fore : `${PATH_5DAYS_FORECAST}/${LocationKey}?apikey=${WEATHER_API_KEY}`
export default class WeatherDataService {

  getLocationKey = () => {
    WeatherGateway.get()
      .then( (response) => {
        WeatherGateway.forecast(response.apikey)
      })
      .then( (forecast) => {
        return Promise.resolve(forecast)
      })
      .catch(err => console.log(err))
  }

  forecast = (locationKey) => {
    
  }
}


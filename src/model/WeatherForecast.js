import WeatherGateway from '../../../configs/myApi';
//
const ENDPOINT = 'http://dataservice.accuweather.com';
const PATH_LOCATION_KEY = '/locations/v1/cities/geoposition';
const API_KEY = 'ZJ0m9fUoAyMyW8YYwuLKDFGbs0LLYNp1';
const PATH_5DAYS_FORECAST = '/forecasts/v1/daily/5day';
// 21.0264415%2C105.82569989999999

export const getAccuWeatherLocationKey = async (lat, long) => {
  const response = await WeatherGateway.get(`${ENDPOINT}${PATH_LOCATION_KEY}/search?apikey=${API_KEY}&q=${lat}%2C${long}`)
  const responseJSON = await response.json();

  return responseJSON.Key ;
}

export const get5DaysForecast = async (LocationKey) => {
  const response = await WeatherGateway.get(`${ENDPOINT}${PATH_5DAYS_FORECAST}/${LocationKey}?apikey=${API_KEY}}`)
  const responseJSON = await response.json();

  return responseJSON.DailyForecasts ;
}

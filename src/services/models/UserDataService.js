import { UserGateway } from '../../configs/myGateway'
//
const PATH_COMMON = '/api'
const PATH_USER_LIST = '/users'
const PATH_USER_LIST_PAGE = '?page='
// 21.0264415%2C105.82569989999999
// loc : `${PATH_LOCATION_KEY}/search?apikey=${WEATHER_API_KEY}&q=${lat},${long}`
// fore : `${PATH_5DAYS_FORECAST}/${LocationKey}?apikey=${WEATHER_API_KEY}`
export default class WeatherDataService {
  getUserList (pageNum) {
    return UserGateway.get(`${PATH_COMMON}${PATH_USER_LIST}${PATH_USER_LIST_PAGE}${pageNum}`)
  }
}

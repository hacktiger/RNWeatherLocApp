import { UserGateway } from '../../configs/myGateway'
//
const PATH_COMMON = '/api'
const PATH_USER_LIST = '/users'
const PATH_USER_LIST_PAGE = '?page='
// ${PATH_COMMON}${PATH_USER_LIST}${PATH_USER_LIST_PAGE}${pageNum}
export default class WeatherDataService {
  getUserListByPage (pageNum) {
    return UserGateway.get(`${PATH_COMMON}${PATH_USER_LIST}${PATH_USER_LIST_PAGE}${pageNum}`)
  }
}

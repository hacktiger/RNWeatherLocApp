import { UserGateway } from '../../configs/myGateway'
//
const PATH_COMMON = '/api'
const PATH_USER = '/users'
const QUERRY_USER_LIST_PAGE = '?page='
// ${PATH_COMMON}${PATH_USER_LIST}${PATH_USER_LIST_PAGE}${pageNum}
export default class UserDataService {
  getUserListByPage (pageNum) {
    return UserGateway.get(`${PATH_COMMON}${PATH_USER}${QUERRY_USER_LIST_PAGE}${pageNum}`)
  }

  postUser (body) {
    return UserGateway.post(`${PATH_COMMON}${PATH_USER}`, body)
  }

  putUserById (id, body) {
    return UserGateway.put(`${PATH_COMMON}${PATH_USER}/${id}`, body)
  }

  deleteUserById (id) {
    return UserGateway.delete(`${PATH_COMMON}${PATH_USER}/${id}`)
  }

  getUserById (id) {
    return UserGateway.get(`${PATH_COMMON}${PATH_USER}/${id}`)
  }
}

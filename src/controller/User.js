//
import UserDataService from '../services/models/UserDataService'

const UserData = new UserDataService()
export default class User {
  // try to get all some time later
  getAllUserList (pageNo) {
    return UserData.getUserListByPage(pageNo)
      .then(response => this._handleSuccess(response))
      .catch(err => this._handleError(err))
  }
  // handle response if success
  _handleSuccess (response) {
    // console.log(response)
    if (response.status === 404) {
      return this._handleError('User Page not Found')
    } else {
      return UserData.getUserListByPage(parseInt(response.data.page))
    }
  }
  // handle response if error
  _handleError (error) {
    console.log('User.js', error)
    return null
  }
}

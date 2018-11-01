// my imports
import UserDataService from '../services/models/UserDataService'
// init UserDataService() as UserData
const UserData = new UserDataService()
export default class User {
  // get list by page num
  getAllUserList (pageNo) {
    return UserData.getUserListByPage(pageNo)
      .then(response => this._handleSuccess(response))
  }
  // get one user by id
  getUser (id) {
    return UserData.getUserById(id)
      .then(response => this._handleSuccess(response))
  }
  // create new user
  createUser (body) {
    return UserData.postUser(body)
      .then(response => this._handleSuccess(response))
  }
  // update user by id
  updateUser (id, body) {
    return UserData.putUserById(id, body)
      .then(response => this._handleSuccess(response))
  }
  // delete
  deleteUser (id) {
    return UserData.deleteUserById(id)
      .then(response => this._handleSuccess(response))
  }

  // HANDLING
  // handle response if success
  _handleSuccess (response) {
    // console.log(response)
    return response
  }
  // handle response if error
  _handleError (error) {
    // console.log('User.js err : ', error)
    return error
  }
}

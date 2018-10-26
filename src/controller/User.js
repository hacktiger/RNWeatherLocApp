//
import UserDataService from '../services/models/UserDataService'

const UserData = new UserDataService()
export default class User {
  getAllUserList () {
    var myArray = [1, 2, 3, 4,5,6,7,8]
    for (var value of myArray) {
      UserData.getUserList(value)
        .then(response=>console.log(response))
    }
  }

  handleSuccess (response) {
    console.log('User controller handle : ', response)
    // return this.WeatherDataServices.forecast(response.data.Key)
  }

  handleError (error) {
    console.log(error)
  }
}

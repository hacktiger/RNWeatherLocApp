import AuthDataService from '../services/models/AuthDataService'

var myVar = null
class Auth {
  constructor () {
    this.FirebaseSingleton = AuthDataService.getInstance()
  }
  logInUser (email, password) {
    return this.FirebaseSingleton.auth().signInWithEmailAndPassword(email, password)
  }

  signUpUser (email, password) {
    return this.FirebaseSingleton.auth().createUserWithEmailAndPassword(email, password)
  }
}

export default Auth

import AuthDataService from '../services/models/AuthDataService'

class Auth {
  initFirebase () {
    AuthDataService.init()
  }

  logInUser (email, password) {
    return AuthDataService.auth().signInWithEmailAndPassword(email, password)
  }

  signUpUser (email, password) {
    return AuthDataService.auth().createUserWithEmailAndPassword(email, password)
  }
}

export default Auth

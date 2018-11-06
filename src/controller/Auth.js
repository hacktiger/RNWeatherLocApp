import AuthDataService from '../services/models/AuthDataService'

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

  signOutUser () {
    return this.FirebaseSingleton.auth().signOut()
  }
}

export default Auth

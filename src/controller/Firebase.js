import FirebaseDataService from '../services/models/FirebaseDataService'

class Firebase {
  constructor () {
    this.FirebaseSingleton = FirebaseDataService.getInstance()
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

  // DATABASE stuff
  database () {
    return this.FirebaseSingleton.database()
  }
}

export default Firebase

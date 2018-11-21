import FirebaseDataService, {
  getUser,
  getMoreUser
} from '../services/data/FirebaseDataService'

class UserFirebase {
  // contructor
  constructor () {
    this.FirebaseSingleton = FirebaseDataService.getInstance()
  }

  auth () {
    return this.FirebaseSingleton.auth()
  }

  getCurrUser () {
    return this.FirebaseSingleton.auth().currentUser
  }

  getUid () {
    let check = this.FirebaseSingleton.auth().currentUser
    // console.log(check)
    if (check) {
      return check.uid
    } else {
      return null
    }
  }
  // Authentication stuff
  logInUser (email, password) {
    return this.FirebaseSingleton.auth().signInWithEmailAndPassword(
      email,
      password
    )
  }

  signUpUser (email, password) {
    return this.FirebaseSingleton.auth().createUserWithEmailAndPassword(
      email,
      password
    )
  }

  signOutUser () {
    return this.FirebaseSingleton.auth().signOut()
  }
  // DB stuff
  saveUserToDB (id, email) {
    // maybe to let or const later
    let data = {
      id: id,
      email: email
    }
    this.userRef.child(id).set(data)
  }
  // Chat App stuff
  // init database
  database () {
    return this.FirebaseSingleton.database()
  }
  // REST
  getUserList () {
    return getUser()
  }
  getMoreUserList (endAtUserKey) {
    return getMoreUser(endAtUserKey)
  }
  // END CLASS
}
export default UserFirebase

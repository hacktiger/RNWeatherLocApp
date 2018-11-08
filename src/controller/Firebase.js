import FirebaseDataService, {getUser} from '../services/models/FirebaseDataService'

class Firebase {
  uid = ''
  messagesRef = null // firebase database ref('messages')
  userRef = null
  // contructor
  constructor() {
    this.FirebaseSingleton = FirebaseDataService.getInstance()
    this.onStateChanged()
  }
  // set this user id
  onStateChanged = () => {
    // console.log('on state changed called')
    this.FirebaseSingleton.auth().onAuthStateChanged((user) => {
      // console.log('before set', this.getUid())
      if (user) {
        this.setUid(user.uid)
      } else {
        this.setUid('')
      }
      // console.log('after set', this.getUid())
    })
  }
  // setter + getter
  setUid (id) {
    this.uid = id
  }

  getUid () {
    return this.uid
  }
  // Authentication stuff
  logInUser (email, password) {
    return this.FirebaseSingleton.auth().signInWithEmailAndPassword(email, password)
  }

  signUpUser (email, password) {
    return this.FirebaseSingleton.auth().createUserWithEmailAndPassword(email, password)
  }

  signOutUser () {
    return this.FirebaseSingleton.auth().signOut()
  }

  // DB stuff
  saveUserToDB (id, email) { // maybe to let or const later
    this.userRef = this.database().ref('users')
    let data = {
      email: email
    }
    this.userRef.child(id).set(data)
  }

  // Chat App stuff
  // init database
  database () {
    return this.FirebaseSingleton.database()
  }
  // load previous message
  loadMessages (callback) {
    this.messagesRef = this.database().ref('messages')
    this.messagesRef.off()
    const onReceive = (data) => {
      const message = data.val()
      callback({
        _id: data.key,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      })
    }
    this.messagesRef.limitToLast(20).on('child_added', onReceive)
  }
  // send message
  sendMessage (message) {
    for(let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: new Date() // invalid date
      })
    }
  }
  // close chat connection
  closeChatConn () {
    if (this.messagesRef) {
      this.messagesRef.off()
    }
  }

  // REST
  getUserList () {
    return getUser()
  }
// END CLASS
}

export default Firebase

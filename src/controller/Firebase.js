import FirebaseDataService from '../services/models/FirebaseDataService'

class Firebase {
  uid = '';
  messagesRef = null;

  constructor() {
    this.FirebaseSingleton = FirebaseDataService.getInstance()
    this.onStateChanged()
  }

  onStateChanged = () => {
    this.FirebaseSingleton.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid)
      }
    })
  }

  setUid (id) {
    this.uid = id
  }

  getUid () {
    return this.uid
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

  loadMessages (callback) {
    this.messagesRef = this.database().ref('messages')
    this.messagesRef.off()

    const onReceive = (data) => {
      const message = data.val()
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      })
    }
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }

  sendMessage (message) {
    for(let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: '2017-10-24T09:24:03.329Z'
      })
    }
  }

  closeChatConn () {
    if (this.messagesRef) {
      this.messagesRef.off()
    }
  }
// END CLASS
}

export default Firebase

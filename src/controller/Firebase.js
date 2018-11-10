import FirebaseDataService, {getUser} from '../services/models/FirebaseDataService'

class Firebase {
  messagesRef = null // firebase database ref('chat/messages')
  roomsRef = null // chat room ref('chat/rooms')
  userRef = null
  // contructor
  constructor() {
    this.FirebaseSingleton = FirebaseDataService.getInstance()
  }

  auth() {
    return this.FirebaseSingleton.auth()
  }
  getUid () {
    let check = this.FirebaseSingleton.auth().currentUser
    console.log(check)
    if (check){
      return check.uid
    } else {
      return null
    }
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
  // load previous message
  loadMessages (friendID, myID, callback) {
    let roomID = this.getRoomID(friendID, myID)
    // console.log('load mess', UserID)
    this.messagesRef = this.database().ref('chat/messages')
    this.messagesRef.off()
    const onReceive = (data) => {
      const message = data.val()
      // console.log(message.text)
      callback({
        _id: data.key,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: message.user._id
        }
      })
    }
    // console.log(UserID) // roomID equalTo roomID
    this.messagesRef.orderByChild('roomID').equalTo(roomID).limitToLast(20).on('child_added', onReceive)
  }
  // send message
  sendMessage (friendID, myID, message) {
    // console.log('send mess', senderID)
    let roomID = this.getRoomID(friendID, myID)
    for(let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: new Date().toUTCString(),
        roomID: roomID
      })
    }
  }
  // get room id
  getRoomID (friendID, myID) {
    let bigger = ''
    let smaller = ''
    if (friendID > myID){
      bigger = friendID
      smaller = myID
    } else {
      bigger = myID
      smaller = friendID
    }
    return roomID = bigger+smaller
  }
  // create chat room
  async createRoom (receiverID, senderID) {
    let roomID = await this.getRoomID(receiverID, senderID)
    this.roomsRef = await this.database().ref('chat/rooms')
    this.roomsRef.orderByKey().equalTo(roomID).once('value', (snap) => {
      if (snap.exists()){
        return
      }else{
        // else push the data in
        this.roomsRef.child(roomID).child(receiverID).set(true)
        this.roomsRef.child(roomID).child(senderID).set(true)
        this.roomsRef.child(roomID).child('createdAt').set(new Date().toUTCString())
      }
    })
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

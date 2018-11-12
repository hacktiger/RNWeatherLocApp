import FirebaseDataService, {getUser, getMessages, getEalierMessages} from '../services/models/FirebaseDataService'

class Firebase {
  messagesRef = null // firebase database ref('chat/messages/' + roomID)
  roomsRef = null // chat room ref('chat/rooms')
  roomMessagesRef = null // // firebase database ref('chat/messages')
  userRef = null // firebase database ref('users')
  // contructor
  constructor() {
    this.FirebaseSingleton = FirebaseDataService.getInstance()
    this.roomMessagesRef = this.database().ref('chat/messages')
    this.userRef = this.database().ref('users')
  }

  auth() {
    return this.FirebaseSingleton.auth()
  }
  getUid () {
    let check = this.FirebaseSingleton.auth().currentUser
    // console.log(check)
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
  // send message
  sendMessage (friendID, myID, message) {
    let roomID = this.getRoomID(friendID, myID)
    for(let i = 0; i < message.length; i++) {
      this.roomMessagesRef.child(roomID).push({
        text: message[i].text,
        user: message[i].user,
        createdAt: new Date().toUTCString()
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
  getMessagesList (roomID) {
    return getMessages(roomID)
  }
  getEalierMessagesList (roomID, endAtMessKey) {
    return getEalierMessages(roomID, endAtMessKey)
  }
// END CLASS
}

export default Firebase

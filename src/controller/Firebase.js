import FirebaseDataService, {
  getUser, 
  getMessages, 
  getEalierMessages, 
  getMoreUser
} from '../services/models/FirebaseDataService'

class Firebase {
  mess = []
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

  getCurrUser () {
    return this.FirebaseSingleton.auth().currentUser
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
      // console.log(message[i].user)
      this.roomMessagesRef.child(roomID).push({
        text: message[i].text,
        user: {
          _id: message[i].user._id,
          avatar: 'https://placeimg.com/140/140/any'
        },
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
  getMoreUserList (endAtUserKey) {
    return getMoreUser(endAtUserKey)
  }
  getMessagesList (roomID) {
    return getMessages(roomID)
  }
  getEalierMessagesList (roomID, endAtMessKey) {
    return getEalierMessages(roomID, endAtMessKey)
  }
// END CLASS


///////// 
// TEST
////////

  // retrieve the messages from the Backend
  loadMessages2(callback) {
    this.messagesRef = this.FirebaseSingleton.database().ref('messages');
    this.messagesRef.off();
    const onReceive = (data) => {
      const message = data.val();
      //console.log('before', this.mess)
      //console.log('message', message)
      this.mess.push(message)
      //console.log('after', this.mess)
      //console.log(data.val())
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }
  // send the message to the Backend
  sendMessage2(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: new Date().toUTCString(),
      });
    }
  }
  printMess() {
    return this.mess
  }
}
export default Firebase

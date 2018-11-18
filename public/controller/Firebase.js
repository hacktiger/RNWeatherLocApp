import FirebaseDataService, {
  getUser,
  getMoreUser
} from "../services/data/FirebaseDataService";

class Firebase {
  messagesRef = null; // firebase database ref('chat/messages/' + roomID)
  roomsRef = null; // chat room ref('chat/rooms')
  roomMessagesRef = null; // // firebase database ref('chat/messages')
  userRef = null; // firebase database ref('users')
  // contructor
  constructor() {
    this.FirebaseSingleton = FirebaseDataService.getInstance();
    this.roomMessagesRef = this.database().ref("chat/messages");
    this.userRef = this.database().ref("users");
  }

  auth() {
    return this.FirebaseSingleton.auth();
  }

  getCurrUser() {
    return this.FirebaseSingleton.auth().currentUser;
  }

  getUid() {
    let check = this.FirebaseSingleton.auth().currentUser;
    // console.log(check)
    if (check) {
      return check.uid;
    } else {
      return null;
    }
  }
  // Authentication stuff
  logInUser(email, password) {
    return this.FirebaseSingleton.auth().signInWithEmailAndPassword(
      email,
      password
    );
  }

  signUpUser(email, password) {
    return this.FirebaseSingleton.auth().createUserWithEmailAndPassword(
      email,
      password
    );
  }

  signOutUser() {
    return this.FirebaseSingleton.auth().signOut();
  }
  // DB stuff
  saveUserToDB(id, email) {
    // maybe to let or const later
    let data = {
      id: id,
      email: email
    };
    this.userRef.child(id).set(data);
  }
  // Chat App stuff
  // init database
  database() {
    return this.FirebaseSingleton.database();
  }

  // get room id
  getRoomID(friendID, myID) {
    let bigger = "";
    let smaller = "";
    if (friendID > myID) {
      bigger = friendID;
      smaller = myID;
    } else {
      bigger = myID;
      smaller = friendID;
    }
    return (roomID = bigger + smaller);
  }
  // create chat room
  async createRoom(receiverID, senderID) {
    let roomID = await this.getRoomID(receiverID, senderID);
    this.roomsRef = await this.database().ref("chat/rooms");
    this.roomsRef
      .orderByKey()
      .equalTo(roomID)
      .once("value", snap => {
        if (snap.exists()) {
          return;
        } else {
          // else push the data in
          this.roomsRef
            .child(roomID)
            .child(receiverID)
            .set(true);
          this.roomsRef
            .child(roomID)
            .child(senderID)
            .set(true);
          this.roomsRef
            .child(roomID)
            .child("createdAt")
            .set(new Date().toUTCString());
        }
      });
  }

  // send message
  sendMessage(roomID, message) {
    for (let i = 0; i < message.length; i++) {
      // console.log(message[i].user)
      this.roomMessagesRef.child(roomID).push({
        text: message[i].text,
        user: {
          _id: message[i].user._id,
          avatar: "https://placeimg.com/140/140/any"
        },
        createdAt: new Date().toUTCString()
      });
    }
  }

  // retrieve the messages from the Backend
  loadMessages(roomID, callback) {
    this.messagesRef = this.FirebaseSingleton.database().ref(
      "chat/messages/" + roomID
    );
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messagesRef
      .orderByKey()
      .limitToLast(20)
      .on("child_added", onReceive);
  }
  // send the message to the Backend
  getLoadEarlierMessage(roomID, lastMessKey, callback) {
    this.messagesRef = this.FirebaseSingleton.database().ref(
      "chat/messages/" + roomID
    );
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name
        }
      });
    };
    this.messagesRef
      .orderByKey()
      .limitToLast(20)
      .endAt(lastMessKey)
      .on("child_added", onReceive);
  }

  // close chat connection
  closeChatConn() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
  // REST
  getUserList() {
    return getUser();
  }
  getMoreUserList(endAtUserKey) {
    return getMoreUser(endAtUserKey);
  }
  // END CLASS
}
export default Firebase;

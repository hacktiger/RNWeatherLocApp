import FirebaseDataService from "../services/data/FirebaseDataService";

class ChatFirebase {
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
  //
  getCurrUser() {
    return this.FirebaseSingleton.auth().currentUser;
  }
  //
  getUid() {
    let check = this.FirebaseSingleton.auth().currentUser;
    // console.log(check)
    if (check) {
      return check.uid;
    } else {
      return null;
    }
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

////////////////////////////////////
//// TESTING
////////////////////////////////////
/*   loadEalier (roomID, lastMess) {
    this.messagesRef = this.FirebaseSingleton.database().ref(
      "chat/messages/" + roomID
    )
    this.messagesRef
      .orderByKey()
      .limitToLast(20)
      .endAt(lastMess)
      .on('value', (snap) => {
        this.handleLoadEarlierResponse(snap)
      })
  }
  // handle load more response
  handleLoadEarlierResponse (snap) {
    // console.log('SNAPPED', snap.val())
    // get snapshot val()
    let messages = snap.val()
    let tempArr = []
    // push data objects => array for handling
    Object.keys(messages).forEach((key) => {
      let _id = key
      tempArr.push({ _id, ...messages[key] })
    })
    tempArr.reverse()
    // set state result
    // console.log(tempArr[tempArr.length - 1].text)
  } */
    // END CLASS
}


//
export default ChatFirebase;

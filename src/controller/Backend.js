import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDh6IrfHjQuQyUXAAhtPQcSFUx1NIyWxUU',
      authDomain: 'weather-location-app-217808.firebaseapp.com',
      databaseURL: 'https://weather-location-app-217808.firebaseio.com',
      projectId: 'weather-location-app-217808',
      storageBucket: 'weather-location-app-217808.appspot.com',
      messagingSenderId: '302794681971'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase.auth().signInAnonymously().catch((error) => {
          alert(error.message);
        });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
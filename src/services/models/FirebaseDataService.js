import { FIREBASE_CONFIGS } from '../../configs/environment/index'
import firebase from 'firebase'
//
import { FirebaseUserGateway } from '../../configs/myGateway'
const PATH_USER = '/users'
const PATH_MESSAGES = '/chat/messages'
const MESSAGE_QUERY = 'orderBy="$key"&limitToLast=21&print=pretty'
const FIREBASE_JSON = '.json'

const Singleton = (function () {
  var _instance

  function createInstance () {
    var object = firebase.initializeApp(FIREBASE_CONFIGS)
    return object
  }

  return {
    getInstance: function () {
      if (!_instance) {
        _instance = createInstance()
      }
      return _instance
    }
  }
})()

export const getUser = () => {
  return FirebaseUserGateway.get(`${PATH_USER}${FIREBASE_JSON}`)
}

export const getMessages = (roomID) => {
  return FirebaseUserGateway.get(`${PATH_MESSAGES}/${roomID}${FIREBASE_JSON}?${MESSAGE_QUERY}`)
}

export const getEalierMessages = (roomID, endAtMessKey) => {
  return FirebaseUserGateway.get(`${PATH_MESSAGES}/${roomID}${FIREBASE_JSON}?${MESSAGE_QUERY}&endAt="${endAtMessKey}"`)
}

export default Singleton

import { FIREBASE_CONFIGS } from '../../configs/environment/index'
import firebase from 'firebase'
//
import { FirebaseUserGateway } from '../../configs/myGateway'
const PATH_USER = '/users'
const USER_QUERY = 'orderBy="$key"&limitToFirst=8&print=pretty'
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
  return FirebaseUserGateway.get(`${PATH_USER}${FIREBASE_JSON}?${USER_QUERY}`)
}

export const getMoreUser = (endAtUserKey) => {
  return FirebaseUserGateway.get(`${PATH_USER}${FIREBASE_JSON}?${USER_QUERY}&startAt="${endAtUserKey}"`)
}
export default Singleton

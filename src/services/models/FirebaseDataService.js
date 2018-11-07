import { FIREBASE_CONFIGS } from '../../configs/environment/index'
import firebase from 'firebase'

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

export default Singleton

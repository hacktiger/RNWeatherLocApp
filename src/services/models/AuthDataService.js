import { FIREBASE_CONFIGS } from '../../configs/environment/index'
import firebase from 'firebase'

const Firebase = firebase.initializeApp(FIREBASE_CONFIGS)

export default Firebase


// constants
import { FIREBASE_API_KEY } from '../../constants/keys'
const DEFAULT_TIMEOUT = 3000
const HEADERS = {
  'Content-Type': 'application/json'
}
const ENVIRONMENT = {
  // type : 'weather'
  weather: {
    // envs {'QA', 'STG', 'PRD'}
    QA: {
      endPoint: 'http://dataservice.accuweather.com',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    },
    STG: {
      endPoint: 'http://dataservice.accuweather.com',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    },
    PRD: {
      endPoint: 'http://dataservice.accuweather.com',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    }
  },
  // type : 'google'
  google: {
    QA: {
      endPoint: 'https://example.com',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    },
    STG: {
      endPoint: 'https://exampleSTG.com',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    },
    PRD: {
      endPoint: 'https://examplePRD.com',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    }
  },
  // type : 'user'
  user: {
    QA: {
      endPoint: 'https://reqres.in',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    }
  },
  // type : 'firebase'
  firebase: {
    QA: {
      endPoint: 'https://weather-location-app-217808.firebaseio.com',
      timeout: DEFAULT_TIMEOUT,
      headers: HEADERS
    }
  }
}

export const FIREBASE_CONFIGS = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'weather-location-app-217808.firebaseapp.com',
  databaseURL: 'https://weather-location-app-217808.firebaseio.com',
  projectId: 'weather-location-app-217808',
  storageBucket: 'weather-location-app-217808.appspot.com',
  messagingSenderId: '302794681971'
}

// export environment
export default ENVIRONMENT

// constants
export const WEATHER_API_KEY = 'UgEihPiQMVVUIdsz05M8MHxCxpi5jG2I'
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
  }
}

// export environment
export default ENVIRONMENT

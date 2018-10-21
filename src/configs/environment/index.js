// 
const TIME_OUT_STANDARD = 3000 ;
const HEADERS = {
  'Content-Type': 'application/json'
}
const ENVIRONMENT = {
  // type : 'weather'
  weather: {
    // envs {'QA', 'STG', 'PRD'}
    QA: {
      endPoint: 'https://example.com',
      timeout: TIME_OUT_STANDARD,
      headers: HEADERS
    },
    STG: {
      endPoint: 'https://exampleSTG.com',
      timeout: TIME_OUT_STANDARD,
      headers: HEADERS
    },
    PRD: {
      endPoint: 'https://examplePRD.com',
      timeout: TIME_OUT_STANDARD,
      headers: HEADERS
    }
  },
  // type : 'google'
  google: {
    QA: {
      endPoint: 'https://example.com',
      timeout: TIME_OUT_STANDARD,
      headers: HEADERS
    },
    STG: {
      endPoint: 'https://exampleSTG.com',
      timeout: TIME_OUT_STANDARD,
      headers: HEADERS
    },
    PRD: {
      endPoint: 'https://examplePRD.com',
      timeout: TIME_OUT_STANDARD,
      headers: HEADERS
    }
  }
}

// export environment
export default ENVIRONMENT

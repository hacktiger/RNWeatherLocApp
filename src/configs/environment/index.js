const environment = {
  // type : weather
  weather: {
    QA: {
      endPoint: 'https://example.com',
      timeout: 2000,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    STG: {
      endPoint: 'https://exampleSTG.com',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json'
      }
    },
    PRD: {

    }
  },
  // type : google
  google: {

  }
}
export default environment

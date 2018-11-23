import WeatherForecast from '../../../controller/WeatherForecast'

export default class ForecastViewModel {
  weatherData = new WeatherForecast()

  get5DaysForecastList (lat, long) {
    this.weatherData.get5DaysForecast(lat, long)
      .then((res) => this._handleResponse(res))
      .catch((err) => this._handleError(err))
  }

  _handleResponse (res) {
    if ( res.status === 200){
      var forecastList = []
      forecastList = res.data.DailyForecast
      if (!forecastList || forecastList.length === 0) {
        this._handleReturn (res.status, 'Forecast list is empty')
      } else {
        if (forecastList instanceof Array){
          return forecastList
        } else {
          this._handleReturn (res.status, 'Data is not an Array')
        }
      }
    } else {
      this._handleReturn (res.status, res.problem)
    }
  }

  _handleReturn (status, error) {
    return {
      status: status,
      error: error
    }
  }

  _handleError (err) {
    // console.log(err)
    return null
  }

}

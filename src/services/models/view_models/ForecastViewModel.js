import WeatherForecast from '../../../controller/WeatherForecast'

export default class ForecastViewModel {
  weatherData = new WeatherForecast()
  forecastData = null

  get5DaysForecastList (lat, long) {
    this.weatherData.get5DaysForecast(lat, long)
      .then(async (res) => await this._handleResponse(res))
      .catch((err) => this._handleReturn(null, err))
  }

  _handleResponse (res) {
    if ( res.status === 200){
      var forecastList = res.data.DailyForecasts
      // Check data
      if (forecastList == null || forecastList.length === 0) {
        this._setData (null, res.data.Code, res.data.Message)
      } else {
        if (forecastList instanceof Array){
          return this._setData(forecastList, res.status, null)
        } else {
          this._setData (null, res.status, 'Data is not an Array')
        }
      }
    } else {
      this._setData (null, res.status, res.problem)
    }
  }

  _setData (data, status, error) {
    this.weatherData = {
      data: data,
      code: status,
      error: error
    }
  }

  getData () {
    console.log(this.weatherData)
    return this.weatherData
  }
}

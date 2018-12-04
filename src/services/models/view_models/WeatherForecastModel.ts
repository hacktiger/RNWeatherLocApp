//
import WeatherForecast from '../../../controller/WeatherForecast'
//
const weatherData = new WeatherForecast()
// interfaces
interface ErrorData {
  code: boolean;
  status: number;
  message: string;
}
/** 
* interface fore dailyforecasts data
*/
interface DailyForecastModel {
  index: number;
  date: Date;
  min_temp: number;
  max_temp: number;
  unit: string;
  day_icon: number;
  day_icon_phrase: string;
  night_icon: number;
  night_icon_phrase: string;
}
// main model class
class WeatherForecastModel {
  // get forecast and apply it to Interface
  getForecastModel (lat: number, long: number) {
    return weatherData.get5DaysForecast(lat, long)
      .then((res: any) => {
        return this._handleResponse(res)
      })
      .catch((err: any) => {
        console.log('weatherForecastModel.ts', err)
      })
  }

  _handleResponse = (res: any) => {
    // set data
    let data = res.data.DailyForecasts 
    // check if res status === 200 (ok)
    if (res.status === 200) {
      let forecastArray: Array<object> = []
      for (let i = 0; i < 5; i++){
        // console.log('loop', data)
        let forecastData: DailyForecastModel = {
          index: i,
          date: data[i].Date ,
          min_temp: data[i].Temperature.Maximum.Value,
          max_temp: data[i].Temperature.Minimum.Value,
          unit:  data[i].Temperature.Maximum.Unit,
          day_icon_phrase: data[i].Day.IconPhrase,
          day_icon: data[i].Day.Icon,
          night_icon: data[i].Night.Icon,
          night_icon_phrase: data[i].Night.IconPhrase
        }
        forecastArray.push(forecastData)
      }
      return forecastArray
    } else {
      // if status !== 200
      let errorObj: ErrorData = {
        code: res.data.Code,
        status: res.status,
        message: res.data.Message
      }
      // return the object with code, status and message          
      return errorObj
    }
}
}



export default  WeatherForecastModel

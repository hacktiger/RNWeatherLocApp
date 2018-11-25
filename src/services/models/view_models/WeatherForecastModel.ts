
import WeatherForecast from '../../../controller/WeatherForecast'

const weatherData = new WeatherForecast()

interface ErrorData {
  code: string;
  status: number;
  message: string;
}

interface DailyForecastModel {
  index: number;
  date: Date;
  min_temp: number;
  max_temp: boolean;
  unit: string;
  day_icon: number;
  day_icon_phrase: string;
  night_icon: number;
  night_icon_phrase: string;
}

class Model {
  index: number;
  date: Date;
  min_temp: number;
  max_temp: boolean;
  unit: string;
  day_icon: number;
  day_icon_phrase: string;
  night_icon: number;
  night_icon_phrase: string;

  constructor (
    index: number,
    date: Date,
    min_temp: number,
    max_temp: boolean,
    unit: string,
    day_icon: number,
    day_icon_phrase: string,
    night_icon: number,
    night_icon_phrase: string) {
      this.index = index;
      this.date = date;
      this.min_temp = min_temp;
      this.max_temp = max_temp;
      this.unit = unit;
      this.day_icon = day_icon;
      this.day_icon_phrase = day_icon_phrase;
      this.night_icon = night_icon;
      this.night_icon_phrase = night_icon_phrase;
  }
}

class WeatherForecastModel {
  // get forecast and apply it to Interface
  getForecastModel (lat: number, long: number) {
    
    return weatherData.get5DaysForecast(lat, long)
      .then((res: any) => {
        // set data
        let data = res.data.DailyForecasts 
        // check if data
        if (res.status === 200) {
          let forecastArray: Array<object> = []
          for (let i = 0; i<5; i++){
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
            let mod = new Model( i,
              data[i].Date ,
              data[i].Temperature.Maximum.Value,
              data[i].Temperature.Minimum.Value,
              data[i].Temperature.Maximum.Unit,
              data[i].Day.IconPhrase,
              data[i].Day.Icon,
              data[i].Night.Icon,
              data[i].Night.IconPhrase)
            console.log(typeof mod.max_temp)
            console.log(mod instanceof Model)
            forecastArray.push(forecastData)
          }
          return forecastArray
        } else {
          let errorObj: ErrorData = {
            code: res.data.Code,
            status: res.status,
            message: res.data.Message
          }
      
          return errorObj
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}

export default  WeatherForecastModel

import ForecastModel from '../model/ForecastModel';
import WeatherForecast from '../controller/WeatherForecast';

const mForecastModel = new ForecastModel();
const mWeatherForecast = new WeatherForecast();

let ForecastList: ForecastModel[] = [];

class ForecastViewModel {
  get5DaysForecast = (lat: number, long: number) => {
    // mForecastModel.newInstance
    return mWeatherForecast.get5DaysForecast(lat, long)
      .then((res: any) => {
        return ForecastList
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
      let temp: ForecastModel[] = [];
      for (let i = 0; i < 5; i++){
        // console.log('loop', data)
        let forecastData: any = mForecastModel.newInstance(i, data[i].Date, data[i].Temperature.Maximum.Value,
          data[i].Temperature.Minimum.Value, data[i].Temperature.Maximum.Unit,
          data[i].Day.Icon, data[i].Day.IconPhrase, data[i].Night.Icon, data[i].Night.IconPhrase);
        
          temp.push(forecastData)
      }
      ForecastList = temp;
    } else {
      // if status !== 200
      let errorObj: any = {
        code: res.data.Code,
        status: res.status,
        message: res.data.Message
      }
      // return the object with code, status and message          
      return errorObj
    }
  }
}

export default ForecastViewModel;
interface ForeCastModelInterface {
  index?: number;
  date?: Date;
  min_temp?: number;
  max_temp?: number;
  unit?: string;
  day_icon?: number;
  day_icon_phrase?: string;
  night_icon?: number;
  night_icon_phrase?: string;
}

let mForecastModel: ForeCastModelInterface = {

}

class ForecastModel {
  newInstance = (index: number, date: Date, min_temp: number, max_temp: number,
                unit: string, day_icon: number, day_icon_phrase: string,
                night_icon: number, night_icon_phrase: string) => {
    return mForecastModel = {
      index: index,
      date: date,
      min_temp: min_temp,
      max_temp : max_temp,
      unit: unit,
      day_icon: day_icon,
      day_icon_phrase: day_icon_phrase,
      night_icon: night_icon,
      night_icon_phrase: night_icon_phrase
    }
  }

  getIndex = () => {
    return mForecastModel.index;
  }

  getDate = () => {
    return mForecastModel.date;
  }

  getMinTemp = () => {
    return mForecastModel.min_temp;
  }

  getMaxTemp = () => {
    return mForecastModel.max_temp;
  }

  getDayIcon = () => {
    return mForecastModel.day_icon;
  }

  getDayIconPhrase = () => {
    return mForecastModel.day_icon_phrase;
  }

  getNightIcon = () => {
    return mForecastModel.night_icon;
  }

  getNightIconPhrase = () => {
    return mForecastModel.night_icon_phrase;
  }
}

export default ForecastModel;
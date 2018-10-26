import React from 'react'
import { 
  View,
  Text
} from 'react-native'

const ForecastDetail = props => {
  return (
    <View>
      {console.log(JSON.stringify(props.ForecastList))}
      {/* Date */}
      <Text> {props.ForecastList.Date} </Text>
      {/* icon ? */}
      <View>
        <Text>Day</Text>
        <Text>{props.ForecastList.Day.IconPhrase}</Text>
      </View>
      {/* min/max temp */}
      <View>
        <Text>Minimum Temp</Text>
        <Text>{props.ForecastList.Temperature.Minimum.Value}</Text>
        <Text>Maximum Temp</Text>
        <Text>{props.ForecastList.Temperature.Maximum.Value}</Text>
      </View>
    </View>
  )
}

export default ForecastDetail

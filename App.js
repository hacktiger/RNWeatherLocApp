import React from 'react'
import {
  StyleSheet,
  Dimensions,
  Text } from 'react-native'
// My Comps
import Header from './src/view/common/Header'
// Screens
import WeatherForecastViewer from './src/view/Screens/WeatherForecast/WeatherForecastViewer'
import MapViewer from './src/view/Screens/Map/MapViewer'
import UserViewer from './src/view/Screens/User/UserViewer'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
// Classes
// 
class UserViewScreen extends React.Component {
  static navigationOptions = {
    title: 'UserList'
  }
  render () {
    return (
      <UserViewer/>
    )
  }
}
// 
class MapViewScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather Forecast',
  }
  render () {
    return (
      <MapViewer />
    )
  }
}
// 
class WeatherForecastViewScreen extends React.Component {
  render () {
    return (
      <WeatherForecastViewer />
    )
  }
}
// 
class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }
  render () {
    return (
      <Text>Settings Screen</Text>
    )
  }
}

export default createMaterialBottomTabNavigator(
  {
    // RouteConfig
    Home: { screen: UserViewScreen, 
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-home' color={tintColor} size={24} />
        ),
        tabBarColor : 'purple'
      }
    },
    Forecast: { screen: MapViewScreen,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-map' color={tintColor} size={24} />
        ),
        tabBarColor: '#f4511e'
      }  
    },
    Settings: { screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-settings' color={tintColor} size={24} />
        ),
        tabBarColor: 'green'
      } 
    }
  },
  {
    // TabConfig
    initialRouteName: 'Home',
    shifting: true,
    activeColor: 'white',
    inactiveColor: 'grey',
    barStyle :{  }
  }
)

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    width: Dimensions.get('window').width,
    flexGrow: 0.9
  },
  footerContainer: {  
    width: Dimensions.get('window').width,
    flexGrow: 0.1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

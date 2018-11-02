import React from 'react'
import {
  Button,
  View,
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
import { createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
// Classes
//
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to UserView"
          // onPress change navigate('x') x: @ref RootStack
          onPress={() => this.props.navigation.navigate('UserView')}
        />
      </View>
    )
  }
}
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
// 
const HeaderOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
}
// 
const HomeStack = createStackNavigator(
  {
  User: { screen: UserViewScreen } 
  },
  {
    navigationOptions: HeaderOptions
  }
)
// 
const WeatherStack = createStackNavigator(
  {
    Map: { screen: MapViewScreen }
  },
  {
    // after merging Map and Forecast => initial => delete
    initialRouteName: 'Map',
    navigationOptions: HeaderOptions
  }
)
// 
const SettingsStack = createStackNavigator(
  {
  Settings: { screen: SettingsScreen }
  },
  {
    navigationOptions: HeaderOptions
  }
)

export default createMaterialBottomTabNavigator(
  {
    Home: { screen: HomeStack, 
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-home' color={tintColor} size={24} />
        )
      }
    },
    Forecast: { screen: WeatherStack,
      navigationOptions: {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-map' color={tintColor} size={24} />
        )
      }  
    },
    Settings: { screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'Settings',
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-settings' color={tintColor} size={24} />
        )
      } 
    }
    // Login: { screen: LoginStack },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#ffffff',
    inactiveColor: '#b2b2b2',
    barStyle: { 
      backgroundColor: '#f4511e',
    }, 
    
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
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

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
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
// import { Ionicons } from '@expo/vector-icons'

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
      <UserViewer />
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
  Home: { screen: HomeScreen },
  User: { screen: UserViewScreen } // only a test screen
  },
  {
    initialRouteName: 'User',
    /* The header config from HomeScreen is now here */
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

export default createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Forecast: { screen: WeatherStack },
    Settings: { screen: SettingsStack }
    // Login: { screen: LoginStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        // let iconName
        // icon with each tab
        if (routeName === 'Home') {
          // iconName = `ios-information-circle${focused ? '' : '-outline'}`
        } else if (routeName === 'Settings') {
          // iconName = `ios-options${focused ? '' : '-outline'}`
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        // return <Ionicons name={iconName} size={25} color={tintColor} />
        return <Text>WOW</Text>
      }
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
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

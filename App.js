import React from 'react'
import {
  Button,
  View,
  StyleSheet,
  Dimensions,
  Text } from 'react-native'
import { createStackNavigator } from 'react-navigation' // Version can be specified in package.json
// My Comps
import Header from './src/view/common/Header'
// Screens
import WeatherForecastViewer from './src/view/Screens/WeatherForecast/WeatherForecastViewer'
import MapViewer from './src/view/Screens/Map/MapViewer'
import UserViewer from './src/view/Screens/User/UserViewer'

// Classes
class HomeScreen extends React.Component {
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

class UserViewScreen extends React.Component {
  render () {
    return (
      <View style = {styles.container}>
        {/* Header */}
{/*         <View style = {styles.headerContainer}>
          <Header headerText = "UserPAGE" />
        </View> */}
        {/* main body */}
        <View style = {styles.body} >
          {/* <MapViewer /> */}
          {/* <WeatherForecastViewer /> */}
          <UserViewer />
        </View>
        {/* Footer */}
        <View style = {styles.footerContainer } >
          <Button
            title="Go to MapView"
            // onPress change navigate('x') x: @ref RootStack
            onPress={() => this.props.navigation.navigate('MapView')}
          />
        </View>
      </View>
    )
  }
}

class MapViewScreen extends React.Component {
  render () {
    return (
      <MapViewer />
    )
  }
}

class WeatherForecastViewScreen extends React.Component {
  render () {
    return (
      <WeatherForecastViewer />
    )
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    UserView: UserViewScreen,
    MapView: MapViewScreen,
    WeatherForecastView: WeatherForecastViewScreen
  },
  {
    initialRouteName: 'Home'
  }
)

// export class
export default class App extends React.Component {
  render () {
    return <RootStack />
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    width: Dimensions.get('window').width,
    flexGrow: 0.13
  },
  body: {
    width: Dimensions.get('window').width,
    flexGrow: 0.82
  },
  footerContainer: {  
    width: Dimensions.get('window').width,
    flexGrow: 0.05,
    backgroundColor: '#3b5998',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

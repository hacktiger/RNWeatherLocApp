import React from 'react'
import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
  Button
} from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
// Screens
import MapViewer from './src/view/Screens/Map/MapViewer'
import UserViewer from './src/view/Screens/User/UserViewer'
import LoginViewer from './src/view/Screens/Auth/LoginViewer'
import SignUpViewer from './src/view/Screens/Auth/SignUpViewer'
import SettingsViewer from './src/view/Screens/Settings/SettingsViewer'
// Classes
// 
class UserViewScreen extends React.Component {
  render () {
    return (
      <UserViewer/>
    )
  }
}
// 
class MapViewScreen extends React.Component {
  render () {
    return (
      <MapViewer />
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
      <SettingsViewer />
    )
  }
}

class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this._navigate()
  }

  _navigate = () => {
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login Screen',
  }
  render () {
    return (
      <LoginViewer />
    )
  }
}

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign up Screen'
  }
  render () {
    return (
      <SignUpViewer />
    )
  }
}

const AuthStack = createStackNavigator(
  { 
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: 'Login'
  }
)
const AppStack = createMaterialBottomTabNavigator(
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

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },{
    initialRouteName: 'AuthLoading'
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

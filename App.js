import React from 'react'
import {
  StyleSheet,
  Dimensions,
  View,
  Text
} from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import Spinner from './src/presentation/common/Spinner'
import Firebase from './src/controller/Firebase'
// Screens
import MapViewer from './src/presentation/Screens/Map/MapViewer'

import UserViewer from './src/presentation/Screens/User/UserViewer'
import ChatViewer from './src/presentation/Screens/User/ChatViewer'

import LoginViewer from './src/presentation/Screens/Auth/LoginViewer'
import SignUpViewer from './src/presentation/Screens/Auth/SignUpViewer'

import SettingsViewer from './src/presentation/Screens/Settings/SettingsViewer'

// Classes
console.ignoredYellowBox = ['Setting a timer', 'Warning'] // rid of yellow boxes for easy handling when testing
class UserViewScreen extends React.Component {
  static navigationOptions = {
    title: 'User List',
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: '#990099'
    }
  }
  render () {
    return (
      <UserViewer/>
    )
  }
}
//
class ChatScreen extends React.Component {
  render () {
    return (
      <ChatViewer />
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
  render () {
    return (
      <SettingsViewer />
    )
  }
}

class AuthLoadingScreen extends React.Component {
  constructor (props) {
    super(props)
    this.myFirebase = new Firebase()
  }

  componentDidMount () {
    this.myFirebase.auth().onAuthStateChanged((user) => {
      if(user){
        // console.log('ok')
        this.props.navigation.navigate('App')
      }else{
        // console.log('nah')
        this.props.navigation.navigate('Login')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner size='large' />
        <Text>Checking authentication ... </Text>
      </View>
    )
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login Screen',
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: 'green'
    }
  }
  render () {
    return (
      <LoginViewer />
    )
  }
}

class SignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'Sign up Screen',
    headerTintColor: 'white',
    headerStyle:{
      backgroundColor: 'purple'
    }
  }
  render () {
    return (
      <SignUpViewer />
    )
  }
}


const ChatStack = createStackNavigator(
  {
    UserList: UserViewScreen,
    Chat: ChatScreen
  },{
    initialRouteName: 'UserList',
    headerMode: 'screen'
  }
)

const AuthStack = createStackNavigator(
  { 
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  {
    initialRouteName: 'Login',
    headerMode: 'screen'
  }
)
const AppStack = createMaterialBottomTabNavigator(
  {
    // RouteConfig
    Home: { screen: ChatStack, 
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
        title: 'Settings Screen',
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
// switch navigator for auth flow
export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },{
    initialRouteName: 'AuthLoading' // initial screen of EVERYTHING
  }
)

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

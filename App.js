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
import SignInViewer from './src/view/Screens/Auth/SignInViewer'
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
      <Text>Settings Screen</Text>
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

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  }
  render () {
    return (
      <SignInViewer />
    )
  }
}

const AuthStack = createStackNavigator({ SignIn: SignInScreen })
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

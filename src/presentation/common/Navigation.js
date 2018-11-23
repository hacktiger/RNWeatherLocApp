import { Navigation } from 'react-native-navigation'
//
import MapViewer from '../Screens/Map/MapViewer'
//
import UserViewer from '../Screens/User/UserViewer'
import ChatViewer from '../Screens/User/ChatViewer'
//
import LoginViewer from '../Screens/Auth/LoginViewer'
import SignUpViewer from '../Screens/Auth/SignUpViewer'
//
import SettingsViewer from '../Screens/Settings/SettingsViewer'
//
Navigation.registerComponent(`MapScreen`, () => MapViewer)
Navigation.registerComponent(`UserScreen`, () => UserViewer)
Navigation.registerComponent(`ChatScreen`, () => ChatViewer)
//
Navigation.registerComponent(`LogInScreen`, () => LoginViewer)
Navigation.registerComponent(`SignUpScreen`, () => SignUpViewer)
//
Navigation.registerComponent(`SettingsScreen`, () => SettingsViewer)

const bottomBarSettings = (color) => {
  return {
    visible: true,
    animate: true,
    drawBehind: false,
    backgroundColor: color
  } // #e69500
}

const topBarSettings = (title = '', subtitle = '', backgroundColor = '', hideOnScroll = false, drawBehind = false) => {
  return {
    title: {
      text: title,
      fontSize: 20,
      color: 'white',
      fontFamily: 'Helvetica'
    },
    hideOnScroll: hideOnScroll,
    drawBehind: drawBehind,
    visible: true,
    animate: false,
    subtitle: {
      text: subtitle,
      fontSize: 11,
      fontFamily: 'Helvetica',
      color: '#b3b3b3'
    },
    background: {
      color: backgroundColor
    }
  }
}

export const goToApp = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [{
              component: {
                name: 'UserScreen',
                passProps: {
                  text: 'This is the user screen tab'
                }
              }
            }],
            options: {
              bottomTabs: bottomBarSettings('#800080'),
              topBar: topBarSettings('Chat Screen', 'Chat with your friends here', '#800080', true, true),
              bottomTab: {
                text: 'Chat',
                icon: require('../../../public/assets/images/test.png'),
                testID: 'FIRST_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          stack: {
            children: [{
              component: {
                name: 'MapScreen',
                passProps: {
                  text: 'This is map tab'
                }
              }
            }],
            options: {
              bottomTabs: bottomBarSettings('#e69500'),
              topBar: topBarSettings('Weather Forecast', 'Weather forecasts in your current position', '#e69500', false, true),
              bottomTab: {
                text: 'Forecast',
                icon: require('../../../public/assets/images/test.png'),
                testID: 'SECOND_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          // Settings Screen
          stack: {
            children: [{
              component: {
                name: 'SettingsScreen',
                passProps: {
                  text: 'This is the settings tab'
                }
              }
            }],
            // options for Settings Screen
            options: {
              bottomTabs: bottomBarSettings('#008000'),
              topBar: topBarSettings('Settings', 'Customize app settings to your liking', '#008000', false, true),
              bottomTab: {
                text: 'Settings',
                icon: require('../../../public/assets/images/test.png'),
                testID: 'THIRD_TAB_BAR_BUTTON'
              }
            }
          }
        }
      ]
    }
  }
})

export const goToSignUp = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'SignUpStack',
      children: [{
        component: {
          name: 'SignUpScreen'
        }
      }],
      options: {
        topBar: topBarSettings('Sign Up', 'Create an account here', 'purple', false, false)
      }
    }
  }
})
export const goToLogIn = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'AuthStack',
      children: [{
        component: {
          name: 'LogInScreen'
        }
      }],
      options: {
        topBar: topBarSettings('Log In', 'Log in to explore features', 'green', false, false)
      }
    }
  }
})

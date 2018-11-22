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
              bottomTab: {
                text: 'Chat',
                icon: require('../../../public/assets/images/test.png'),
                testID: 'FIRST_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          component: {
            name: 'MapScreen',
            passProps: {
              text: 'This is map tab'
            },
            options: {
              bottomTab: {
                text: 'Forecast',
                icon: require('../../../public/assets/images/test.png'),
                testID: 'SECOND_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          component: {
            name: 'SettingsScreen',
            passProps: {
              text: 'This is the settings tab'
            },
            options: {
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
      }]
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
      }]
    }
  }
})

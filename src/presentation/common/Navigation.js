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
              bottomTabs: {
                visible: true,
                animate: true,
                drawBehind: false,
                backgroundColor: '#800080'
              },
              topBar: {
                title: {
                  text: 'Chat Screen',
                  fontSize: 20,
                  color: 'white',
                  fontFamily: 'Helvetica'
                },
                hideOnScroll: true,
                drawBehind: true,
                visible: true,
                animate: false,
                subtitle: {
                  text: 'Chat with your friends about the weather',
                  fontSize: 11,
                  fontFamily: 'Helvetica',
                  color: '#b3b3b3'
                },
                background: {
                  color: '#800080'
                }
              },
              bottomTab: {
                // bottomtabs
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
              bottomTabs: {
                visible: true,
                animate: true,
                drawBehind: false,
                backgroundColor: '#e69500'
              },
              topBar: {
                title: {
                  text: 'Weather Forecast',
                  fontSize: 20,
                  color: 'white',
                  fontFamily: 'Helvetica'
                },
                hideOnScroll: true,
                drawBehind: true,
                visible: true,
                animate: false,
                subtitle: {
                  text: 'Weather forecasts in your current position',
                  fontSize: 11,
                  fontFamily: 'Helvetica',
                  color: '#b3b3b3'
                },
                background: {
                  color: '#e69500'
                }
              },
              bottomTab: {
                text: 'Forecast',
                icon: require('../../../public/assets/images/test.png'),
                testID: 'SECOND_TAB_BAR_BUTTON'
              }
            }
          }
        },
        {
          stack: {
            children: [{
              component: {
                name: 'SettingsScreen',
                passProps: {
                  text: 'This is the settings tab'
                }
              }
            }],
            options: {
              bottomTabs: {
                visible: true,
                animate: true,
                // currentTabIndex: 0,
                drawBehind: false,
                backgroundColor: '#008000'
              },
              topBar: {
                title: {
                  text: 'Settings',
                  fontSize: 20,
                  color: 'white',
                  fontFamily: 'Helvetica'
                },
                hideOnScroll: true,
                drawBehind: true,
                visible: true,
                animate: false,
                subtitle: {
                  text: 'Customize app settings to your liking',
                  fontSize: 11,
                  fontFamily: 'Helvetica',
                  color: '#b3b3b3'
                },
                background: {
                  color: '#008000'
                }
              },
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

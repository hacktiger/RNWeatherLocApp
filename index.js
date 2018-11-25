import { Navigation } from 'react-native-navigation'
// import React from 'react'
// Main App
import App from './App'
// other screens
import MapViewer from './src/presentation/Screens/Map/MapViewer'
//
import UserViewer from './src/presentation/Screens/User/UserViewer'
import ChatViewer from './src/presentation/Screens/User/ChatViewer'
//
import LoginViewer from './src/presentation/Screens/Auth/LoginViewer'
import SignUpViewer from './src/presentation/Screens/Auth/SignUpViewer'
//
import SettingsViewer from './src/presentation/Screens/Settings/SettingsViewer'

Navigation.registerComponent(`AppScreen`, () => App)
//
Navigation.registerComponent(`MapScreen`, () => MapViewer)
Navigation.registerComponent(`UserScreen`, () => UserViewer)
Navigation.registerComponent(`ChatScreen`, () => ChatViewer)
//
Navigation.registerComponent(`LoginScreen`, () => LoginViewer)
Navigation.registerComponent(`SignUpScreen`, () => SignUpViewer)
//
Navigation.registerComponent(`SettingsScreen`, () => SettingsViewer)

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    bottomTab: {
      iconColor: '#595959',
      selectedIconColor: '#ffffff',
      textColor: '#595959',
      selectedTextColor: '#ffffff',
      fontFamily: 'HelveticaNeue-Italic',
      fontSize: 13
    },
    _animations: {
      push: {
        waitForRender: false
      }
    },
    animations: {
      setRoot: {
        alpha: {
          from: 0,
          to: 1,
          duration: 300
        }
      },
      _push: {
        topBar: {
          id: 'TEST',
          alpha: {
            from: 0,
            to: 1,
            duration: 500,
            interpolation: 'accelerate'
          }
        },
        bottomTabs: {
          y: {
            from: 1000,
            to: 0,
            duration: 500,
            interpolation: 'decelerate',
          },
          alpha: {
            from: 0,
            to: 1,
            duration: 500,
            interpolation: 'decelerate'
          }
        },
        content: {
          y: {
            from: 1000,
            to: 0,
            duration: 500,
            interpolation: 'accelerate',
          },
          alpha: {
            from: 0,
            to: 1,
            duration: 500,
            interpolation: 'accelerate'
          }
        }
      },
      _pop: {
        topBar: {
          id: 'TEST',
          alpha: {
            from: 1,
            to: 0,
            duration: 500,
            interpolation: 'accelerate'
          }
        },
        bottomTabs: {
          y: {
            from: 0,
            to: 100,
            duration: 500,
            interpolation: 'accelerate'
          },
          alpha: {
            from: 1,
            to: 0,
            duration: 500,
            interpolation: 'accelerate'
          }
        },
        content: {
          y: {
            from: 0,
            to: 1000,
            duration: 500,
            interpolation: 'decelerate'
          },
          alpha: {
            from: 1,
            to: 0,
            duration: 500,
            interpolation: 'decelerate'
          }
        }
      }
    }
  })

  Navigation.setRoot({
    root: {
      stack: {
        id: 'AppStack',
        children: [{
          component: {
            name: 'AppScreen'
          }
        }],
        options: {
          topBar: {
            visible: false
          }
        }
      }
    }
  })
})

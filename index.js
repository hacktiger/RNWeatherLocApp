import { Navigation } from 'react-native-navigation'
// import all screens
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


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'AppStack',
        children: [{
          component: {
            name: 'AppScreen',
            options: {
              topBar: {
                title: {
                  text: 'Welcome'
                }
              }
            }
          }
        }]
      }
    }
  })
})
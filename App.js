/* eslint-disable no-unused-vars */
import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
//
import Spinner from './src/presentation/common/Spinner'
//
import { goToLogIn, goToApp } from './src/presentation/common/Navigation'
import Firebase from './src/controller/Firebase'
class AppScreen extends React.Component {
  constructor (props) {
    super(props)
    this.myFirebase = new Firebase()
  }

/*   _goToScreen (screenName) {
    Navigation.push(this.props.componentId, {
      component: {
        name: screenName
      }
    })
  } */

  componentDidMount () {
    this.myFirebase.auth().onAuthStateChanged((user) => {
      if (user) {
        goToApp()
      } else {
        goToLogIn()
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Spinner size='large' />
        <Text> Checking authentication ... </Text>
      </View>
    )
  }
}

export default AppScreen

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

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
  myFirebase: Firebase;
  constructor (props: any) {
    super(props)
    this.myFirebase = new Firebase()
  }
  componentDidMount () {
    this.myFirebase.auth().onAuthStateChanged((user: any) => {
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

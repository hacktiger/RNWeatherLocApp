/* eslint-disable no-unused-vars */
// react imports
import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import firebase from 'firebase'
import { withNavigation } from 'react-navigation'

// IMPORTS FOR TESTING PURPOSES
// main class
class SettingsViewer extends Component {
  constructor (props) {
    super(props)
    this._handleLogout = this._handleLogout.bind(this)
  }
  _handleLogout () {
    firebase.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('Login')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render () {
    return (
      <View>
        <Text onPress={this._handleLogout}> Logout </Text>
      </View>
    )
  }
}

export default withNavigation(SettingsViewer)

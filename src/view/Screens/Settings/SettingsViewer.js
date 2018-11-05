/* eslint-disable no-unused-vars */
// react imports
import React, { Component } from 'react'
import {
  View,
  Text
} from 'react-native'
import firebase from 'firebase'
import { withNavigation } from 'react-navigation'
import { Avatar, Divider } from 'react-native-elements'

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
      <View style={{ flex: 1 }}>
        <View>
          <Avatar
            medium
            source = {{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }}
          />
        </View>
        <Divider style={{ height: 1, backgroundColor: '#e1e8ee' }} />
        <View>
          <Text> Main Settings here</Text>
        </View>
        <Divider style={{ height: 1, backgroundColor: '#e1e8ee' }} />
        <View>
          <Text onPress={this._handleLogout}> Logout </Text>
        </View>
      </View>
    )
  }
}

export default withNavigation(SettingsViewer)

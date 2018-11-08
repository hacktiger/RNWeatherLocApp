/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react'
import {
  View,
  Text
} from 'react-native'
// my imports
import Firebase from '../../../controller/Firebase'
import axios from 'axios'
class UserViewer extends PureComponent {
  constructor () {
    super()
    this.state = {
      userList: []
    }
    this.myFirebase = new Firebase()
  }
  componentDidMount () {
    this.myFirebase.getUserList()
      .then(res => console.log(res))
/*     axios.get('https://weather-location-app-217808.firebaseio.com/users.json')
      .then(res => console.log(res)) */
  }
/*   yea () {
    this.myRef = this.myFirebase.database().ref('users')
    this.myRef.off()
    this.myRef.on('value', (snap) => {
      this.setState({
        userList: snap.val()
      })
      console.log(this.state)
    })
  } */
  render () {
    return (
      <View>
        <Text>This is user list screen</Text>
      </View>
    )
  }
}

export default UserViewer

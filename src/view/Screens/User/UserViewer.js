// react imports
import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import User from '../../../controller/User'

// main class
class UserViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      UserList: []
    }
    this.User = new User()
  }
  // test func
  componentDidMount () {
    this.User.getAllUserList()
  }
  // MAIN RENDER
  render () {
    return (
      <View>
        <Text>User List</Text>
        <Text>WAWA</Text>
      </View>
    )
  }
}

export default UserViewer

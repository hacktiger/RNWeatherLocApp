// react imports
import React, { PureComponent } from 'react'
import {
  Text,
  View,
  FlatList
} from 'react-native'
import User from '../../../controller/User'
import MyListItem from './myListItem'

// main class
class UserViewer extends PureComponent {
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
      .then(response => this._handleSuccess(response))
  }
  _handleSuccess (response) {
    if (response) {
      console.log(response.data.data)
      this.setState({
        UserList: response.data.data
      })
      console.log(this.state.UserList)
    } else {
      console.log('view : empty user list')
    }
  }
  //helper funcs
  _renderItem = ({ item }) => (
    <MyListItem
      title = {item.first_name}
    />
  )
  
  // MAIN RENDER
  render () {
    return (
      <View>
        <FlatList 
          data={this.state.UserList}
          renderItem = {this._renderItem}
          keyExtractor={ (item, index) => index.toString() }
        />
      </View>
    )
  }
}

export default UserViewer

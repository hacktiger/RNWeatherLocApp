import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { Avatar } from 'react-native-elements'

class MyListItem extends PureComponent {
  _onPress = (name) => {
    console.log('hello ', name)
  }

  render () {
    return (
      <TouchableOpacity 
      onPress={() => this._onPress(this.props.first_name)}  
      style = {styles.container}
      >
        <View style={styles.avatar}>
          <Avatar
            medium
            rounded
            style={{ width: 50, height: 50 }}
            source={{ uri: `${this.props.avatar}` }}
            activeOpacity={0.7}
          />
        </View>
        {/* Name. */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {this.props.first_name + ' ' + this.props.last_name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex:1
  },
  avatar: {
    marginLeft:20,
    flex: 0.2
    /* ,backgroundColor: 'blue' */

  },
  textContainer: {
    marginRight:20,
    flex: 0.8
    /* ,backgroundColor: 'green' */
  },
  text: {
    color: 'red',
    fontSize: 30,
    fontWeight: '800'
  }
})

export default MyListItem

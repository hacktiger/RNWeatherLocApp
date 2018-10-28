import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

export default class MyListItem extends PureComponent {
  render () {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style = {styles.container}>
          <Text style={styles.text}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: 'yellow'
  },
  text: {
    color: 'red',
    fontSize: 25,
    fontWeight: '200',
    textAlign: 'center'
  }
})

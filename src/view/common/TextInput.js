/* eslint-disable no-unused-vars */
import React from 'react'
import {
  TextInput
} from 'react-native'

const MyTextInput = () => {
  return (
    <View style={styles.textInput}>
      <TextInput
        placeholder = {this.props.placeholder}
        onChangeText = {this.props.onChangeText}
        value = {this.props.input}
        style = {styles.textInput}
      />
    </View>
  )
}

const styles = {
  textInput: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default MyTextInput

/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Switch
} from 'react-native'

class SettingsOption extends Component {
  render () {
    return (
      <View style={styles.mainSettings}>
        <View style={styles.mainSettingsTextView}>
          <Text style={styles.mainSettingsTextStyle}> {this.props.settingTitle}</Text>
        </View>
        <View style={styles.mainSettingsSwitchView}>
          <Switch
            onTintColor = {this.props.tintColor}
            thumbTintColor = 'white'
            value = {this.props.switchValue}
            onValueChange = {this.props.action}
          />
        </View>
      </View>
    )
  }
}

export default SettingsOption

// Styles

const styles = StyleSheet.create({
  mainSettings: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  mainSettingsTextView: {
    flexGrow: 5,
    justifyContent: 'center'
  },
  mainSettingsTextStyle: {
    fontFamily: '8BIT WONDER Nominal',
    paddingLeft: 20,
    fontSize: 20,
    fontWeight: '900'
  },
  mainSettingsSwitchView: {
    flexGrow: 2,
    justifyContent: 'center'
  }
})

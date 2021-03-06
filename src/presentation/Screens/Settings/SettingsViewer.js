/* eslint-disable no-unused-vars */
// react imports
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import { Avatar } from 'react-native-elements'
//
import SettingsOption from './common/SettingsOption'
import Firebase from '../../../controller/Firebase'
// test
import MyIcon from '../../common/MyIcon'

// IMPORTS FOR TESTING PURPOSES
// main class
class SettingsViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSwitchOn: false,
      isSwitch2On: false
    }
    this._handleLogout = this._handleLogout.bind(this)
    this._onClickSetting2 = this._onClickSetting2.bind(this)
    this._onClickSetting = this._onClickSetting.bind(this)
    this.Authentication = new Firebase()
    //
  }
  //
  getCurrentUserEmail () {
    return this.Authentication.getCurrUser().email
  }
  //
  _handleLogout () {
    // console.log('Pressed')
    this.Authentication.signOutUser()
      .then(() => {
        // console.log('OK')
        this.props.navigation.navigate('Login')
      })
      .catch((err) => {
        console.log('Logout err', err)
      })
  }
  _onClickSetting2 () {
    this.setState({
      isSwitch2On: !this.state.isSwitch2On
    })
  }
  _onClickSetting () {
    this.setState({
      isSwitchOn: !this.state.isSwitchOn
    })
  }
  renderMainView () {
    return (
      <ScrollView style={ styles.container }>
        <View style={ styles.localContainer }>
          <View style= { styles.containerAvatar }>
            <Avatar
              large
              rounded
              source = {{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }}
            />
          </View>
          <View style= { styles.containerTitle }>
            <Text style={{ fontFamily: '8BIT WONDER Nominal', fontSize: 30, fontWeight: '900' }}>
              {this.getCurrentUserEmail()}
            </Text>
          </View>
        </View>

        <View style={{ paddingVertical: 40 }}>
          <SettingsOption settingTitle='Setting 1' tintColor='#66ff66' switchValue={this.state.isSwitchOn} action={this._onClickSetting}/>
          <SettingsOption settingTitle='Setting 2' tintColor='#66ff66' switchValue={this.state.isSwitch2On} action={this._onClickSetting2}/>
        </View>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={this._handleLogout}
        >
          <View style={styles.logout}>
            <Text style={{ fontSize: 20, paddingLeft: 30, fontWeight: '900' }} >Logout</Text>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    )
  }// 
  // MAIN RENDER
  render () {
    return (
      <View style={{ flex: 1 }}>{this.renderMainView()}</View>
    )
  }
}

// export
export default SettingsViewer

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e8ee'
  },
  localContainer: {
    marginTop: 52,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  containerAvatar: {
    flexGrow: 1
  },
  containerTitle: {
    flexGrow: 7,
    justifyContent: 'center',
    paddingLeft: 10
  },
  logout: {
    backgroundColor: 'white',
    height: 60,
    justifyContent: 'center'
  }
})

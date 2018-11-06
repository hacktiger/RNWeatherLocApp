/* eslint-disable no-unused-vars */
// react imports
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import firebase from 'firebase'
import { withNavigation } from 'react-navigation'
import { Avatar, Divider } from 'react-native-elements'
import { Switch } from 'react-native-paper'

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
  }
  _handleLogout () {
    firebase.auth().signOut()
      .then(() => {
        this.props.navigation.navigate('Login')
      })
      .catch((err) => {
        console.log('Logout err', err)
      })
  }
  render () {
    return (
      <View style={ styles.container }>
        <View style={ styles.localContainer }>
          <View style= { styles.containerAvatar }>
            <Avatar
              large
              rounded
              source = {{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }}
            />
          </View>

          <View style= { styles.containerTitle }>
            <Text style={{ fontSize: 30, fontWeight: '900' }}>
              Your Profile
            </Text>
          </View>
        </View>

        <Divider style={{ height: 40, backgroundColor: '#e1e8ee', marginVertical: 20 }} />

        <View style={styles.mainSettingsContainer}>

          <View style={styles.mainSettings} >
            <Text style={{ fontSize: 20, paddingLeft: 30 }}>
                Settings 1
            </Text>
            <Switch
              color = 'green'
              value={this.state.isSwitchOn}
              onValueChange={() => {
                this.setState({ isSwitchOn: !this.state.isSwitchOn })
              }}
            />
          </View>

          <Divider style={{ height: 2, backgroundColor: '#e1e8ee' }} />

          <View style={styles.mainSettings} >
            <View style={{ backgroundColor: 'green', flexGrow: 7 }}>
            </View>
            <View style={{ backgroundColor: 'yellow', flexGrow: 2 }}>
            </View>

          </View>

        </View>
        <Divider style={{ height: 40, backgroundColor: '#e1e8ee', marginVertical: 20 }} />
        <View style={styles.mainSettingsTouchable} onPress={this._handleLogout}>
          <Text style={{ fontSize: 15, paddingLeft: 30 }}>Logout</Text>
        </View>

      </View>
    )
  }
}

// export
export default withNavigation(SettingsViewer)

// Styles
const styles = StyleSheet.create({
  localContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  containerAvatar: {
    flexGrow: 1
  },
  containerTitle: {
    flexGrow: 7,
    justifyContent: 'center'
  },
  mainSettings: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red'
  }
})

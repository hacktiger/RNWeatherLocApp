// react imports
import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { withNavigation } from 'react-navigation'
import firebase from 'firebase'
import { TextInput, Button } from 'react-native-paper'
// IMPORTS FOR TESTING PURPOSES
// main class
class SignInViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  UNSAFE_componentWillMount () {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyDh6IrfHjQuQyUXAAhtPQcSFUx1NIyWxUU',
      authDomain: 'weather-location-app-217808.firebaseapp.com',
      databaseURL: 'https://weather-location-app-217808.firebaseio.com',
      projectId: 'weather-location-app-217808',
      storageBucket: 'weather-location-app-217808.appspot.com',
      messagingSenderId: '302794681971'
    }
    firebase.initializeApp(config)
  }
  _handleChange (input) {
    this.setState({
      email: input
    })
  }

  _handleChangePassword (input) {
    this.setState({
      password: input
    })
  }
  render () {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <View style={ styles.inputBox }>
          {/* EMAIL INPUT */}
          <TextInput
            theme = {{ roundness: 3, colors: { primary: 'green' } }}
            label='Email'
            placeholder='Enter your email here...'
            value = {this.state.email}
            onChangeText = {text => this._handleChange(text)}
            mode = 'outlined'
          />
          {/* PASSWORD INPUT */}
          <TextInput
            secureTextEntry = {true}
            theme = {{ roundness: 3, colors: { primary: 'green' } }}
            label='Password'
            placeholder='Enter your password here...'
            value = {this.state.password}
            onChangeText = {text => this._handleChangePassword(text)}
            mode = 'outlined'
          />
        </View>
        <View style = { styles.buttonBox }>
          <Button
            style = {styles.button}
            color='blue'
            mode='contained'
            onPress={() => { this.props.navigation.navigate('App') }} 
          >
              Login
          </Button>
        </View>
      </ScrollView>
    )
  }
}

export default withNavigation(SignInViewer)

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300,
    paddingLeft: 50,
    paddingRight: 50
  },
  inputBox: {
  },
  buttonBox: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 55,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

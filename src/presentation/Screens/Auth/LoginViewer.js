/* eslint-disable no-unused-vars */
// react imports
import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Spinner from '../../common/Spinner'
import Firebase from '../../../controller/Firebase'
import { goToApp, goToSignUp } from '../../common/Navigation';
// IMPORTS FOR TESTING PURPOSES
// main class
class LoginViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoading: false,
      checkingAuth: true,
      auth: false
    }
    // bind functions to this
    this._handleLogin = this._handleLogin.bind(this)
    this._signUpScreen = this._signUpScreen.bind(this)
    // init Auth.js controller
    this.Authentication = new Firebase()
  }
  // handle text change on email input
  _handleChange (input) {
    this.setState({
      email: input
    })
  }
  // handle text change on password input
  _handleChangePassword (input) {
    this.setState({
      password: input
    })
  }
  // handle login ( navigate when success| show error when fail )
  _handleLogin () {
    this.setState({ error: '', isLoading: true })
    this.Authentication.logInUser(this.state.email, this.state.password)
      .then(() => {
        goToApp()
      })
      .catch((err) => {
        let errCode = err.code
        let errMessage = ''
        switch (errCode) {
          case 'auth/invalid-email':
            errMessage = 'Invalid e-mail address'
            break
          case 'auth/user-disabled':
            errMessage = 'Account is disabled'
            break
          case 'auth/user-not-found':
            errMessage = 'User e-mail not found'
            break
          case 'auth/wrong-password':
            errMessage = 'User password is incorrect'
            break
          default:
            errMessage = err.message
        }
        this.setState({
          error: errMessage,
          isLoading: false,
          password: ''
        })
      })
  }
  // render login button
  _renderButton () {
    if (this.state.isLoading) {
      return <Spinner size="small" />
    } else {
      return (
        <Button
          style = {styles.button}
          color='green'
          mode='contained'
          onPress={this._handleLogin}
        >
          Login
        </Button>
      )
    }
  }
  // navigate to signup screen if have no account
  _signUpScreen () {
    goToSignUp()
  }
  _renderTextInput (label, placeholder, value) {
    // put smt here to reduce code length in main render
  }
  // MAIN RENDER
  render () {
    return (
      <KeyboardAvoidingView style = {{ flex: 1 }} keyboardVerticalOffset={-500} enabled>
        <ScrollView keyboardShouldPersistTaps="handled">
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
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ color: 'red' }}> { this.state.error } </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'blue' }} onPress={this._signUpScreen}>
                Don`t have an Account? Register here
            </Text>
          </View>
          <View style = { styles.buttonBox }>
            {this._renderButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
// export
export default LoginViewer

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300,
    paddingLeft: 50,
    paddingRight: 50
  },
  inputBox: {
    paddingTop: 80,
    paddingHorizontal: 40
  },
  buttonBox: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 45,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

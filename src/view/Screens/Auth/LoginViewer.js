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
import { withNavigation } from 'react-navigation'
import AuthDataService from '../../../services/models/AuthDataService'
import { TextInput, Button } from 'react-native-paper'
import Spinner from '../../common/Spinner'
import Auth from '../../../controller/Auth'
// IMPORTS FOR TESTING PURPOSES
// main class
class SignInViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
    this._handleLogin = this._handleLogin.bind(this)
    this._signUpScreen = this._signUpScreen.bind(this)
    this.Authentication = new Auth()
  }
  componentDidMount () {
    // Initialize Firebase if not already needs testing
    if (AuthDataService.auth()) {
      console.log('ok')
    } else {
      this.Authentication.initFirebase()
    }
    // on Auth Events ( 73 )
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

  _handleLogin () {
    this.setState({ error: '', isLoading: true })
    this.Authentication.logInUser(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('App')
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

  renderButton () {
    if (this.state.isLoading) {
      return <Spinner size="small" />
    } else {
      return (
        <Button
          style = {styles.button}
          color='blue'
          mode='contained'
          onPress={this._handleLogin}
        >
          Login
        </Button>
      )
    }
  }
  _signUpScreen () {
    this.props.navigation.navigate('SignUp')
  }
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
          <View style = { styles.buttonBox }>
            <Text style={{ color: 'blue' }} onPress={this._signUpScreen}>
              Don`t have an Account? Register here
            </Text>
            {this.renderButton()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
// export
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

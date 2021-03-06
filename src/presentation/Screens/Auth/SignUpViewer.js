/* eslint-disable no-unused-vars */
// react imports
import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import Spinner from '../../common/Spinner'
import Firebase from '../../../controller/Firebase'
import { goToLogIn } from '../../common/Navigation'
// IMPORTS FOR TESTING PURPOSES
// main class
class SignUpViewer extends Component {
  //
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
    // bind functions to this
    this._handleSignUp = this._handleSignUp.bind(this)
    // init Auth.js controller
    this.Authentication = new Firebase()
  }
  // handle email input
  _handleChangeEmail (input) {
    this.setState({
      email: input
    })
  }
  // handle password input
  _handleChangePassword (input) {
    this.setState({
      password: input
    })
  }

  _handleSignUp () {
    this.setState({ error: '', isLoading: true })
    const { email, password } = this.state
    this.Authentication.signUpUser(email, password)
      .then((user) => { // save user to DB if signed up correctly
        this.Authentication.saveUserToDB(user.user.uid, user.user.email)
        this.props.navigation.navigate('App') // navigate after save user successful
      })
      .catch((err) => {
        let errCode = err.code
        let errMessage = ''
        switch (errCode) {
          case 'auth/email-already-in-use':
            errMessage = 'Account already exist'
            break
          case 'auth/invalid-email':
            errMessage = 'Invalid e-mail address'
            break
          case 'auth/weak-password':
            errMessage = 'Your password is too weak'
            break
          default:
            errMessage = err.message
        }
        this.setState({
          email: '',
          password: '',
          error: errMessage,
          isLoading: false
        })
      })
  }
  // render signup button
  _renderButton () {
    if (this.state.isLoading) {
      return <Spinner size="small" />
    } else {
      return (
        <Button
          style = {styles.button}
          color='purple'
          mode='contained'
          onPress={this._handleSignUp}
        >
          Sign Up
        </Button>
      )
    }
  }
  _logInScreen () {
    goToLogIn()
  }
  // MAIN RENDER
  render () {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={ styles.inputBox }>
          {/* EMAIL INPUT */}
          <TextInput
            theme = {{ roundness: 3, colors: { primary: 'purple' } }}
            label='Email'
            placeholder='Enter your email here...'
            value = {this.state.email}
            onChangeText = {text => this._handleChangeEmail(text)}
            mode = 'outlined'
          />
          {/* PASSWORD INPUT */}
          <TextInput
            secureTextEntry = {true}
            theme = {{ roundness: 3, colors: { primary: 'purple' } }}
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
          <Text style={{ color: 'blue' }} onPress={this._logInScreen}>
              Already have an account ? Log in here.
          </Text>
        </View>
        <View style = { styles.buttonBox }>
          {this._renderButton()}
        </View>
      </ScrollView>
    )
  }
}
// export
export default SignUpViewer

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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

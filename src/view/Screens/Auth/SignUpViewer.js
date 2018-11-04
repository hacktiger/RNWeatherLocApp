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
// import firebase from 'firebase'
import { TextInput, Button } from 'react-native-paper'
import Spinner from '../../common/Spinner'
import Auth from '../../../controller/Auth'

// IMPORTS FOR TESTING PURPOSES
// main class
class SignUpViewer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
    this._handleSignUp = this._handleSignUp.bind(this)
    this.Authentication = new Auth()
  }
  componentDidMount () {
    // Initialize Firebase

    // on Auth Events ( 73 )
  }
  _handleChangeEmail (input) {
    this.setState({
      email: input
    })
  }

  _handleChangePassword (input) {
    this.setState({
      password: input
    })
  }

  _handleSignUp () {
    this.setState({ error: '', isLoading: true })
    this.Authentication.signUpUser(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('App')
      })
      .catch((err) => {
        console.log(err.code)
        console.log(err.message)
        this.setState({
          error: err.message,
          isLoading: false,
          email: '',
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
          onPress={this._handleSignUp}
        >
          Sign Up
        </Button>
      )
    }
  }

  render () {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={ styles.inputBox }>
          {/* EMAIL INPUT */}
          <TextInput
            theme = {{ roundness: 3, colors: { primary: 'red' } }}
            label='Email'
            placeholder='Enter your email here...'
            value = {this.state.email}
            onChangeText = {text => this._handleChangeEmail(text)}
            mode = 'outlined'
          />
          {/* PASSWORD INPUT */}
          <TextInput
            secureTextEntry = {true}
            theme = {{ roundness: 3, colors: { primary: 'red' } }}
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
          {this.renderButton()}
        </View>
      </ScrollView>
    )
  }
}
// export
export default withNavigation(SignUpViewer)

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

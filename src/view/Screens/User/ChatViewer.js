/* eslint-disable no-unused-vars */
import React from 'react'
import {
  View,
  Text
} from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../../controller/Firebase'

class ChatViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.myFirebase = new Firebase()
    this.dtb = this.myFirebase.database()
    this.messagesTable = this.dtb.ref('message')
    this.loadMessages()
  }
  // Retrieve the messages
  loadMessages () {
    //
    if (this.state.loaded) {
    } else {
      this.messagesTable.on('value', (snap) => {
        console.log(snap.val())
        this.addMessage(snap.val())
      }, (errObj) => {
        console.log('read failed :', errObj.code)
      })
    }
  }

  addMessage (messages = []) {
    var keys = Object.keys(messages)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var mess = messages[key]
      this.setState({ messages: [mess, ...this.state.messages] })
    }
  }

  _onSend (messages = []) {
    let messObj = {
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt: '2017-10-24T09:24:03.329Z',
      user: {
        _id: messages[0].user._id,
        name: 'React Native',
        avatar: 'https://facebook.github.io/react/img/logo_og.png'
      }
    }

    this.messagesTable.push(messObj, (err) => {
      if (err) {
        console.log('opps')
      }
    })
  }

  // MAIN RENDER
  render () {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this._onSend(messages)}
        user={{
          _id: 1 // need to be changed to current user ID
        }}
      />
    )
  }
}

export default ChatViewer

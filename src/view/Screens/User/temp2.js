import React from 'react';

import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../../../controller/Firebase';

export default class Chat extends React.Component {
  constructor () {
    super()
    this.state = {
      messages: []
    }
    this.myFirebase = new Firebase()
  }
  render () {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(message) => {
          this.myFirebase.sendMessage2(message)
        }}
        user={{
          _id: this.myFirebase.getUid(),
          name: 'Reac-native'
        }}
      />
    )
  }
  async componentDidMount () {
    this.test()
  }

  async test () {
    await this.myFirebase.loadMessages2((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        }
      })
    })
  }
  componentWillUnmount () {
    this.myFirebaseend.closeChat()
  }
}

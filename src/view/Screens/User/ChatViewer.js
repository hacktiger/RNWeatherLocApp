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
  componentDidMount () {
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
    let kkk = await this.myFirebase.printMess()
    let done = true
    while (done) {
      if (kkk.length === 3) {
        done = false
        console.log('AAA', kkk)
      }
    }
  }
  componentWillUnmount () {
    this.myFirebaseend.closeChat()
  }
}

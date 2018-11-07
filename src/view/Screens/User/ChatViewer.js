/* eslint-disable no-unused-vars */
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../../controller/Firebase'

class ChatViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.myFirebase = new Firebase()
  }
  // lief cycle methods
  componentDidMount () {
    
    this.myFirebase.loadMessages((message) => {
      console.log(message)
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        }
      })
    })
  }
  componentWillUnmount () {
    this.myFirebase.closeChatConn()
  }

  // MAIN RENDER
  render () {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.myFirebase.sendMessage(messages)}
        user={{
          _id: this.myFirebase.getUid()// need to be changed to current user ID
        }}
      />
    )
  }
}

export default ChatViewer

/* eslint-disable no-unused-vars */
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../../controller/Firebase'
import { withNavigation } from 'react-navigation'

class ChatViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.myFirebase = new Firebase()
    this.targetUserID = this.props.navigation.getParam('userid')
    this.myID = this.myFirebase.getUid()
  }
  // lief cycle methods
  componentDidMount () {
    this.myFirebase.loadMessages(this.targetUserID, this.myID, (message) => {
      // console.log(message)
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
        onSend={messages => this.myFirebase.sendMessage(this.targetUserID, this.myID, messages)}
        user={{
          _id: this.myID// need to be changed to current user ID
        }}
      />
    )
  }
}

export default withNavigation(ChatViewer)

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
  }
  // lief cycle methods
  componentDidMount () {
    // TRYING to get message only from certain person
    /*     const myID = 'jOwlfhE8KpPMctrz6mCOaxkxpGX2'
    const ref = this.myFirebase.database().ref('messages')
    const query = ref.orderByChild('user/_id').equalTo(myID)
    query.on('value', (snap) => {
      console.log('BBBBB :', snap.val())
    }, (err) => {
      console.log(err)
    }) */
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
          _id: 'jOwlfhE8KpPMctrz6mCOaxkxpGX2'// need to be changed to current user ID
        }}
      />
    )
  }
}

export default withNavigation(ChatViewer)

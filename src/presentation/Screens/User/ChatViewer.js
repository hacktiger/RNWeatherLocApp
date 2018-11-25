/* eslint-disable no-unused-vars */
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import ChatFirebase from '../../../controller/Chat'
// main class
class ChatViewer extends React.Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: `${passProps.email}`
        },
        subtitle: {
          text: `Chat with ${passProps.email}`
        },
        drawBehind: true,
        visible: true,
        animate: false
      }
    };
  }
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      isLoading: false,
      lastMess: '',
      roomID: '',
      loadEarlier: false,
      temp: 0
    }
    this.myFirebase = new ChatFirebase()
    this.targetUserID = props.userid
    this.userEmail = props.email
    this.myID = this.myFirebase.getUid()
  }
  // lief cycle methods
  componentDidMount () {
    this.loadMessage()
  }

  componentWillUnmount () {
    this.myFirebase.closeChatConn()
  }
  // LOAD MESSAGE
  async loadMessage () {
    await this.setState({ roomID: this.myFirebase.getRoomID(this.targetUserID, this.myID) })
    this.myFirebase.loadMessages(this.state.roomID, (message) => {
      if (this.state.temp === 0) {
        this.setState({
          loadEarlier: true,
          lastMess: message._id,
          temp: 1
        })
        return
      }
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message)
        }
      })
    })
  }
  //
  _loadEalier () {
    this.setState({ isLoading: true })
    this.myFirebase.messagesRef
      .orderByKey()
      .limitToLast(20)
      .endAt(this.state.lastMess)
      .on('value', (snap) => this._handleLoadEarlierResponse(snap))
  }
  // handle load more response
  _handleLoadEarlierResponse (snap) {
    // get snapshot val()
    let messages = snap.val()
    let tempArr = []
    // push data objects => array for handling
    Object.keys(messages).forEach((key) => {
      let _id = key
      tempArr.push({ _id, ...messages[key] })
    })
    tempArr.reverse()
    // set state result
    // console.log(tempArr[tempArr.length - 1].text)
    this.setState({
      lastMess: tempArr[tempArr.length - 1]._id,
      messages: [ ...this.state.messages, ...tempArr.splice(0, tempArr.length - 1) ]
    })
    this.setState({ isLoading: false })
  }
  //
  _handlesendMessage (sentMessage) {
    this.myFirebase.sendMessage(this.state.roomID, sentMessage)
  }

  // MAIN RENDER
  render () {
    return (
      <GiftedChat
        // small func
        keyboardShouldPersistTaps = 'handled'
        isAnimated = {true}
        showAvatarForEveryMessage={true}
        // load ealier
        loadEarlier = {this.state.loadEarlier}
        onLoadEarlier = {() => { this._loadEalier() }}
        isLoadingEarlier = {this.state.isLoading}
        // main information
        messages={this.state.messages}
        onSend={message => this._handlesendMessage(message)}
        user={{
          _id: this.myID // need to be changed to current user ID
        }}
      />
    )
  }
}

export default ChatViewer

/* eslint-disable no-unused-vars */
import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import Firebase from '../../../controller/Firebase'
import { withNavigation } from 'react-navigation'
class ChatViewer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      isLoading: false,
      lastMess: '',
      roomID: '',
      error: ''
    }
    this.myFirebase = new Firebase()
    this.targetUserID = this.props.navigation.getParam('userid')
    this.userEmail = this.props.navigation.getParam('email')
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
    await this.myFirebase.createRoom(this.targetUserID, this.myID)
    this.setState({
      roomID: await this.myFirebase.getRoomID(this.targetUserID, this.myID)
    })
    this.myFirebase.getMessagesList(this.state.roomID)
      .then((res) => this._handleResponse(res))
      .catch((err) => this._handleError(err))
  }
  //
  _handleResponse (res) {
    let data = res.data
    let mess = []
    Object.keys(data).forEach((key) => {
      let _id = key
      mess.push({ _id, ...data[key] })
    })
    mess.sort()
    mess.reverse()
    this.setState({
      lastMess: mess[mess.length - 1]._id,
      messages: [ ...this.state.messages, ...mess.splice(0, mess.length - 1) ]
    })
    console.log(this.state)
  }
  //
  _handleError (err) {
    this.setState({
      error: err
    })
  }
  //
  _loadEalier () {
    // endAtMessageKey
    this.myFirebase.getEalierMessagesList(this.state.roomID, this.state.lastMess)
      .then((res) => this._handleResponse(res))
      .catch((err) => this._handleError(err))
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
        loadEarlier = {true}
        onLoadEarlier = {() => { this._loadEalier() }}
        isLoadingEarlier = {this.state.isLoading}
        // main information
        messages={this.state.messages}
        onSend={messages => this.myFirebase.sendMessage(this.targetUserID, this.myID, messages)}
        user={{
          _id: this.myID // need to be changed to current user ID
        }}
      />
    )
  }
}

export default withNavigation(ChatViewer)

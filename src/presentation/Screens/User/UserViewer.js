// react imports
import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { List, SearchBar, ListItem } from 'react-native-elements';
import { Navigation } from 'react-native-navigation'
// My imports
import Spinner from '../../common/Spinner';
import Firebase from '../../../controller/Firebase'
import UserViewModel from '../../../viewmodel/UserViewModel'
//


// main class
class UserViewer extends PureComponent {
  _isMounted = false

  constructor (props) {
    super (props)
    this.state = {
      OriginalUserList: [],
      UserList: [],
      query: '',
      error: 'None',
      isLoading: true,
      isRefreshing: false,
      lastUser: '',
    };
    // react native create reference
    this.myFirebase = new Firebase()
    this.myUserModel = new UserViewModel()
    //
  }
  // component did mount
  componentDidMount () {
    this._isMounted = true
    this.retrieveUserList()
  }
  //
  componentWillUnmount () {
    this._isMounted = false
  }
  //get User
  // @ref : componentDidMount
  retrieveUserList = async () => {
    try {
      await this.myUserModel.getUserList()
        .then((res) => this._handleResponse(res))
        .catch((err) => {
          // TODO: handle error in user view when get user list
          console.log('ERR', err)
        })
    } catch (error) {
      // print error
      this.setState({
        error: 'Error'
      })
    }
    
  }
  // handle success of getting user
  _handleResponse (response) {
    if (this._isMounted) {
      if ( response ) {
        this.setState({
          lastUser: response.lastUser,
          UserList: [...this.state.UserList,...response.userList],
          OriginalUserList: [...this.state.OriginalUserList,...response.userList],
          isLoading: false,
          isRefreshing: false
        })
      } else {
        this.setState({
          isLoading: false,
          isRefreshing: false,
          error: 'Something went wrong'
        });
      }
    }
  }

  ///////////////////////////////////////////////////////////////////
  // HELPER FUNCTIONS FOR FLAT LIST   
  ///////////////////////////////////////////////////////////////////
  _onPressItem (id, email) {
    ///////// change later for react-native-navigation
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ChatScreen',
        passProps: {
          userid: id,
          email: email
        }
      }
    })
  }

  // render each items
  // @ref render -> FlatList
  _renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        title = {item.email}
        onPress = {smt => this._onPressItem(item.id, item.email)}
        titleStyle = {{fontSize:25,paddingLeft:30}}
        chevronColor = 'black'
      />
    </TouchableOpacity>
  )

  // key Extractor
  // @ref render -> Flatlist
  _keyExtractor = (item,index) => index.toString()

  // render separator between items
  // @ref render -> FlatList
  _renderSeparator = () => {
    return (
      <View style = {styles.spinnerView}  />
    )
  }
  // render search bar
  // @ref render -> FlatList
  _renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        platform="android"
        onChangeText = {(text) => this._handleTextChange(text)}
        autoCorrect={false} 
      />
    )
  }
  // do some filtering on search bar later
  _handleTextChange = (text) => {
    const filteredData = this.state.OriginalUserList.filter(item => {      
      const itemData = `${item.email.toUpperCase()}`;
      const formatQuery = text.toUpperCase();

      return itemData.indexOf(formatQuery) > -1;    
    });
    this.setState({ UserList: filteredData })
  }

  // render footer ( Spinner )
  // @ref render -> FlatList
  _renderFooter = () => {
    if (this.state.error === 'None' ){
      if(!this.state.isLoading){
        return null
      }
      return (
        <View style={styles.errorText}>
          <Spinner />
        </View>
      ) 
    } else {
      return (
        <View>
          <Text style = {{textAlign:'center', color:'red', fontSize:30}}>
            Something went wrong
          </Text>
        </View>
      )
    }
  }

   // handle when pull to refresh
  // @ref render -> FlatList
  _handleRefresh = () => {
    this.setState({
      OriginalUserList: [],
      UserList: [],
      isRefreshing: true
      },() => {
        this.retrieveUserList();
      }
    )
  }
  // load more
  // @ref render -> FlatList
  _handleLoadMore = () => {
    //TODO: scroll down make header lose it selft
    console.log('load more')
    this.myUserModel.getMoreUserList(this.state.lastUser)
      .then(response => this._handleResponse(response))
      .catch(err => console.log('UserView.loadMore', err))
  }
  _loadFlatList () {
    return (
      <FlatList
        data={this.state.UserList}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        // Separator/ Header/ Footer
        ItemSeparatorComponent={this._renderSeparator}
        ListHeaderComponent={this._renderHeader}
        ListFooterComponent={this._renderFooter}
        // Refresh
        refreshing={this.state.isRefreshing}
        onRefresh={this._handleRefresh}
        //Loadmore
        onEndReached = {this._handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    )
  }
  /////////////////////////////////////////////////////////////////////
  // MAIN RENDER
  /////////////////////////////////////////////////////////////////////
  render () {
    return (
      <View style={styles.container}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          { this._loadFlatList() }
        </List> 
      </View>
    )
  }
}
// EXPORT
export default UserViewer
// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35
  },
  spinnerView:{
    height: 1,
    width: "86%",
    backgroundColor: "#CED0CE",
    marginLeft: "14%"
  },
  errorText: {
    paddingVertical: 20,
    borderTopWidth: 1 ,
    borderTopColor: '#CED8CE'
  }
})
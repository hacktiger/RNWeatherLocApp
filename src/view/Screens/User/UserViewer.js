// react imports
import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { List, SearchBar, ListItem, Avatar } from 'react-native-elements';
// My imports
import User from '../../../controller/User';
// import UserListItem from './userListItem'; // custom ListItem
import Spinner from '../../common/Spinner';

// main class
class UserViewer extends PureComponent {
  constructor (props) {
    super (props)
    this.state = {
      UserList: [],
      arrayholder: [],
      query: '',
      page: 1,
      error: 'None',
      isLoading: true,
      isRefreshing: false
    };
    // react native create reference
    this.search = React.createRef()
    this.User = new User()
  }
  // component did mount
  componentDidMount () {
    // this.testFunc()
    this.retrieveUserList()
  }
/*   testFunc = () => {
    const my = {
      'name': 'morp',
      'job': 'leader'
    }
    this.User.updateUser(2,my)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  } */
  //get User
  // @ref : componentDidMount
  retrieveUserList = () => {
    this.User.getAllUserList(this.state.page)
      .then(response => this._handleResponse(response))
      .catch(err => console.log(err))
  }
  // handle success of getting user
  _handleResponse (response) {
    if ( response ) {
      // console.log('user view response: ', response)
      this.setState({
        UserList: [...this.state.UserList, ...response.data.data],
        arrayholder: [...this.state.arrayholder, ...response.data.data],
        isLoading: false,
        isRefreshing: false
      });
      // console.log(this.state.UserList)
    } else {
      this.setState({
        isLoading: false,
        isRefreshing: false,
        error: 'Something went wrong'
      });
    }
    // console.log(this.state)
  }

  ///////////////////////////////////////////////////////////////////
  // HELPER FUNCTIONS FOR FLAT LIST   
  ///////////////////////////////////////////////////////////////////
  // render each items
  // @ref render -> FlatList
  _renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        avatar = { <Avatar
                      medium
                      rounded
                      style={{ width: 50, height: 50 }}
                      source={{ uri: `${item.avatar}` }}
                      activeOpacity={0.7}
                    />
        }
        title = {item.first_name + ' ' + item.last_name}
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
        ref={search => this.search = search}
        placeholder="Type Here..."
        lightTheme
        round
        platform="android"
        onChangeText = {(text) => this._handleTextChange(text)}
      />
    )
  }
  // do some filtering on search bar later
  _handleTextChange = (text) => {
    // console.log(text)
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
        page: 1,
        isRefreshing: true
      },() => {
        this.retrieveUserList();
      }
    )
  }
  // load more
  // @ref render -> FlatList
  _handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.retrieveUserList(this.state.page)
    })
  }

  /////////////////////////////////////////////////////////////////////
  // MAIN RENDER
  /////////////////////////////////////////////////////////////////////
  render () {
    return (
      <View style={styles.container}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
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
          </List>
      </View>
    )
  }
}

export default UserViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop :-22
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
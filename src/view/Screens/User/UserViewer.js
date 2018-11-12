// react imports
import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { List, SearchBar, ListItem } from 'react-native-elements';
import { withNavigation } from 'react-navigation'
// My imports
import Spinner from '../../common/Spinner';
import Firebase from '../../../controller/Firebase'

// main class
class UserViewer extends PureComponent {
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
  }
  // component did mount
  componentDidMount () {
    this.retrieveUserList()
  }
  //get User
  // @ref : componentDidMount
  retrieveUserList = () => {
    this.myFirebase.getUserList()
      .then(response => this._handleResponse(response))
      .catch(err => console.log(err))
  }
  // handle success of getting user
  _handleResponse (response) {
    if ( response ) {
      let temp = []
      let data = response.data
      Object.keys(data).forEach((key) => {
        temp.push(data[key])
      })
      // to prevent multiple load more on the same key over and over again
      if(temp.length === 1){
        return
      }
      temp2 = temp.splice(0, temp.length-1)
      this.setState({
        lastUser: temp[temp.length-1].id,
        UserList: [...this.state.UserList,...temp2],
        OriginalUserList: [...this.state.OriginalUserList,...temp2],
        isLoading: false,
        isRefreshing: false
      })
      console.log(this.state)
    } else {
      this.setState({
        isLoading: false,
        isRefreshing: false,
        error: 'Something went wrong'
      });
    }
  }

  ///////////////////////////////////////////////////////////////////
  // HELPER FUNCTIONS FOR FLAT LIST   
  ///////////////////////////////////////////////////////////////////
  _onPressItem (id, email) {
    this.props.navigation.navigate('Chat', {
      userid: id,
      email: email
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
    console.log(text)
    console.log(this.state.UserList)
    console.log(this.state.OriginalUserList)
    const filteredData = this.state.OriginalUserList.filter(item => {      
      const itemData = `${item.email.toUpperCase()}`;
      const formatQuery = text.toUpperCase();
      // return  
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
    console.log('load more')
    this.myFirebase.getMoreUserList(this.state.lastUser)
      .then(response => {
        console.log(response.data)
        this._handleResponse(response)})
      .catch(err => console.log(err))
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
// EXPORT
export default withNavigation(UserViewer)
// STYLES
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
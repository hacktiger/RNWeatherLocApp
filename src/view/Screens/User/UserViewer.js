// react imports
import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import { List, SearchBar } from "react-native-elements";
// My imports
import User from "../../../controller/User";
import MyListItem from "./myListItem";
import Spinner from '../../common/Spinner';


// main class
class UserViewer extends PureComponent {
  constructor (props) {
    super (props)
    this.state = {
      UserList: [],
      query: "",
      page: 1,
      error: null,
      isLoading: true,
      isRefreshing: false
    };
    this.User = new User()
  }
  // test func
  componentDidMount () {
    this.retrieveUserList(this.state.page);
  }
  //get User
  retrieveUserList = (pageNo) => {
    this.User.getAllUserList(pageNo).then(response =>
      this._handleSuccess(response)
    );
  };
  // handle success of getting user
  _handleSuccess (response) {
    if (response) {
      console.log(response.data.data)
      this.setState({
        UserList: response.data.data,
        isLoading: false
      });
      console.log(this.state.UserList)
    } else {
      this.setState({
        error: "No Users Found!"
      });
    }
  }
  //helper funcs
  // render each items
  // @ref render -> FlatList
  _renderItem = ({ item }) => {
      <MyListItem title={item.first_name} />
  } 
  // render separator between items
  // @ref render -> FlatList
  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
  // render search bar
  // @ref render -> FlatList
  _renderHeader = () => {
    if (this.state.isLoading) {
      return <Spinner />
    } else {
      return (
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          value={this.state.query}
        />
      )
    }
  }
  _handleRefresh = () => {
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.retrieveUserList();
      }
    );
  };
  // MAIN RENDER
  render () {
    return (
      <View>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.UserList}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this._renderSeparator}
            ListHeaderComponent={this._renderHeader}
            refreshing={this.state.isLoading}
            onRefresh={this._handleRefresh}
          />
          </List>
      </View>
    );
  }
}

export default UserViewer;

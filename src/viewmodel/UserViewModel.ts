import UserModel from '../model/UserModel';
import Firebase from '../controller/Firebase';
//
const mFirebase = new Firebase();
const mUserModel = new UserModel();
// TODO: change type later
let UserList: UserModel[] = [];

class UserViewModel {
  /**
   * @effects : get list of users
   * used in {@code UserScreen}
   */
  getUserList = async () => {
    if (UserList.length == 0) {
      return this.loadUserList()
    }
  }
  /**
   * @effects : get more users to user list
   * used in {@code UserScreen}
   */
  getMoreUserList = (lastUserId: string) => {
    return this.loadMoreUserList(lastUserId);
  }
  /**
   *  @effects :  load user to UserList[] which is a  list of user models
   *  used in {@code this.getUserList}
   */
  loadUserList = () => {
    // load the user list here
    return mFirebase.getUserList()
      .then((res: any) => { return this._handleResponse(res) })
      .catch((err: any) => console.log('userModel.ts.getUserList', err))
  }

  /**
   *  @effects : load more user models to user list
   *  used by {@code this.getMoreUserList}
   */
  loadMoreUserList = (lastUserId: string) => {
    // load more here
    return mFirebase.getMoreUserList(lastUserId)
      .then((res:any) => { return this._handleResponse(res) })
      .catch((err: any) => console.log('userModel.ts.getMoreUserList', err))
  }

  _handleResponse (res: any) {
    let temp: UserModel[] = [];
    let data:any = res.data
    Object.keys(data).forEach((key) => {
      let userObj: any = mUserModel.newInstance(data[key].id, data[key].email);
      temp.push(userObj)
    })
    if(temp.length === 1){
      return
    }
    UserList = temp.splice(0, temp.length-1)

    return {
      lastUser: temp[temp.length-1].id, // Error means nothing
      userList : UserList,
    }
  }
}

export default UserViewModel;


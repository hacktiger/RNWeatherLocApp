//
import Firebase from '../../../controller/Firebase'
//
const myFirebase = new Firebase()
//
interface UserDataModel {
  id: number;
  email: string;
}

class UserModel {
  getUserList () {
    return myFirebase.getUserList()
      .then((res: any) => { return this._handleResponse(res) })
      .catch((err: any) => console.log('userModel.ts.getUserList', err))
  }

  getMoreUserList (lastUserId: number) {
    return myFirebase.getMoreUserList(lastUserId)
      .then((res:any) => { return this._handleResponse(res) })
      .catch((err: any) => console.log('userModel.ts.getMoreUserList', err))
  }

  _handleResponse (res: any) {
    let temp:any = []
    let data:any = res.data
    Object.keys(data).forEach((key) => {
      let UserData: UserDataModel = {
        id: data[key].id,
        email: data[key].email,
      }
      temp.push(UserData)
    })
    if(temp.length === 1){
      return
    }
    let temp2:any = temp.splice(0, temp.length-1)

    return {
      lastUser: temp[temp.length-1].id,
      userArray : temp2,
    }
  }
}

export default UserModel;
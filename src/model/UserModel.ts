// interface for user model
interface UserModelInterface {
  id?: any;
  email?: string;
}


let mUserModel: UserModelInterface = {
  id: 0,
  email: ''
}
// define user model
class UserModel {
  newInstance = (id: any, email: string) => {
    if (mUserModel != null) {
      return mUserModel = {
        id: id,
        email: email
      }
    }
  }

  setId = (id: any) => {
    mUserModel.id = id;
  }

  setEmail = (email: string) => {
    mUserModel.email =email
  }

  getId = () => {
    return mUserModel.id;
  }

  getEmail = () => {
    return mUserModel.email;
  }
}

export default UserModel;
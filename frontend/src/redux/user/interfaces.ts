import { IUser } from "../../interfaces/models"

export interface IUserState {
  user: null | IUser
}

export interface LoginAction {
  payload: {
    user: IUser,
  }
}


export interface SignUpStep1Action  {
  payload: {
    email: string,
    userName: string, 
    fullName: string,
    password: string
  }
}
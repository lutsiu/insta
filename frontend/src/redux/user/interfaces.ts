import { IUser } from "../../interfaces/models"

export interface IUserState {
  user: null | IUser
  token: null | string
}

export interface LoginAction {
  payload: {
    user: IUser,
    token: string
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
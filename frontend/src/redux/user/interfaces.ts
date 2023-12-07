import { IUser } from "../../interfaces/models"

export type IUserState =  null | IUser
   


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
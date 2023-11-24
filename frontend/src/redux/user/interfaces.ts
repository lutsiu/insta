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


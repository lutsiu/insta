import { IUIState } from "./ui/interfaces";
import { IUserState } from "./user/interfaces";

export interface ReduxState {
  user: IUserState
  ui: IUIState;
}